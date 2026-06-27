---
title: "Background Tasks"
description: "The Background Tasks panel consolidates all long-running async operations — script imports, knowledge extraction rebuilds, AI image generation, and more — so you can navigate freely while they run and receive a notification when each one finishes."
---

The Background Tasks panel consolidates all long-running async operations — script imports, knowledge extraction rebuilds, AI image generation, and more — so you can navigate freely without waiting on any single page. You receive a notification automatically when each task finishes.

Entry point: the panel is always present in the bottom-right corner of the screen. It appears when there are active tasks and hides automatically when there are none; no manual action is needed.

---

## Key Concepts

### Task Types

| Type | Examples | Progress display |
|---|---|---|
| Script import / knowledge rebuild | Import TXT, rebuild character cards, rebuild world book | Real progress bar + percentage |
| AI image generation | Cover image, avatar, in-chat image | Spinning indicator + elapsed time |

Import-type tasks have genuine step-by-step progress from the backend, so the progress bar advances in real time. Image generation tasks use a single API call that does not report incremental progress, so only a spinner and elapsed time are shown.

### User Isolation

The panel only shows tasks belonging to the currently signed-in account. Tasks from other users are never displayed.

---

## Common Tasks

### View Active Tasks

When there are active tasks, a "⋯" dot button appears in the bottom-right corner.

- Hover over the dot or the panel area → the card stack expands to show each task's title and spinning indicator.
- Hover over a specific task card → the card enlarges and shows details: status description, current stage, and elapsed time. Import tasks additionally show a progress bar and percentage.
- Move the cursor away from the panel → cards collapse back to the dot; page layout is unaffected.

### Pin a Task Card

Click a task card → the card is pinned and stays expanded even when you move the cursor away; the border highlights to indicate the pinned state.

Click the card again, or click anywhere outside the panel → the card is unpinned and the panel returns to its default collapsed state.

### Cancel an Image Generation Task

Expand a task card (by hovering or pinning). If the task supports cancellation, a "Cancel" button appears. Clicking it sends a cancellation request: the button disappears and the card status changes to "Cancelling…". The backend confirms the final outcome.

- Closing the page, switching tabs, or refreshing the browser does **not** cancel queued tasks.
- Cancellation can only be triggered explicitly via the "Cancel" button in the panel.

### Receive Task Completion Notifications

When a task ends, the panel disappears (it hides when no tasks are active), and a notification appears at the top of the page:

- Success → "xxx completed"
- Completed with warnings → "xxx completed (with warnings)"
- Failed → "xxx failed: error reason"
- Cancelled → "xxx cancelled"

---

## FAQ

**Q: Can I see the panel while I'm in the game view or Tavern chat?**

Yes. The panel is mounted on all platform pages — script management, character cards, saves, the main game view, Tavern, and others. Switching pages does not interrupt task display.

**Q: The progress bar seems stuck during a script import. Is something wrong?**

Imports run through multiple stages (text splitting, vectorization, extraction, etc.) with widely varying durations. A brief pause at any stage is normal. If there is no change for more than 10 minutes, try refreshing the page to re-check, or contact your administrator.

**Q: Can I cancel an image generation task?**

Yes, but image generation is a single API call. A cancellation request will stop tasks that are queued but have not yet started generating. If generation has already begun, the outcome depends on the provider and a billing charge may still be incurred.

**Q: Will tasks be cancelled if I close the panel or refresh the page?**

No. Background tasks run independently on the server. Closing the page, refreshing, or switching tabs has no effect on task execution. When you return to the page, the panel automatically re-fetches any tasks still in progress.

**Q: Why did the panel suddenly disappear?**

The panel is only visible when there are active tasks (queued or in progress). Once all tasks finish — whether successfully, with failures, or via cancellation — the panel hides automatically.

---

## Related

- [Script Management](/en/scripts) — Import scripts and trigger knowledge rebuilds
- [AI Image Generation](/en/image-gen) — Image generation entry point and configuration
- [Module Settings](/en/settings-modules) — Per-module knowledge rebuild toggles
