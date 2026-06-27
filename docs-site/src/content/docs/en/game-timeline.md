---
title: "In-Game · Timeline Panel"
description: "The Timeline panel shows where the story currently stands: the key nodes preset in the script, the stages you have actually traversed, and which plot points have occurred or been bypassed. It also displays Worldline Convergence anchor data so you can gauge how much narrative pressure the GM is under and anticipate which plot points cannot be avoided."
---

The Timeline panel shows where the story currently stands: the key nodes preset in the script, the stages you have actually traversed, and which plot points have occurred or been bypassed. It also displays Worldline Convergence anchor data so you can gauge how much narrative pressure the GM is under and anticipate which plot points cannot be avoided.

Access: Game interface right sidebar → tab "Timeline".

---

## Key Concepts

### Script Expected Path

A chronological view of the script's key anchors, arranged top-to-bottom in chapter order. Each node includes a scene/chapter name and its corresponding chapter range. Node statuses:

- **Passed**: You have completed this story stage
- **Current**: Your present position in the story (marked with a "Current" badge)
- **Locked**: Story stages you have not yet reached

If the current script has no preset timeline, the panel shows "This script has no preset timeline."

### Actual Footprint

A record of every stage you have actually traversed in this save. Each stage entry contains:

- Stage number (Phase N)
- Stage label or turn range (turn X–Y)
- In-story time label (if recorded)
- Stage summary (if the GM wrote one)

Click a stage that has key events to expand and view the list of significant events in that stage (with turn numbers).

### Worldline Convergence · Anchors

The section at the bottom of the panel is the save's "fate pressure gauge", loaded independently from `/api/saves/:id/anchors`.

**What is an anchor?** An anchor is a plot node in the script that the GM will try to bring about regardless of player actions.

**Anchor statuses:**

| Status | Meaning |
|------|------|
| Pending | The anchor has not yet triggered; the GM is waiting for the right moment |
| Occurred | The plot point unfolded as originally written |
| Variant | The plot point occurred, but in a different direction than the original |
| Bypassed | The plot point was completely skipped |

**Drift**: 0% means the story is following the source material exactly; 100% means it has diverged significantly. The GM uses the drift value to decide whether to apply convergence pressure.

**Must-occur anchors**: Anchors marked "must occur" will be worked into the story by the GM regardless of the drift level.

---

## Common Tasks

### Check where the story currently is

Look at the "Script Expected Path" track for the node with the "Current" badge. Then look at the bottom-most (most recent) entry in the "Actual Footprint" track — the active stage is marked "In Progress".

### Review key events in a past stage

In the "Actual Footprint", click a past stage entry to expand its key event list (if recorded). Click again or click "Collapse" to fold it back.

### Find upcoming mandatory plot points

Check the "Pending" anchor list under "Worldline Convergence · Anchors" (shows up to 12 entries). Pay attention to anchors with a red "Must Occur" badge — these are plot nodes the GM will always arrange to happen.

### Understand drift pressure

Check the "Average Drift" progress bar (0% = fully on-script, 100% = highly diverged, GM will actively converge). The "By Stage" track shows each stage's converged/total count and convergence pressure percentage; click to expand a stage and see its individual anchors.

### Manually advance an anchor (player-driven progress)

For non-"must occur" anchors in the "Pending" list, click "Mark as Reached" to manually mark the anchor as occurred. The worldline progress advances accordingly. Must-occur anchors do not have this button — they must be triggered naturally by the story.

### Return to a previous worldline node

In the "Script Expected Path", nodes you have already passed have a "Return to This Node" button beneath them. Click it and confirm; the worldline progress resets to that chapter and all subsequent anchors are re-locked. Chat history is not affected.

---

## FAQ

**The footprint is empty and just shows "No footprint yet." Is that normal?**

Yes. It means the current save has not yet completed a full stage. Stage data accumulates by turn as the game progresses — a first record typically appears after a few turns.

**"Worldline Convergence · Anchors" shows "Timeline anchors not yet generated." What does that mean?**

The script may still be initializing (seeding), or the script has no chapter summaries. Anchors are generated from chapter summaries, so they require a fully configured script before they appear.

**What is the color logic for the drift progress bar?**

Drift is calculated from anchor trigger status, not by analyzing conversation content in real time. If all anchors are still "Pending", drift may appear low temporarily and will become more accurate as the story progresses.

**What should I do if the timeline fails to load?**

The panel will display an error message. Refreshing the page or waiting for the backend to recover and re-entering the game interface typically resolves this. The error message includes troubleshooting suggestions (whether the backend is running, whether your account has access to this save).

**Will my chat history disappear if I return to a previous node?**

No. Returning to a node only resets the worldline progress and re-locks subsequent anchors. Chat history is not affected.

---

## Related

- [Memory Panel](/en/game-memory) — Current objectives and fact library
- [Worldbook Panel](/en/game-worldbook) — Current story stage labels can be modified in the Worldbook panel
- [Saves and Branches](/en/saves) — Save branching operations
- [Timeline (script editor)](/en/timeline) — Configure timeline anchors in the script editor
