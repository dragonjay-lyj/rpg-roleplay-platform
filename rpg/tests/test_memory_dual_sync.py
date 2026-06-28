"""回归:固定记忆/笔记 增删改 必须 legacy bucket 与结构化 items 双写一致。

群反馈(行者无疆):删/改固定记忆后「已删的又回来 / GM 仍用旧文本」。
两套表示(state.data.memory[bucket] 给 UI 读 / memory.items 给 GM 上下文读)任一不同步即出 bug。
本测试锁定 add/remove/edit 三个入口都保持两套一致。

(跨 worker 陈旧缓存导致的"复活"由 app.py 的 snapshot_hash 漂移失效修复,需 workers=2 环境验证,
不在本单测范围。)
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from state.core import GameState  # noqa: E402


def _fresh():
    g = GameState.new()
    g.data["memory"] = {"pinned": [], "items": []}
    return g


def _items(g, bucket="pinned"):
    return [i["text"] for i in g.data["memory"]["items"]
            if i.get("legacy_bucket") == bucket and (i.get("status") or "active") == "active"]


def test_remove_syncs_items():
    g = _fresh()
    g.add_memory("pinned", "A"); g.add_memory("pinned", "B")
    g.remove_memory("pinned", 0)
    assert g.data["memory"]["pinned"] == ["B"]
    assert _items(g) == ["B"], "remove 未同步删除结构化 item(GM 仍会读到已删项)"


def test_edit_syncs_items():
    g = _fresh()
    g.add_memory("pinned", "A"); g.add_memory("pinned", "B")
    assert g.edit_memory("pinned", 1, "B改")
    assert g.data["memory"]["pinned"] == ["A", "B改"]
    assert sorted(_items(g)) == ["A", "B改"], "edit 未同步结构化 item(GM 仍读旧文本)"


def test_add_after_remove_no_resurrect_in_state():
    g = _fresh()
    g.add_memory("pinned", "A"); g.add_memory("pinned", "B")
    g.remove_memory("pinned", 0)         # 删 A
    g.add_memory("pinned", "C")          # 加 C
    assert g.data["memory"]["pinned"] == ["B", "C"]
    assert sorted(_items(g)) == ["B", "C"], "删后加,A 在 items 里复活"
