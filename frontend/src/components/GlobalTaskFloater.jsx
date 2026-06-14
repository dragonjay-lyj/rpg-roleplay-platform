import React from 'react';
import { createPortal } from 'react-dom';
import CSFlashbar from '@cloudscape-design/components/flashbar';
import CSProgressBar from '@cloudscape-design/components/progress-bar';
import CSButton from '@cloudscape-design/components/button';

/* GlobalTaskFloater — 右下角全局「后台任务」浮窗。
   数据源:GET /api/me/tasks/active(导入 / 各模块重建 / 生图 统一聚合)。
   交互(按用户要求):
     · 有活跃任务时默认只显示一个小「⋯」圆点(不累赘);
     · 鼠标悬停圆点 → 自动展开任务列表;移开未点击 → 自动收回圆点;
     · 点击展开区域任意处 → 暂时固定(pin),不再自动收回;
     · 点击浮窗外的任意处 → 取消固定并收回小圆点。
   如实状态:import 类有真实 overall_progress 进度条;生图只给 spinner + 已用时间。
   每个任务带「取消」按钮——取消只能由此显式触发,关闭生图弹窗/页面绝不取消队列。
   用 Cloudscape Flashbar(现成组件)+ 全局暖色主题改色,卡片不自重设计。
*/

const POLL_ACTIVE_MS = 3000;
const POLL_IDLE_MS = 7000;
const POLL_BACKOFF_MS = 60000;   // 401 / 网络错时退避(登出页/掉线不刷屏)

// 暖色板(对齐全站主题)。loading=true 的项渲染成 info 态,故覆盖 info 颜色。
const FLASHBAR_STYLE = {
  item: { root: {
    background: { info: '#2a2620' },
    color: { info: '#ebe7df' },
    borderColor: { info: '#46413a' },
  } },
};
const PROGRESS_STYLE = {
  progressValue: { backgroundColor: '#c96442' },
  progressBar: { backgroundColor: 'rgba(201,100,66,0.18)' },
};

function fmtElapsed(sec) {
  sec = Math.max(0, Math.floor(sec));
  if (sec < 60) return sec + 's';
  const m = Math.floor(sec / 60), s = sec % 60;
  if (m < 60) return m + 'm' + (s ? ' ' + s + 's' : '');
  const h = Math.floor(m / 60);
  return h + 'h ' + (m % 60) + 'm';
}

const ACTIVE_ST = { queued: 1, running: 1 };

export default function GlobalTaskFloater() {
  const { useState, useEffect, useRef } = React;
  const [tasks, setTasks] = useState([]);
  const [fetchedAt, setFetchedAt] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [, tick] = useState(0);               // 每秒重渲染刷新"已用时间"
  const mounted = useRef(true);
  const prevActive = useRef(new Set());
  const toasted = useRef(new Set());
  const rootRef = useRef(null);

  // ── 轮询(自调度 setTimeout 循环;隐藏标签页退避;事件可即时唤醒)──
  useEffect(() => {
    mounted.current = true;
    let timer = null;
    const api = (typeof window !== 'undefined' && window.api) || null;
    const schedule = (ms) => { if (timer) clearTimeout(timer); timer = setTimeout(run, ms); };

    const run = async () => {
      if (!mounted.current) return;
      if (!api || !api.tasks || !api.tasks.active) return schedule(POLL_BACKOFF_MS);
      if (typeof document !== 'undefined' && document.hidden) return schedule(POLL_IDLE_MS);
      try {
        const r = await api.tasks.active();
        if (!mounted.current) return;
        const list = (r && r.tasks) || [];
        const byId = {};
        list.forEach((t) => { byId[t.id] = t; });
        const curActive = new Set(list.filter((t) => ACTIVE_ST[t.status]).map((t) => t.id));
        // 上轮活跃、本轮不再活跃 → 用现有 toast 给一次性"完成/失败/取消"提示
        prevActive.current.forEach((id) => {
          if (curActive.has(id) || toasted.current.has(id)) return;
          const t = byId[id];
          if (!t) return;
          const toast = (typeof window !== 'undefined' && window.__apiToast) || null;
          if (!toast) return;
          toasted.current.add(id);
          if (t.status === 'done') toast(t.title + ' 已完成', { kind: 'ok', duration: 3500 });
          else if (t.status === 'done_with_errors') toast(t.title + ' 完成(有警告)', { kind: 'warning', duration: 5000 });
          else if (t.status === 'failed') toast(t.title + ' 失败' + (t.error ? '：' + t.error : ''), { kind: 'danger', duration: 7000 });
          else if (t.status === 'cancelled') toast(t.title + ' 已取消', { kind: 'info', duration: 3000 });
        });
        prevActive.current = curActive;
        if (toasted.current.size > 80) {
          toasted.current = new Set([...toasted.current].filter((id) => byId[id]));
        }
        setTasks(list);
        setFetchedAt(Date.now());
        schedule(curActive.size > 0 ? POLL_ACTIVE_MS : POLL_IDLE_MS);
      } catch (e) {
        if (!mounted.current) return;
        schedule((e && e.status) === 401 ? POLL_BACKOFF_MS : POLL_IDLE_MS);
      }
    };

    const kick = () => { if (timer) clearTimeout(timer); run(); };
    const onVis = () => { if (!document.hidden) kick(); };
    run();
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('focus', onVis);
    window.addEventListener('rpg-task-refresh', kick);
    return () => {
      mounted.current = false;
      if (timer) clearTimeout(timer);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('focus', onVis);
      window.removeEventListener('rpg-task-refresh', kick);
    };
  }, []);

  const active = tasks.filter((t) => ACTIVE_ST[t.status]);

  // 每秒刷新"已用时间"(仅在有活跃任务时)
  useEffect(() => {
    if (active.length === 0) return undefined;
    const id = setInterval(() => { if (mounted.current) tick((x) => x + 1); }, 1000);
    return () => clearInterval(id);
  }, [active.length]);

  // 固定态下:点击浮窗外任意处 → 取消固定并收回
  useEffect(() => {
    if (!pinned) return undefined;
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setPinned(false);
        setHovering(false);
      }
    };
    document.addEventListener('mousedown', onDown, true);
    return () => document.removeEventListener('mousedown', onDown, true);
  }, [pinned]);

  if (active.length === 0) return null;       // 只在有进行中任务时出现
  const portalTarget = typeof document !== 'undefined' ? document.body : null;
  if (!portalTarget) return null;

  const expanded = pinned || hovering;

  const cancelTask = async (t) => {
    const api = (typeof window !== 'undefined' && window.api) || null;
    const toast = (typeof window !== 'undefined' && window.__apiToast) || null;
    try {
      if (t.source === 'import') await api?.scripts?.jobCancel(String(t.id).slice('import:'.length));
      else if (t.source === 'image') await api?.images?.cancel(String(t.id).slice('image:'.length));
      if (toast) toast('已请求取消', { kind: 'info', duration: 2500 });
      window.dispatchEvent(new Event('rpg-task-refresh'));
    } catch (e) {
      if (toast) toast('取消失败', { kind: 'danger', detail: e && e.message });
    }
  };

  const nowMs = Date.now();
  const items = active.map((t) => {
    const elapsed = fmtElapsed((t.elapsed_sec || 0) + (fetchedAt ? (nowMs - fetchedAt) / 1000 : 0));
    const hasProg = t.progress != null && t.progress_total;
    const pct = hasProg ? Math.max(0, Math.min(100, Math.round((t.progress / t.progress_total) * 100))) : 0;
    const canceling = !!t.canceling;
    const statusText = (canceling ? '取消中…' : (t.status === 'queued' ? '排队中' : '进行中'))
      + (t.phase ? ' · ' + t.phase : '')
      + ' · 已用 ' + elapsed;
    return {
      id: t.id,
      loading: true,
      dismissible: false,
      header: t.title,
      action: (t.cancelable && !canceling)
        ? <CSButton variant="inline-link" onClick={() => cancelTask(t)}>取消</CSButton>
        : undefined,
      content: (
        <div style={{ fontSize: 12.5, lineHeight: 1.5 }}>
          <div style={{ opacity: 0.85 }}>{statusText}</div>
          {hasProg && (
            <div style={{ marginTop: 5 }}>
              <CSProgressBar variant="flash" status="in-progress" value={pct} style={PROGRESS_STYLE} />
            </div>
          )}
        </div>
      ),
    };
  });

  const content = expanded ? (
    <div className="rpg-task-dock"
      style={{ width: 360, maxWidth: 'calc(100vw - 32px)' }}
      onClickCapture={() => setPinned(true)}>
      <CSFlashbar
        items={items}
        stackItems={false}
        style={FLASHBAR_STYLE}
        i18nStrings={{
          ariaLabel: '后台任务',
          infoIconAriaLabel: '进行中',
          inProgressIconAriaLabel: '进行中',
          errorIconAriaLabel: '错误',
          successIconAriaLabel: '完成',
          warningIconAriaLabel: '警告',
        }}
      />
    </div>
  ) : (
    <button
      type="button"
      aria-label={active.length + ' 个后台任务'}
      title={active.length + ' 个后台任务进行中(悬停展开)'}
      onClick={() => setPinned(true)}
      style={{
        width: 46, height: 46, borderRadius: '50%', cursor: 'pointer',
        background: '#2a2620', color: '#ebe7df',
        border: '1px solid rgba(201,100,66,0.55)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.45)',
        fontSize: 22, lineHeight: '1', letterSpacing: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >⋯</button>
  );

  const wrap = (
    <div
      ref={rootRef}
      style={{ position: 'fixed', right: 16, bottom: 16, zIndex: 1500, display: 'flex', justifyContent: 'flex-end' }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {content}
    </div>
  );
  return createPortal(wrap, portalTarget);
}
