---
title: "Saves"
description: "View, create, and switch between game saves. Each save is tied to one script and one character card and records the full game history. The system automatically creates a branch node after every completed turn, similar to a git commit."
---

Saves is where you view, create, and switch between game saves. Each save is tied to one script and one character card and records the complete game history. After every completed turn, the system automatically creates a branch node — similar to a git commit.

Entry point: left navigation bar → Saves, or use the top-bar shortcut to jump directly to the current save.

---

## Key Concepts

### Save List

Columns: **Save** name, **Script**, **Player**, **Branch nodes**, **Last played**, **Status** (Active / Idle). Supports search by save name or script name, with sorting by Last Played, Name, or Created. Paginates automatically at 50+ saves.

Top-right action buttons:
- **Import Save** — upload a local `.zip` or `.json` file
- **New Game** — open the new game wizard to create a save
- **Continue** — jump directly to the currently active save (the most recently played)

### Save Details

Click any save in the list to expand the detail panel below. Three tabs:

- **Overview**: Script, player, turn count, status, branch node count, world time, last played, created time, and the latest dialogue excerpt
- **Settings**: In-game settings (adjustable parameters). Fields locked at creation time will be rejected by the backend if changed, with a prompt indicating which fields are restricted
- **Branches**: Branch node list for this save, with a link to open the full branch tree

Detail panel action buttons:
- **Continue** — enter this save at the latest node
- **Set as Active** — mark this save as the active save (shown only when it is not currently active)
- **Rename** — edit the save title in place
- **Export** — open the export dialog, choose a format, and download a `.zip` package
- **Delete** — delete the save; this cannot be undone

### Active Save

The save marked "Active" in the list is the one loaded by default when entering the game. Click **Set as Active** to switch.

### Branches

The save history is organized as a directed tree, similar to git. Continuing from the last node advances the current branch; continuing from a historical node automatically creates a new fork while preserving the original branch. The node marked "HEAD" is the current position.

---

## Common Tasks

### Start a New Game

Click **New Game** in the top-right corner to open the wizard:

1. **Save Name** (required) + **Script** (required)
2. **Choose Character**: Use an existing card, select a script NPC, or create a new card
3. **Starting Point** (optional): Choose a timeline anchor for where the story begins
4. **Initial Identity** (optional): An identity overlay on top of the character card (e.g., time-traveler, undercover agent); let AI generate a suggestion or create one manually
5. **Narrative Expectations** (optional): Tell the GM the direction you want the story to take

Click **Create and Enter** to finish. The save is created and you enter the game automatically.

> If no script is available, go to Scripts first to import one. A new save cannot be created until the script has finished processing (chunking and anchor building complete).

### Continue a Game

- Click **Continue** on the right side of any list row to jump directly to that save's latest node.
- Or: select a save → detail panel → **Continue**.
- The top-bar **Continue** shortcut enters the latest node of the currently active save.

### Switch to a Historical Node (Rewind / Fork)

1. Select a save → detail panel → **Branches** tab to view the node list.
2. Click the target node to switch to it. (Clicking a node already at HEAD enters the game directly.)
3. Or click **Open Full Branch Tree** to go to the full-page tree view, then activate the target node there.
4. After activating a node, enter the game to continue from it. If the selected node is not the last one, a new fork is created automatically.

### Export a Save

Select a save → detail panel → **Export** → choose a format in the dialog → click **Download**.

Exports as a self-contained `.zip` that includes the script + chapters + knowledge base (optionally with vectors) + save progress. It can be imported into any instance, including open-source self-hosted deployments, with no dependency on this server. The dialog shows estimated sizes for each format.

**Export Formats**:

| Format | Contents | Best for |
|---|---|---|
| **Standard** (recommended) | Save data + history, no vector index | Smaller file; rebuild embeddings after import for RAG search. Best for routine backups. |
| **Full** | Includes all vector embeddings | Ready to use immediately; RAG search works right away. Larger file. |

> You can only export saves that correspond to scripts you own. Subscribed public scripts cannot be packaged due to copyright restrictions.

### Import a Save

Top-right **Import Save** → upload a `.zip` (self-contained package) or `.json` (legacy format). The system detects the format automatically and adds a new entry to the list without activating it. File size limit: 200 MB.

If you import a **Standard** package (no vectors), go to Scripts, find the corresponding script, and click **Embed** to rebuild vector search so that RAG knowledge-base retrieval works correctly.

### Rename a Save

Select a save → detail panel → **Rename** → type the new name in place → save.

### Delete a Save

Select a save → detail panel → **Delete** → confirm in the dialog. Deletion cannot be undone.

---

## FAQ

**The save list is empty — what do I do?**
Click **New Game** to create your first save. You need at least one imported script with processing complete before you can start a new game.

**The script shows "Processing, not ready yet" in the new game wizard — why?**
The script is still being imported in the background (chunking / building anchors). Wait for it to finish, then try again. Check progress in Scripts.

**The game starts from the wrong node — how do I fix it?**
Exit the game → save detail panel → Branches tab → click the correct node to switch → re-enter the game.

**I want to restart from the middle of the story — is that possible?**
Find the target historical node in the branch list and click to switch to it. When you re-enter the game, play continues from that node. The original end-of-branch is preserved and not lost.

**How do I read the branch graph?**
Each track represents one branch; connecting lines show the direction of progression; the node marked "HEAD" is your current position. Deleted nodes (if any) are shown with a distinct style. See [Branch Graph](/en/branch-graph) for the full reference.

**Some fields in the save settings cannot be edited — why?**
Certain fields (such as the starting worldline) are locked once the save is created. The backend rejects change requests for these fields and the settings panel indicates which ones are restricted.

**Can the exported file be used elsewhere?**
Yes. The `.zip` is a self-contained format that can be imported into an open-source self-hosted instance or restored under a different account on the same platform. Standard packages require rebuilding vectors after import; Full packages work immediately.

---

## Related

- [Scripts](/en/scripts) — Import a script before starting a game
- [Branch Graph](/en/branch-graph) — Full reference for branch tree operations
- [New Game Wizard](/en/new-game-wizard) — Detailed walkthrough of the new game wizard
- [Character Cards](/en/cards) — Manage player character cards
