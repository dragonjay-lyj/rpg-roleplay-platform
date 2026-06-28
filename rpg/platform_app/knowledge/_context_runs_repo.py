"""knowledge._context_runs_repo — context_runs 的 SQL 层 (private)."""
from __future__ import annotations

from typing import Any

from psycopg.types.json import Jsonb


def _db_update_context_run_status(db, run_id: int, status: str, error: str, duration_ms: int | None) -> None:
    """repository: 更新 context_run 的 status/error/duration_ms。"""
    if duration_ms is None:
        db.execute(
            "update context_runs set status = %s, error = %s where id = %s",
            (status, error, run_id),
        )
    else:
        db.execute(
            "update context_runs set status = %s, error = %s, duration_ms = %s where id = %s",
            (status, error, int(duration_ms), run_id),
        )


def _db_insert_turn_messages(db, session_id: int, save_id: int, turn: int, player_input: str, gm_output: str, metadata: dict[str, Any]) -> tuple:
    """repository: 插入一对 user/assistant 消息，返回 (user_row, gm_row)。

    开场（GM 主动起手）没有玩家输入，player_input 为空字符串。空 user 行会：
      ① 让 kb_native 存档顶部出现一条空白玩家气泡（耀月余辉/星之游反馈）；
      ② 使 messages 行数比 commit blob 的 history 多一条 → 消息编辑端点按下标对齐时错位。
    blob 历史本就只落 assistant（routes/game.py 开场只 append assistant），这里对齐：
    player_input 为空/纯空白时跳过 user 行，只记 assistant。
    """
    user_msg = None
    if str(player_input or "").strip():
        user_msg = db.execute(
            """
            insert into messages(session_id, save_id, turn, role, content, metadata)
            values (%s, %s, %s, 'user', %s, %s)
            returning *
            """,
            (session_id, save_id, turn, player_input, Jsonb(metadata)),
        ).fetchone()
    gm_msg = db.execute(
        """
        insert into messages(session_id, save_id, turn, role, content, metadata)
        values (%s, %s, %s, 'assistant', %s, %s)
        returning *
        """,
        (session_id, save_id, turn, gm_output, Jsonb(metadata)),
    ).fetchone()
    return user_msg, gm_msg


def _db_select_context_runs(db, save_id: int, before_id: int | None, page_limit: int) -> list:
    """repository: 按 save_id/cursor 分页查 context_runs，返回 rows。"""
    return db.execute(
        """
        select * from context_runs
        where save_id = %s and (%s::bigint is null or id < %s)
        order by id desc
        limit %s
        """,
        (save_id, before_id, before_id, page_limit + 1),
    ).fetchall()
