# Changelog

All notable changes to RPG Roleplay are documented here.

Format adapted from [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Version scheme: **SemVer** `MAJOR.MINOR.PATCH[-channel.N][+build]` since `v0.5.0` (single source of truth: root `VERSION` file; bump via `scripts/bump_version.sh`). A new DB migration bumps at least MINOR. Historical `0.x-waveN` entries below are kept as-is.

---

## [Unreleased]

## [1.28.1] - 2026-06-28 (@ 7fa4ca6d4)

### Fixed
- **新建分支没删除老分支 / 新建存档顶部出现空白玩家输入（反复出现，深度审计）**:根因在 `kb/save_kb.py::materialize`。新存档自创建即 `kb_native=true`（`_seed_kb_at_creation`「封死新存档入口」），其会话历史走 `materialize()` 重建——而它从 `messages where save_id` 读历史。`messages` 表按 `(save_id, turn)` 存、**无分支维度**,同一存档的所有分支消息共享 `save_id` → ① 切/建分支后老分支对话仍被读出(「老分支没删」);② 开场把空 `player_input` 也落了 `messages` → 顶部一条空白玩家气泡。修:`materialize` 改从**本 commit 的 `state_snapshot` blob** 读历史(按 commit DAG 逐分支隔离、开场只含 assistant,与非 kb_native 路径同一份),blob 缺失才回退 `messages` 并滤空行;同时 `_db_insert_turn_messages` 开场不再写空 user 行(messages 与 blob 下标对齐,消息编辑端点不错位)。真库 e2e 复现跨分支污染 + 空开场并验证修复。
- **剧本编辑器编辑时间线锚点保存失败「无可更新字段」**:锚点摘要 DB 列名 / GET / timeline / md-editor 往返全用 `sample_summary`,而 `PUT /api/scripts/{id}/anchors/{id}` 旧逻辑只认 API 名 `summary` → 编辑器回发的 `sample_summary` 被忽略,只改摘要时报错。修:`_anchor_update_sets` 两个名都收(优先 `summary`,回退 `sample_summary`)。

## [1.0.5] - 2026-06-19

### Fixed
- **切换模型不生效(严重)**:`_gm_by_user` 为 per-worker 内存缓存,`/api/models/select` 仅 evict 处理该请求的 worker;`workers=2` 下另一 worker 仍跑旧模型(且 `session_model` 变更不 bump commit,save/commit drift 抓不到)→ 用户「无论切什么都跑某固定模型、烧错 provider 的 token」。修:`read_runtime` 顺带取 DB 真值 `session_model`(零额外查询),`_ensure_loaded` 检测跨 worker 模型漂移并失效 state+GM 重建。
- **上下文用量「对话历史」越聊越少**:native-tools 路径(anthropic/vertex/openai-compat)不写 `last_context` token 估算 →「对话历史」只显示当前输入长度。**纯显示问题,模型实际收到完整历史**;已对齐文本路径补算。
- **酒馆「正在思考…」浮条**:改为「思考过程」折叠条同款克制样式(标签 + 右侧转圈),去掉突兀的大圆角浮条。

## [1.0.4] - 2026-06-19

### Fixed
- 中转站 base_url 自愈:用户把文档里的完整「接口地址」`https://host/v1/chat/completions` 整段填进 base_url,导致 SDK 再拼 `/chat/completions`、`/models` 双双 404 →「不可访问 / 0 模型」(如 EvoMap)。现在 `set_credential` 写时 + `get_credential` 读时都自动剥掉 `/chat/completions` 尾巴(大小写无关,不动 `/v1`、`/v1beta/openai`),历史误填无需重填即自愈。

## [1.0.3] - 2026-06-19

后端 harness + 热路径系统性对抗审计(12 子系统,50 候选→26 确认→opus 核实)→ 22 项验证级增量修复(PATCH:全为缺陷修复,不重写架构)。真库 e2e 验证(迁移落库 + 单测,本批零新增失败)。

### Security
- **SSRF(high)**:GM LLM 热路径(`openai_compat.py`)此前用裸 `httpx.Client` 绕过 `_SsrfGuardTransport`,DNS rebinding 防护缺失(`base_url_override` user/admin 可控,写时闸过后 TTL 过期即可 rebind 到内网/元数据)。改走 `safe_httpx_client`(传输层 use-time 重解析;新增 `proxy` 形参,本地代理路径不丢失)。
- 锚点/回溯端点不再向客户端回传原始异常(含 SQL 片段)— 落服务端日志 + 通用文案(CWE-209)。

### Fixed
- harness `except Exception` 把上游 5xx/超时/401 误判为「特性不支持」→ 非幂等 POST 重复请求(重复计费)+ 掩盖真因;改为仅 HTTP 400 降级(64×500 抖动放大根因)。
- 模块重建 worker 缺 `finally` → DB 故障留僵尸 job;冷启动 DB 未就绪竞争致恢复/回收当轮不重试 → 加有界探活。
- DDL 连接无 `lock_timeout` → ALTER 撞长事务可挂起部署;新增 migration **v77** 把 v74 四表 `save_id/script_id` 由 `integer` 改 `bigint`(防 2^31 溢出)。
- RAG:换 embed provider 后召回侧用错 provider 的 key → 静默降级 ILIKE;`workers=2` 跨进程 embed-meta 缓存陈旧 → 加 TTL;第三方 openai 兼容 provider 错误 hint 不再被吞。
- 世界书 LLM 重建 `on conflict do nothing` 静默保旧 + 计数虚高 → `do update`(豁免 editor)+ 真实行数;生图「已取消」不再被失败/成功路径覆盖;同名 MCP 工具不再误路由到内部 dispatcher;登录码冷却不再计入已消费验证码;dashscope 首轮轮询计时修正。

## [1.0.2] - 2026-06-19 (@ 273d06214)

## [1.0.1] - 2026-06-19 (@ 11ddfb077)

## [0.5.0] - 2026-06-18 (@ c12b37518)

First SemVer release; baseline for desktop distribution + versioned releases.

### Added
- Temporal knowledge-base (剧情体验升级): new games follow the source novel more faithfully, gate spoilers by reached-anchor frontier, and advance progress by confirmed anchors (no over-shoot). New-games-only via `RPG_TKB_*` flags; existing saves unaffected. Import pipeline auto-builds reveal anchors so any new script is spoiler-gated.
- In-app update announcement: shown once on entry (reuses the disclaimer modal), never re-pops after seen, reopenable from the 使用须知 button.
- Version single-source-of-truth: root `VERSION`, `__APP_VERSION__` injected into the frontend, `app_version` exposed on `/api/health`, carried on feedback submissions.
- User feedback drawer history: users can see their submitted feedback and review status, including "adopted" acknowledgements after fixes are verified.
- Admin feedback replies: administrators can answer feedback, and users can read those replies in their feedback history.

### Changed
- Model selection is now per-user/per-save for normal users, while global catalog changes remain admin-only.
- Custom API credential entry is limited to supported providers for non-admin users to avoid unusable model/provider combinations.
- Game Console mobile side panels now open as a full-width bottom sheet with larger touch targets and horizontally scrollable tabs.
- Main GM output now defaults to a 4K token BYOK budget, with higher user-configurable headroom, so story replies are not cut off by the old strict cap.

### Fixed
- Retrieval no longer falls back to legacy local `.webnovel` / `indexes` sources when `script_id` is missing, keeping runtime recall on the database-backed path.
- Game Console stop signals now use restart-safe run identifiers and ignore stale database stop rows, so old manual-stop requests no longer interrupt later chat generations with "this round was interrupted".
- New game creation now blocks scripts whose import/rebuild job is still running or whose required chapters/timeline anchors are missing, so users cannot start a setup flow that would stall before selecting a starting point.
- Agent model selectors now allow manual model names for custom OpenAI-compatible credentials, so users can use providers whose `/models` endpoint is unavailable or incomplete.
- Script import now invalidates stale chapter-split previews when the file or rule changes, retries an expired preview upload once during confirm, shows cancellation as a clear terminal state, and auto-selects the best chapter split candidate when all rules score below 0.80.
- Local/self-hosted dev mode now accepts loopback frontend origins on dynamic Vite ports, so script import estimate/confirm requests no longer fail with "Origin not allowed" when the frontend falls back from 5173 to another localhost port.
- Self-hosted frontend bundles now treat an empty `<meta name="api-base" content="">` as an explicit same-origin API base, so login/schema requests no longer fall back to port 7860 when the backend serves `dist` on another local port.
- Fresh/self-hosted database setup now enables pgvector before versioned migrations, and migration v60 backfills missing vector columns and HNSW indexes so semantic retrieval works on both new and previously drifted databases.
- Game Console now turns invalid or expired BYOK API keys into an actionable settings prompt instead of showing only a generic chat failure.
- Background phase summaries now use the save owner's model credentials, so long-memory compaction no longer falls back to an unconfigured server Vertex account.
- New-save player origin selection no longer forces an initial identity card; the identity overlay is now truly optional for all origin modes.
- Game Console openings now convert trailing markdown action lists into the GM choice box and refresh the streamed opening with the cleaned stored state.
- New-save identity recommendations now surface the backend's real failure reason when the LLM returns `ok:false`, instead of replacing it with a generic empty-result message.
- Opening messages are now recorded as branch commits, so forking from the first GM opening no longer checks out an empty root state.
- Game Console curator clarifications now only interrupt the GM when confidence is below the user's threshold, reducing unnecessary choice prompts when the story can continue.
- Script module rebuild progress is cleared when switching scripts, so an active extraction/rebuild banner from one script no longer appears on another script's detail view.
- Game Console curator clarification prompts now parse inline `(A)/(B)` options and refresh pending questions during streaming, so users see clickable choices instead of repeated plain-text questions.
- Script deletion from "My Scripts" now sends the confirmed force-delete flag so scripts with saves are actually removed together with their saves, matching the existing warning text.
- NPC character-card creation now lets users choose the target script in the add dialog, so adding from the "all scripts" view no longer appears blocked when a user has multiple scripts.
- Chunked `.txt` / `.md` script import now validates the uploaded filename instead of rejecting valid imports because of the display title.
- Tavern/SillyTavern character-card import now splits common structured profile sections into identity, appearance, background, personality, speech style, status, and secrets instead of putting the whole description into one field.
- Settings now clearly exposes the personal default main GM model selector, so users do not have to rediscover the model switcher each time.
- Game Console feedback drawer now uses the same dark Cloudscape theme as Platform, avoiding the bright default modal during gameplay.
- Game Console model switching now writes the selected model to the active save and shows the session model after refresh.
- Game Console now has a local Enter-key mode toggle so testers can choose between Enter-to-send and Enter-for-newline.
- Game Console now restores the player's draft when chat streaming fails, closes, times out, or finishes without any GM reply.
- Game Console chat streaming now distinguishes completed streams, backend errors, idle timeouts, manual stops, and true premature closes, so normal SSE close events no longer show a false "generation interrupted" error and the failure card exposes retry plus event-log details.
- Model parameter settings now reload saved values after refresh, persist NSFW mode/presets, and let the main GM honor each user's max output token setting.
- Chat usage records now include model finish reason and the applied output budget, making token-limit truncation visible in ops logs.
- Vertex/Agent Platform chats now return a recoverable user-facing error when the Service Account JSON is missing instead of failing the request with a backend 500.
- Script module rebuilds now expose the missing estimate endpoint and show actionable embedding credential prerequisites instead of surfacing "Method Not Allowed" when rebuilding vector indexes.
- NPC character-card editing and deletion in the card library now call the existing script card APIs.
- Saving an NPC character card with an existing name now updates the existing card instead of failing with a duplicate-name backend error.
- Script import jobs ending in `done_with_errors` now leave the "importing" state instead of blocking new imports.
- Acceptance retry state writes now include a valid trace id and no longer pass an unsupported context field.
- Game Console message deletion now starts from the selected message, so deleting a GM reply no longer removes the previous player line.

### Working towards
- Branches: merge / cleanup / deletion (currently stubs)
- Script-pack: sharing surface (import works, share UI in progress)
- Provider catalog: Qwen / Google AI Studio full `LlmBackend` impls (currently catalog-only)
- Web UI polish pass

---

## [0.1.0-wave14] — 2026-05-30

The Python → Rust migration is functionally complete. Wave 14 closed every
"not yet implemented" stub in the core game loop. Branches and script-pack
remain at "critical path only" status — see [docs/MIGRATION_AUDIT.md](./docs/MIGRATION_AUDIT.md) rows 5 and 6 for file:line specifics.

### Added
- Rust core game loop — state, ops, scenes, dice, D&D 5E core, encounters, inventory, retrieval, agents
- ts-rs typed frontend — 43 generated TypeScript types, vite proxy to axum
- 10-provider LLM catalog — 6 wired backends (Anthropic, OpenAI Responses, Vertex Gemini, OpenAI-compatible, OpenRouter, DeepSeek/xAI/MiMo/Hunyuan via shared backend), 4 catalog-only (Alibaba Qwen, Google AI Studio listed without backend impl yet)
- Postgres + pgvector storage — 24 versioned migrations, auto-apply on boot under advisory lock
- React 18 + Vite frontend — 3 page entries (Login / Platform / Game Console)
- Branch saves — commit / ref / checkout work like Git
- Script pack import — user-uploaded ZIPs with script + chapters + facts + cards
- `docs/MIGRATION_AUDIT.md` — file:line-level migration audit for AI assistants

### Changed
- LICENSE — MIT → Proprietary (AGPL-3.0 + commercial dual-license planned for v1 public release)
- README rewritten with honest "what works today" status, ASCII architecture diagram, provider matrix, "why not SillyTavern" positioning
- Hero subtitle — "一本小说扔进去，剧本就备好了" → "千人千面的剧本，从你自己的故事开始"

### Not yet
- Branches: merge / cleanup / deletion (`rust/crates/rpg-platform/src/branches/` — see audit row 5)
- Script-pack: sharing surface
- Public deployment + commercial license
- 2 providers without backend impl (Alibaba Qwen, Google AI Studio)

---

## Earlier waves (pre-changelog)

For history before 0.1.0, see `git log --oneline | grep -E '^[a-f0-9]+ (feat|fix|chore): Wave'` —
each wave commit message is the authoritative changelog entry for that wave.
Wave 1 through Wave 13.8 covered the initial Python skeleton, the Rust workspace
bootstrapping (Wave 6C onwards), and the parity audit (Wave 13.7 closed the
last 104 gaps between Python and Rust).
