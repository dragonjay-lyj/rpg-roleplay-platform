"""kb.reveal — 时间感知知识库:揭示锚点 DAG(P1 回填)+ 前沿可见集(P4)。

设计:docs/design/O_temporal_kb_unification.md。
P1(本文件):确定性 ETL,把剧本的 chapter_facts.events 物化成 reveal_anchors(剧本级揭示锚点 DAG)。
- anchor_key 与 save_anchor_states 完全对齐(`chapter:{n}:event:{idx}`,见 agents/anchor_seed_agent),
  这样某存档把锚点标 occurred 时,save_reveal_frontier 能按同 key 对上 reveal_anchors。
- requires 按「章→事件」顺序把合格锚点连成单条主线链(worldline_key='main')→ 线性叙事骨架;
  到达某锚点 ⇒ 其传递闭包(=之前所有锚点)进可见集(P4 用)。
- 复用 anchor_seed_agent 的 importance/fatal/must_preserve 逻辑,保证与 save 级 seeding 同口径(同一批锚点)。
- 幂等:on conflict 只刷新 source='novel' 行,绝不动 editor/gm 新建的锚点。
"""
from __future__ import annotations

from typing import Any

from psycopg.types.json import Jsonb

from platform_app.db import connect, init_db

_MIN_SUMMARY_LEN = 6
_MIN_IMPORTANCE = 40
_DEFAULT_MAY_VARY = ["地点", "触发时机", "旁观者"]


def _collect_anchor_rows(facts: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """从 chapter_facts(按 chapter 升序)抽合格事件,返回按(章,事件序)有序的锚点行。纯函数,便于单测。"""
    from agents.anchor_seed_agent import (
        _compute_importance,
        _derive_must_preserve,
        classify_event_fatal,
    )
    rows: list[dict[str, Any]] = []
    for fact in facts:
        events_raw = fact.get("events") or []
        if not isinstance(events_raw, list):
            continue
        chapter = int(fact["chapter"])
        phase = (fact.get("story_phase") or "")[:120]
        stl = (fact.get("story_time_label") or "")[:200]
        for idx, ev in enumerate(events_raw):
            if not isinstance(ev, dict):
                continue
            summary = str(ev.get("event") or "").strip()
            if len(summary) < _MIN_SUMMARY_LEN:
                continue
            importance = _compute_importance(ev, summary)
            if importance < _MIN_IMPORTANCE:
                continue
            rows.append({
                "anchor_key": f"chapter:{chapter}:event:{idx}",
                "chapter": chapter,
                "story_phase": phase,
                "story_time_label": stl,
                "summary": summary[:300],
                "importance": importance,
                "is_fatal": classify_event_fatal(summary),
                "must_preserve": _derive_must_preserve(summary, ev.get("participants") or []),
            })
    return rows


def backfill_reveal_anchors(script_id: int) -> dict[str, Any]:
    """P1:回填 reveal_anchors(剧本级揭示锚点 DAG)。幂等。返回 {ok, script_id, anchors}。"""
    init_db()
    sid = int(script_id)
    with connect() as db:
        facts = db.execute(
            "select chapter, story_phase, story_time_label, events from chapter_facts "
            "where script_id = %s order by chapter asc",
            (sid,),
        ).fetchall()
        rows = _collect_anchor_rows([dict(f) for f in facts])
        prev_key: str | None = None
        seeded = 0
        for a in rows:
            requires = [prev_key] if prev_key else []
            db.execute(
                """
                insert into reveal_anchors (
                    script_id, anchor_key, chapter_min, chapter_max,
                    story_phase, story_time_label, requires, worldline_key, kind,
                    summary, must_preserve, may_vary, importance, is_fatal, source
                ) values (%s, %s, %s, %s, %s, %s, %s, 'main', 'beat',
                          %s, %s, %s, %s, %s, 'novel')
                on conflict (script_id, anchor_key) do update set
                    chapter_min = excluded.chapter_min,
                    chapter_max = excluded.chapter_max,
                    story_phase = excluded.story_phase,
                    story_time_label = excluded.story_time_label,
                    requires = excluded.requires,
                    summary = excluded.summary,
                    must_preserve = excluded.must_preserve,
                    importance = excluded.importance,
                    is_fatal = excluded.is_fatal,
                    updated_at = now()
                where reveal_anchors.source = 'novel'
                """,
                (
                    sid, a["anchor_key"], a["chapter"], a["chapter"],
                    a["story_phase"], a["story_time_label"],
                    Jsonb(requires), a["summary"],
                    Jsonb(a["must_preserve"]), Jsonb(_DEFAULT_MAY_VARY),
                    a["importance"], a["is_fatal"],
                ),
            )
            prev_key = a["anchor_key"]
            seeded += 1
    return {"ok": True, "script_id": sid, "anchors": seeded}
