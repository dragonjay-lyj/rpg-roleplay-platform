---
title: "Worldbook"
description: "The Worldbook is the GM's background knowledge base — storing locations, character relationships, factions, and world rules from the script. The system automatically extracts entries when you import a script; you can also add, edit, and organize entries manually."
---

The Worldbook is the GM's background knowledge base — storing locations, character relationships, factions, and world rules from the script. When you import a script, the system automatically extracts worldbook entries from the source chapters. You can also add, edit, and organize entries manually.

Before each GM response, the system selects a set of entries by relevance and injects them into the context, giving the GM awareness of the world's geography, rules, and relationships. Injection only takes effect when the "World Knowledge" memory bucket is enabled; adjust the token limit in Memory Settings.

Entry point: Scripts → select a script → detail panel → **Worldbook** tab.

---

## Key Concepts

### Entry Structure

Each worldbook entry has the following fields:

- **Title**: The entry name; shown in the list and used for semantic matching
- **Content**: The actual lore text; what the GM reads when this entry is injected
- **Priority**: A number from 0–1000; higher values are selected for injection first. Default: 50. The table is sorted by priority descending by default
- **Enabled**: When off, the entry is completely excluded from injection (temporary suppression without deletion)
- **Tags**: Keywords attached to the entry to assist semantic matching

The system assigns a subtype label based on priority for quick importance identification:
- priority ≥ 80 → core
- priority ≥ 50 → major
- priority ≥ 20 → minor
- below 20 → detail

### Three-Path Injection

The system does not inject all entries every turn. Instead, it dynamically selects entries through three mechanisms simultaneously:

1. **Permanent Injection**: Entries with very high priority (e.g., core world rules) are guaranteed to appear every turn
2. **Keyword / Tag Matching**: Entries whose tags match keywords present in the current conversation context are prioritized
3. **RAG Semantic Recall**: The system runs a vector search against the current scene and recalls the most semantically relevant entries

All three paths run in parallel; results are merged, deduplicated, and truncated to the token budget before injection into the GM context.

### The Enabled Switch

`enabled` is a toggle that is independent of priority. Disabling an entry prevents it from being injected regardless of its priority; the entry itself remains in the list and can be re-enabled at any time. This is useful for temporarily suppressing spoiler content.

### Source and Rebuild Protection

Every entry has a `source` field:
- **editor**: Created or edited manually by the user or AI. Entries with this source are exempt from rebuilds — they **will not be overwritten or re-created**, and deletion is permanent.
- **extracted / other**: Auto-extracted from the source text. These entries are regenerated from the source on each knowledge-base rebuild. If you delete one and trigger a rebuild, it will reappear — the system warns you with an affected entry count when you bulk-delete entries of this type.

### Spoiler Prevention: Chapter Gating

The backend supports gating which entries are visible based on the current game progress. Lore tied to chapters the player has not yet reached is not injected into the current GM context, preventing the GM from revealing plot details prematurely. This mechanism runs automatically with no manual configuration required.

---

## Common Tasks

### View and Search Entries

Scripts → select a script → detail panel → **Worldbook** tab. All worldbook entries for the script are listed.

- The search box at the top filters by title or content keyword
- Click column headers (Title / Priority / Enabled) to toggle sort order
- Up to 50 entries per page; pagination controls appear when the list exceeds that

### Create an Entry

Click **New** in the top-right corner. Fill in the title, content, priority, and tags in the right-side drawer. The entry takes effect immediately on save. Manually created entries are tagged as `source: editor` and are not affected by rebuilds.

### Edit a Single Entry

Click any row, or click the **Details** button on the right side of a row, to open the editing drawer. Edit any field, then click **Save** to commit or **Undo** to discard.

### Quickly Adjust Priority or Enabled State

Click directly on the table cell to edit the title or priority inline, without opening the drawer.

### Bulk Operations

Select multiple entries to reveal a bulk action toolbar above the list:

- **Bulk Enable / Bulk Disable**: Set the `enabled` state of all selected entries in a single transaction, with no need to edit each one individually
- **Set Priority in Bulk**: Enter a target priority (0–1000) in the number field and click **Set Priority**; all selected entries are updated at once
- **Bulk Delete**: Permanently deletes selected entries after a confirmation dialog. If the selection includes any non-editor entries (auto-extracted), an additional warning notes that those entries may reappear after a knowledge-base rebuild

### View Real-Time Worldbook State In-Game

Enter the game → right-side panel → **Worldbook** tab. Shows the current scene's location, time, weather, and story phase, along with the world rule constraints list and triggered keywords. These fields can be edited in place (changes take effect immediately).

---

## FAQ

**With so many entries, will the GM get confused?**
No. The system selects only the most relevant entries within the token budget and never injects all entries at once. Adjust the injection capacity under "Token Limit" in Memory Settings, and use the "World Knowledge" memory bucket toggle to enable or disable injection entirely.

**How do I make sure a critical rule is seen by the GM every turn?**
Set the entry's priority to 80 or above (core tier) so it enters the permanent injection pool. If you need an absolute guarantee every turn, add the content to Pinned Memory — Pinned Memory has higher precedence than the worldbook.

**What is the difference between disabling and deleting an entry?**
Disabling is a temporary suppression — the entry is preserved and can be re-enabled at any time. Deleting is a permanent physical deletion that cannot be undone. If the entry's source is auto-extracted (not editor), it will reappear the next time the knowledge base is rebuilt.

**I manually deleted an auto-extracted entry and it came back — is that a bug?**
This is expected behavior. On a knowledge-base rebuild, entries extracted from the source text are regenerated from the original content. If you do not want a particular auto-extracted entry to appear, disable it (turn off `enabled`) rather than deleting it.

**The script is not mine — can I edit its worldbook?**
Only the script owner can edit. If you access another user's worldbook, the interface shows a read-only notice with a **Save as Copy** button. Fork the script and you can edit freely on your own copy.

---

## Related

- [Scripts](/en/scripts) — Import scripts and trigger knowledge-base rebuilds
- [Game Worldbook Panel](/en/game-worldbook) — View the current scene's world state in real time during gameplay
- [Memory Settings](/en/settings-memory) — Adjust token budget and enable/disable the World Knowledge memory bucket
- [Memory](/en/memory) — How Pinned Memory and the worldbook work together
