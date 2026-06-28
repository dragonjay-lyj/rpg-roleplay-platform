"""md-editor 编辑时间线锚点摘要保存失败「无可更新字段」回归测试。

反馈(耀月余辉):/md-editor 里编辑锚点,保存一直跳「保存失败 无可更新字段
(可更新: summary, story_phase, ...)」。

根因:摘要在 DB 列名 / GET / timeline 端点 / md-editor round-trip 全用 sample_summary,
而 PUT /api/scripts/{id}/anchors/{id} 旧逻辑只认 API 名 summary → 编辑器回发的
sample_summary 被忽略,只改摘要时 sets 为空 → 报「无可更新字段」。
修复:_anchor_update_sets 两者都收(优先 summary,回退 sample_summary)。
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from platform_app.api.script_edit import _anchor_update_sets  # noqa: E402


def test_summary_api_name_accepted():
    sets, args = _anchor_update_sets({"summary": "新摘要"})
    assert sets == ["sample_summary=%s"]
    assert args == ["新摘要"]


def test_sample_summary_column_name_accepted():
    # 根因复现:md-editor round-trip 回发列名 sample_summary;修复前会被丢弃 → sets 空。
    sets, args = _anchor_update_sets({"sample_summary": "新摘要"})
    assert sets == ["sample_summary=%s"], "sample_summary 未被接受(回归)"
    assert args == ["新摘要"]


def test_summary_takes_precedence():
    _, args = _anchor_update_sets({"summary": "A", "sample_summary": "B"})
    assert args == ["A"]


def test_empty_or_unknown_body_yields_no_sets():
    assert _anchor_update_sets({}) == ([], [])
    assert _anchor_update_sets({"content": "正文", "foo": 1}) == ([], [])


def test_other_fields_still_mapped():
    sets, args = _anchor_update_sets({
        "story_phase": "序章", "story_time_label": "清晨",
        "chapter_min": 1, "chapter_max": 3, "confidence": 0.8,
        "keywords": ["a", "b"], "sample_title": "标题",
    })
    for col in ("story_phase=%s", "story_time_label=%s", "sample_title=%s",
                "chapter_min=%s", "chapter_max=%s", "confidence=%s", "keywords=%s"):
        assert col in sets
    assert ["a", "b"] in args  # keywords 保持原生 list(text[]),不可 json.dumps
    assert 1 in args and 3 in args  # chapter_min/max 为 int
