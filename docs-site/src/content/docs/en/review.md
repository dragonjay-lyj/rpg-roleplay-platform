---
title: "Content Review"
description: "Content Review covers two types of quality checks on AI-extracted results: Setting verification (whether characters, world-building, and timeline were extracted correctly) and AI name/semantics review (whether NPC character cards have duplicate cards for the same character, non-name cards, etc.). Both are triggered on demand and do not run as part of the import pipeline."
---

Content Review covers two types of quality checks on AI-extracted results: **Setting verification** (whether characters, world-building, and timeline were extracted correctly) and **AI name/semantics review** (whether NPC character cards have duplicate cards for the same character, non-name cards, etc.). Both are triggered on demand — they do not run as part of the import pipeline and incur no automatic cost.

Entry point: Script Management → expand a script's detail panel.

---

## Key concepts

### Setting verification

During import, the AI extracts canonical entities (characters, locations, factions, etc.) and world-line nodes from the source text. Setting verification lets you inspect these results, correct summaries, delete incorrect entries, and then click "Confirm settings" to mark the script as verified.

Passing verification is a prerequisite for publishing a script publicly. It is not required to start a game, but verifying before play ensures the GM operates from accurate settings. Re-running extraction resets the verification status to "unverified."

### AI name/semantics review

NPC cards generated in bulk during import may have the following issues:

- The same character has multiple cards under different names (e.g., "Jin Yu", "Yu'er", and "Little Yu" as three separate cards)
- The protagonist is identified as an ordinary NPC
- Titles, place names, or non-name strings are mistakenly generated as character cards

AI name/semantics review performs a one-time semantic arbitration across all NPC cards: merging duplicate cards for the same character, identifying and flagging the true protagonist, and deleting non-name cards. The operation consumes an AI call and must be triggered manually with a model selection.

---

## Common tasks

### Open setting verification

In the script detail panel, click the **Setting verification** button, or select "Setting verification — AI extraction results" from the action dropdown. The dialog shows the verification status bar, extraction quality indicators, canonical entity table, and world-line list.

For detailed steps, see [Script review](/en/scripts-review).

### Trigger AI name/semantics review

1. Open the script detail panel and switch to the **NPC Cards** tab.
2. When there are at least 2 NPC cards, an **AI name/semantics review** button appears in the top right. Click it to open the dialog.
3. Read the description, then select a model in the "Choose review model" area. The system defaults to your configured primary model; you can temporarily switch to any model with a configured API key. Higher-quality models produce more accurate results.
4. Click **Start review** and wait for completion. A summary appears in the notification bar (e.g., "Merged N groups, deleted N non-name cards, protagonist → [name]"), and the NPC card list refreshes automatically.

### View review results

After the review completes, the NPC card list updates immediately:

- Duplicate cards for the same character are merged into one, keeping the most complete content.
- The true protagonist card is marked with a "Protagonist" badge.
- Cards misidentified from titles, place names, or non-name strings are deleted.

If you believe a review result is incorrect, you can manually edit, restore, or add cards in the NPC card list.

---

## FAQ

**The "AI name/semantics review" button isn't showing.**
The button only appears when there are at least 2 NPC cards. Complete the import (including the NPC card generation phase), or manually add enough NPC cards, then try again.

**The dialog says "API key not configured for this model".**
The selected model does not have credentials configured. Switch to a configured model in the dialog, or go to Settings → API & Models to add the key, then retry.

**Will the review overwrite my manually edited cards?**
When merging, the system keeps the most complete card's content, but manually edited fields may be overwritten. It is best to do the AI review before making detailed manual edits, not after extensive hand-editing.

**The NPC card count went down after the review. Is that normal?**
Yes. The review deletes non-name cards and merges duplicates — a reduction in total card count is expected behavior.

**What is the difference between setting verification and AI name/semantics review?**
Setting verification targets "canonical entities" and "world lines" — the knowledge-base content extracted by the LLM during import. AI name/semantics review targets "NPC character cards" — it resolves card-level issues such as duplicates and misidentified cards. The two operate independently on different objects.

---

## Related

- [Script review](/en/scripts-review) — Detailed steps for setting verification (entity table / world lines / confirmation flow)
- [Script management](/en/scripts) — Import scripts, manage chapters, and vectorize
- [Character cards](/en/cards) — User character card management
