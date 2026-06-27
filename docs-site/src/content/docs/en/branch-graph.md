---
title: "Branch Graph"
description: "Each time you advance the story in-game, the system automatically creates a node recording the narrative state at that moment. When you take a different path from a past node, a branch is created. The Branch Graph presents the save file's narrative tree in a swimlane layout inspired by VSCode Git Graph, giving you a clear view of all forks and history."
---

Each time you advance the story in-game, the system automatically creates a node recording the narrative state at that moment. When you take a different path from a past node, a branch is created. The Branch Graph presents the save file's narrative tree in a swimlane layout inspired by VSCode Git Graph, giving you a clear view of all forks and history.

Entry point: Click the **Branches** button at the top of the in-game right panel to open the compact view; navigate to **Branch Graph** (Save Management → Branch Graph) for the full view.

---

## Key concepts

**Node**: A node is created automatically after each GM response, capturing the narrative state at that moment. Nodes appear as colored dots in the graph.

**Branch line (swimlane)**: Nodes on the same story line are arranged in the same column (swimlane) and connected with the same color. The main trunk uses the primary color (orange); each new branch gets a successive color. Up to 6 colors cycle in rotation.

**HEAD (current position)**: The node where your save currently sits. Its dot has a bold outline with an outer ring. All new GM output continues forward from this node.

**Ref labels (branch pointers)**: Small colored-border labels beside nodes, marking the position of each named branch pointer. The currently active branch shows a `HEAD →` prefix.

**Deleted nodes**: Previously deleted nodes appear with a dashed connection line and a semi-transparent dot, kept in the graph for reference.

---

## Two views

| View | Entry point | Content |
|---|---|---|
| Compact view | In-game right panel → "Branches" button | Shows only the history of the current HEAD's ancestor chain (this line's history) — parallel branches are not shown. Smaller row height, summary only. |
| Full view | Platform "Branch Graph" page | Complete DAG with all branch lines visible. Each row shows round number, timestamp, and action buttons. |

The compact view has an external-link button in the top right to open the full view in a new tab.

---

## Common tasks

### View in-game branch history

During play, click the **Branches** button in the right panel toolbar to open the current sub-branch's history list. The list is ordered newest to oldest (top to bottom); the current HEAD node is highlighted with an outer ring.

### Switch to a past node (checkout)

In the full view, hover over the target node row and click the checkmark button (Switch to this branch) that appears on the right. The save's HEAD pointer moves to that node and the game state updates immediately. This does not delete any history — it only moves "current position."

The compact view (in-game) also supports switching via the checkmark button on each row.

### Continue from a past node (new branch)

Hover over the target node row and click the play button (Continue from here). The system sets that node as the new fork point — subsequent GM output forms a new branch line while the existing history remains intact.

### Delete a node subtree

In the full view, hover over the target node row and click the trash button (Delete subtree). A confirmation dialog lists the nodes that will be deleted. Confirming permanently deletes that node and all its descendants. This action cannot be undone — use with caution.

### Switch between save files

The full view has a save selector dropdown in the top right. Switching saves refreshes the graph to show the selected save's branch tree. The adjacent "Refresh" button manually reloads the current save's latest data.

---

## FAQ

**The graph keeps showing "No branch nodes yet".**
The first node is created only after you send the first game input. If you already have a game history but still see this, click the "Refresh" button, or confirm that the correct save is selected.

**Why can't I see other branch lines in the compact view?**
The compact view only shows the current HEAD's ancestor chain (this sub-branch's history) to minimize right-panel space usage. To see all branches, click the external-link button in the top right of the compact view to open the full view.

**The action buttons on node rows aren't appearing.**
The action buttons appear only when you hover over a row. The compact view (in-game right panel) supports switching and "continue from here," but does not have a delete button — deletion must be done in the full view.

**Can a deleted subtree be recovered?**
No. Deleting a subtree is a permanent operation and cannot be undone. Review the list of nodes in the confirmation dialog carefully before confirming.

---

## Related

- [Save Management](/en/saves)
- [Branch management](/en/branches)
- [Game settings](/en/settings-params)
