---
title: "Branch Management"
description: "Branch management lets you treat each save's conversation history as a version tree — every turn is a node, and every time you replay from a historical node the tree grows a new fork while the original path is fully preserved. You can create a new branch from any historical node, switch to a previous path to continue from there, or delete unwanted subtrees."
---

Branch management lets you treat each save's conversation history as a version tree — every turn is a node, and every time you replay from a historical node the tree grows a new fork while the original path is fully preserved. You can create a new branch from any historical node, switch to a previous path to continue from there, or delete unwanted subtrees.

Access: Top bar "Saves & Branches" → "Branch Management"; or in-game right panel top bar → Branch button to open the compact branch graph (click the arrow icon in the top-right corner to open the full branch graph in a new tab).

---

## Key Concepts

### Branch Graph (VSCode Git Graph Style)

- Colored vertical lines on the left: each branch track (swimlane), with different colors for different branch paths
- One node (commit) per row, newest at the top
- The active node (HEAD) has an outer-ring highlight on its dot
- Deleted nodes are shown with a dashed line; they can still be traced in the graph
- Right side of each node: branch name label (ref pill), turn summary, timestamp

### Two Views

- **Full branch graph** (Platform "Branch Management" page): Shows all branch paths for the save; any node can be operated on.
- **Compact branch graph** (In-game right panel → Branch): Shows only the chain traced back from the current active node along its parent chain — i.e., the path you are currently on.

### What Happens to Deleted Content

When you delete from a message bubble ("Delete this message and everything after"), the old branch is automatically saved to `refs/trash/...` and can be recovered by switching back to it in the branch management tree.

---

## Common Tasks

### Start a New Branch from a Message

Use this when you want to take a different path at a key decision point.

1. In the game conversation, hover over the target message. An action bar appears at the bottom.
2. Click the Fork icon (tooltip: "Start new branch here").
3. A confirmation dialog shows a message preview. Click "New Branch" to confirm.
4. The system retains the history from that message's node onward in the original branch and switches to the new branch. If you forked from your own (player) message, that message is placed back into the input box so you can revise and resend it.

### Regenerate This Turn (Get a Different Response)

1. Hover over a GM reply and click the Refresh icon (tooltip: "Regenerate this turn").
2. The system creates a new branch just before that reply and re-runs the same player input, producing a different GM response.

### Switch to a Historical Node (Change Current Progress)

In the full branch graph (Platform "Branch Management" page):

1. Find the target node row and click "Switch to This Branch" (checkmark icon) on the right.
2. The system moves the active node of the current save to that point; entering the game will continue from there.

In the in-game compact branch graph:

1. Click the Branch button to open the right panel.
2. Find the target node and click "Switch to This Branch" (checkmark) or "Continue from Here" (play icon).

### Continue from a Historical Node (Open a New Branch Without Switching First)

In the full branch graph:

1. Find the target node and click "Continue from Here" (play icon).
2. The system creates a new branch from that node and switches it to the current progress; entering the game continues from there.

### Delete a Message and Everything After It

1. Hover over the target message and click the Delete icon (tooltip: "Delete this message and everything after").
2. A danger confirmation dialog shows which turns will be discarded.
3. Click "Confirm Delete." The old content is saved to `refs/trash/...` and can be recovered via the branch management tree.

### Delete a Branch Subtree in the Full Branch Graph

1. In the Branch Management page, find the target node row and click the Delete Subtree icon (trash can).
2. A confirmation dialog appears; after confirming, the node and all its descendants are deleted.
3. This action cannot be recovered through the normal trash-ref path within the same save.

### Refresh the Branch Graph

Click the Refresh button in the top-right corner to pull the latest state from the server.

---

## FAQ

**The branch graph is empty?**
The current save has no game history yet. Nodes are generated after you enter the game and send the first turn.

**After creating a new branch, is the original path still there?**
Yes. The original branch is fully preserved; new content appears on the new track. Both paths are visible in the full branch graph.

**The in-game Branch panel shows only one line. Where are my other branches?**
The in-game panel is the "current sub-branch" view and shows only the chain traced back from the current active node. For the complete DAG, click the arrow icon in the panel's top-right corner to open the Branch Management page in a new tab.

**I deleted a message and want to undo it?**
Branches deleted from message bubbles are saved to `refs/trash/...`. They are still visible in the full branch graph on the Branch Management page; click "Switch to This Branch" to return to them.

**What is the difference between "Switch to This Branch" and "Continue from Here"?**
"Switch to This Branch" only moves the active pointer without creating a new branch; the historical node becomes the new current progress and the game continues from there. "Continue from Here" creates a new branch from that node and continues on the new branch, leaving the original branch intact.

---

## See Also

- [Save Management](/en/saves) — Save list, renaming, deletion
- [Game Interface](/en/game-composer) — In-game conversation and controls
