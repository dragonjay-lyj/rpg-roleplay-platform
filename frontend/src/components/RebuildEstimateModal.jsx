/* RebuildEstimateModal — 重做前的估算+确认弹窗.
   Editorial × 古籍数字化:保留 CSModal shell (portal/focus-trap),
   内容层全部替换为 editorial.module.css 风格.
*/

import React from 'react';
import { useTranslation } from 'react-i18next';
import CSModal from '@cloudscape-design/components/modal';
import CSButton from '@cloudscape-design/components/button';
import CSSpaceBetween from '@cloudscape-design/components/space-between';
import s from './editorial.module.css';

export function RebuildEstimateModal({ open, module, scriptId, estimate, loading, options, onOptionsChange, onClose, onConfirm }) {
  const { t } = useTranslation();
  const isCards = module === 'cards';

  // 进度感知角色卡:cards 重建的「重建到第 N 章」+「LLM 丰富」本地状态。
  // 改动 → debounce 后回调 onOptionsChange(带 chapter_max / mode)重估。
  const [chapterMax, setChapterMax] = React.useState('');
  const [llmEnrich, setLlmEnrich] = React.useState(false);
  // 弹窗每次打开(module 变化)重置本地态,避免上次残留。
  React.useEffect(() => {
    if (open && isCards) {
      setChapterMax(options && options.chapter_max != null ? String(options.chapter_max) : '');
      setLlmEnrich(!!(options && (options.mode === 'llm' || options.source === 'llm')));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, module]);

  const emitOptions = React.useCallback((nextCh, nextLlm) => {
    if (!onOptionsChange) return;
    const opts = {};
    const n = parseInt(nextCh, 10);
    if (Number.isFinite(n) && n > 0) opts.chapter_max = n;
    if (nextLlm) opts.mode = 'llm';
    onOptionsChange(opts);
  }, [onOptionsChange]);

  // chapter_max 输入 debounce 重估(避免每个按键打一次估算请求)。
  const chDebounce = React.useRef(null);
  const onChapterMaxChange = (v) => {
    const cleaned = String(v || '').replace(/[^0-9]/g, '');
    setChapterMax(cleaned);
    if (chDebounce.current) clearTimeout(chDebounce.current);
    chDebounce.current = setTimeout(() => emitOptions(cleaned, llmEnrich), 500);
  };
  const onLlmToggle = (checked) => {
    setLlmEnrich(checked);
    emitOptions(chapterMax, checked);  // toggle 立即重估(影响 token/成本)
  };

  if (!open) return null;

  const ok              = estimate && estimate.ok !== false;
  const tokens          = estimate?.tokens_est ?? estimate?.est_input_tokens;
  const cost            = estimate?.cost_est ?? estimate?.est_usd;
  const approx          = !!estimate?.approximate;  // LLM 路径=粗略估算,标「≈」避免看着像精确值
  const model           = estimate?.model;
  const affects         = Array.isArray(estimate?.affects) ? estimate.affects : [];
  const prereqs         = Array.isArray(estimate?.prereqs) ? estimate.prereqs : [];
  const hasBlockingPrereq = prereqs.some(p => p && p.ok === false);
  const isZeroLlm       = (tokens === 0 || tokens == null) && (cost === 0 || cost == null);

  const moduleName = t(`modules.${module}.title`, { defaultValue: module });

  return (
    <CSModal
      visible={open}
      onDismiss={onClose}
      header={
        <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, letterSpacing: '0.03em' }}>
          {t('modules.estimate.title', { defaultValue: '重做估算' })}
          <span style={{ color: 'var(--accent)', marginLeft: 8 }}>· {moduleName}</span>
        </span>
      }
      footer={
        <CSSpaceBetween direction="horizontal" size="xs">
          <CSButton onClick={onClose} disabled={loading}>
            {t('common.cancel', { defaultValue: '取消' })}
          </CSButton>
          <CSButton
            variant="primary"
            disabled={loading || !ok || hasBlockingPrereq}
            onClick={() => onConfirm && onConfirm({ module, scriptId })}
          >
            {isZeroLlm
              ? t('modules.estimate.confirm_zero', { defaultValue: '确认重做（免费）' })
              : t('modules.estimate.confirm_llm',  { defaultValue: '确认重做（消耗 LLM）' })}
          </CSButton>
        </CSSpaceBetween>
      }
    >
      <div className={s.estimateBody}>
        {/* 进度感知角色卡:cards 重建选项(重建到第 N 章 + LLM 丰富) */}
        {isCards && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14,
                        padding: '12px 14px', border: '1px solid var(--border, #d8d2c4)', borderRadius: 6 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>
                {t('modules.cards.chapter_max_label', { defaultValue: '重建到第 N 章' })}
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={chapterMax}
                placeholder={t('modules.cards.chapter_max_placeholder', { defaultValue: '留空 = 全书；填进度章可避免引入未登场角色' })}
                onChange={(e) => onChapterMaxChange(e.target.value)}
                disabled={loading}
                style={{ padding: '6px 10px', border: '1px solid var(--border, #d8d2c4)', borderRadius: 4,
                         fontSize: 13, background: 'var(--bg, #fff)', color: 'var(--text, #222)' }}
              />
              <span style={{ fontSize: 11, color: 'var(--muted-2, #9a8f78)' }}>
                {t('modules.cards.chapter_max_help', { defaultValue: '只回填该章前已登场的角色，并保留每个角色的首次揭示章（防剧透）。' })}
              </span>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={llmEnrich}
                onChange={(e) => onLlmToggle(e.target.checked)}
                disabled={loading}
              />
              <span>{t('modules.cards.llm_enrich_label', { defaultValue: 'LLM 丰富重建（消耗你的 API Key，产更丰富的该时期人设）' })}</span>
            </label>
            <span style={{ fontSize: 11, color: 'var(--muted-2, #9a8f78)', marginLeft: 24 }}>
              {t('modules.cards.llm_enrich_help', { defaultValue: '默认零 LLM、免费。勾选后按区间重抽该时期态；无 Key 会自动降级到免费版。' })}
            </span>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className={s.estimateLoading}>
            {t('modules.estimate.loading', { defaultValue: '估算中…' })}
          </div>
        )}

        {/* Error state */}
        {!loading && estimate && estimate.ok === false && (
          <div className={s.estimateErrorBanner}>
            {estimate.error || estimate.note || t('modules.estimate.fail', { defaultValue: '无法估算' })}
          </div>
        )}

        {/* Loaded + ok */}
        {!loading && ok && (
          <>
            {/* KV grid: tokens / cost / model */}
            <div className={s.estimateKVRow}>
              <div className={s.estimateKVItem}>
                <span className={s.estimateKVLabel}>
                  {t('modules.estimate.tokens', { defaultValue: 'Tokens' })}
                </span>
                <span className={`${s.estimateKVValue} ${isZeroLlm ? s.estimateKVValueFree : ''}`}>
                  {tokens != null ? `${approx ? '≈ ' : ''}${Number(tokens).toLocaleString()}` : '0'}
                </span>
              </div>
              <div className={s.estimateKVItem}>
                <span className={s.estimateKVLabel}>
                  {t('modules.estimate.cost', { defaultValue: '预估成本' })}
                </span>
                <span className={`${s.estimateKVValue} ${isZeroLlm ? s.estimateKVValueFree : ''}`}>
                  {cost != null ? `${approx ? '≈ ' : ''}$${Number(cost).toFixed(3)}` : '$0.000'}
                </span>
              </div>
              <div className={s.estimateKVItem}>
                <span className={s.estimateKVLabel}>
                  {t('modules.estimate.model', { defaultValue: '模型' })}
                </span>
                <span className={`${s.estimateKVValue}`} style={{ fontSize: 13, color: 'var(--muted)' }}>
                  {model || (isZeroLlm ? '—' : '—')}
                </span>
              </div>
            </div>

            {/* Affects */}
            {affects.length > 0 && (
              <div>
                <div className={s.estimateSectionLabel}>
                  {t('modules.estimate.affects', { defaultValue: '影响的表' })}
                </div>
                <div className={s.estimateTagRow}>
                  {affects.map((a) => (
                    <span key={a} className={s.estimateTag}>{a}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Prereqs */}
            {prereqs.length > 0 && (
              <div>
                <div className={s.estimateSectionLabel}>
                  {t('modules.estimate.prereqs', { defaultValue: '前置条件' })}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 4 }}>
                  {prereqs.map((p, i) => (
                    <div key={i} className={s.estimatePrereqRow}>
                      <span className={p.ok ? s.prereqOk : s.prereqWarn}>
                        {p.ok ? '✓' : '△'}
                      </span>
                      <span>
                        {p.label || p.key}
                        {p.total != null ? ` ${p.count || 0} / ${p.total}` : ''}
                      </span>
                      {p.hint && (
                        <span style={{ color: 'var(--muted-2)', fontSize: 11 }}>{p.hint}</span>
                      )}
                    </div>
                  ))}
                </div>
                {hasBlockingPrereq && (
                  <div className={s.estimateBlockAlert} style={{ marginTop: 8 }}>
                    △ {t('modules.estimate.prereq_block_header', { defaultValue: '前置条件未满足' })}
                    <div style={{ fontWeight: 400, marginTop: 2, fontSize: 11, color: 'var(--muted)' }}>
                      {t('modules.estimate.prereq_block_body', { defaultValue: '请先重做上面缺失的模块。' })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Note */}
            {estimate.note && (
              <div className={s.estimateNote}>{estimate.note}</div>
            )}
          </>
        )}
      </div>
    </CSModal>
  );
}

export default RebuildEstimateModal;
