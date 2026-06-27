---
title: "Script Review"
description: "Script Review lets you inspect the settings the AI automatically extracted from the source text to verify their accuracy. Extracted content includes canonical entities (characters, locations, factions, etc.) and canonical world lines. You can view AI-generated summaries, correct incorrect entries, delete misidentified entities, and click \"Confirm settings\" to mark the review as complete."
---

Script Review lets you inspect the settings the AI automatically extracted from the source text to verify their accuracy. Extracted content includes canonical entities (characters, locations, factions, etc.) and canonical world lines. You can view AI-generated summaries, correct incorrect entries, delete misidentified entities, and click "Confirm settings" to mark the review as complete.

Passing review is a prerequisite for publishing a script publicly. It is not required to start a game, but reviewing before play ensures the GM operates from accurate settings.

Entry point: Script Management → expand a script → click the **Setting verification** button; or select "Setting verification" from the action dropdown.

---

## Page contents

### Verification status bar

The top of the page shows the current verification status:

- Orange border — "Settings not yet verified": not yet confirmed. Click "Confirm settings" to complete verification.
- Green border — "Settings verified": verified, with the timestamp shown. If you find errors, click "Revoke confirmation" to return to unverified status for further editing.

### Extraction quality indicators

Below the status bar, several extraction quality signals are displayed:

| Indicator | Meaning |
|---|---|
| Extraction OK / Needs review | The AI's overall assessment of whether the extraction has suspicious issues |
| Author annotation N | N instances of author-inserted notes detected (inline notes, parenthetical explanations, non-narrative content) |
| Unusual title N | N chapter titles with abnormal formatting detected |
| Numbering gap N | N gaps in chapter numbering — possible missing chapters |
| Ad lines cleaned N | Number of advertisement lines automatically removed during import |

These indicators help you quickly identify areas that need closer attention. They do not affect the verification flow.

### Canonical entity table

Lists all entities the AI extracted from the full text. Each row contains:

| Column | Description |
|---|---|
| Name | The canonical name of the entity as it appears in the source text |
| Type | Entity category (e.g., character, location) |
| First chapter | The chapter where this entity first appears |
| Importance | The AI's assessed importance level |
| Summary | AI-generated description — editable |
| Actions | Edit summary / Delete |

### Canonical world-line list

The lower section of the page lists the canonical world lines for the script, along with the chapter node sequence under each. The primary timeline is marked with a star ( a star).

---

## Common tasks

### Correct an incorrect summary

1. Find the entity row with an inaccurate summary.
2. Click "Edit summary" — an inline input field appears.
3. Edit the content and click "Save". Click "Cancel" to discard changes.

### Delete a misidentified entity

Find the incorrectly extracted entry (e.g., ad copy or a chapter title misidentified as a character name) → click "Delete" → confirm in the deletion dialog.

Deletion is permanent. If you delete something by mistake, you must re-run extraction to recover it — any manually edited summaries will be lost.

### Complete the review

After spot-checking, click "Confirm settings" at the top. The status bar turns green and the confirmation timestamp is recorded.

### Revoke and re-edit after confirming

If you find new errors, click "Revoke confirmation" to reset the status to unverified. Once edits are done, click "Confirm settings" again.

---

## FAQ

**The summary column is empty.**
This entity appears infrequently in the source text and the AI could not generate a useful description. Click "Edit summary" to fill it in manually.

**Do edits to summaries take effect immediately after saving?**
Yes. Saved summaries take effect immediately — the GM will use the corrected summary the next time you play.

**Does the script need to be re-reviewed after it is updated?**
Yes. After re-running extraction (e.g., triggering a rebuild), the verification status resets to "unverified" automatically. Re-open this page to confirm again.

**Publishing shows "Verify script settings before sharing".**
This is a publish gate: a script must pass setting verification before it can be shared publicly. Complete verification and then click "Share / Publish" from the script list.

**Can chapter splits be fixed here?**
No. Chapter-level operations (rename, split, merge, re-split) are performed in the "View chapters" dialog — see [Script management](/en/scripts).

---

## Related

- [Script management](/en/scripts) — Import scripts, manage chapters, and vectorize
- [World book](/en/worldbook) — View and edit world book entries
- [Memory and knowledge base](/en/memory) — How the GM uses extracted settings
