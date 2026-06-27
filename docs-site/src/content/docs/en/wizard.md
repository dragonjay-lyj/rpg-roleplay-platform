---
title: "New Game Wizard"
description: "The New Game Wizard is a single-page form for creating a new save file. It guides you through everything from selecting a script to configuring your character. Once all required fields are filled in, click Start Game to enter the game immediately. The summary panel on the right tracks completion status in real time — the button becomes clickable only when every required field is checked."
---

The New Game Wizard is a single-page form for creating a new save file. It guides you through everything from selecting a script to configuring your character. Once all required fields are filled in, click **Start Game** to enter the game immediately. The summary panel on the right tracks completion status in real time — the button becomes clickable only when every required field is checked.

Entry point: Save Management page → **Start New Game** (top right); or **New Save** in the Continue Game dialog.

---

## Section reference

### Basic info (required)

- **Save name** (required): A name for this save file. Pre-filled with the selected script name by default.
- **Script** (required): Choose from your imported scripts.

If a script is still being imported or is missing required data (chapters / anchors), it appears as "Not ready" in the dropdown and cannot be selected. Wait for the import to finish before creating a new game.

### Choose a character (required)

Use the segmented control at the top to switch between three sources:

- **My card library**: All user character cards and Personas in your account. Click "Preview" to see a card's full contents.
- **Script NPC**: Play as a named character from the source material. Selecting an NPC automatically locks your origin to **Native** (the GM strictly follows the world's canon).
- **Create new card**: Fill in a name and other fields. The card is added to your library automatically after creation.

### Starting point (required)

Choose the timeline anchor where your story begins. Select a script first — the starting-point list only loads after a script is selected. Anchors are grouped by story phase; each phase lists specific time nodes with chapter ranges and plot summaries. Click one to select it.

### Origin and identity card (optional)

This section has two independent settings:

**Origin** (how you enter the story world)

- **Soul transmigration**: Your modern soul inhabits a local body. The soul is foreign; the body belongs to a character from the source material.
- **Physical transmigration**: Your entire self is transported — a complete outsider with no local identity.
- **Dual soul**: Your soul coexists with the original inhabitant's. The GM depicts the host soul's reactions in the narrative.
- **Native**: You are this character from the source material. The GM strictly follows canon.

Selecting a Script NPC card automatically locks the origin to **Native**.

**Identity card** (a social-identity overlay layered on top of your character card)

- **None**: Enter the game with your character card's settings as-is.
- **From source character**: Pick an NPC from the script as your in-world identity (useful for amnesia openings).
- **AI generate**: Click "Generate" — the system generates several differentiated candidates based on the script, starting point, and character card. Click one to select it; click "Generate" again if unsatisfied.
- **Fill manually**: Enter a code name / alias, identity description, and background / motivation, then click "Apply".

After attaching an identity card (and with an origin other than Physical transmigration), the **Know your identity?** option appears:
- **Yes**: Your character knows their identity and social connections from the start.
- **No**: Amnesia / just-awakened state — your identity is revealed gradually through the story.

### Story expectations (optional)

Tell the GM in plain language how you'd like the story to develop: what the NPCs know, what is your secret, and what directions you'd like the GM to prioritize. This text is stored in the save file and the GM can reference it every turn.

---

## Summary panel

The right-hand summary panel (pinned when the viewport is wide enough) displays in real time:

- Completion status of each required field (checked / pending)
- Your current selections for save name, script, character, starting point, and identity card

Once all required fields are complete, the **Start Game** button becomes clickable. Draft progress is automatically saved locally — closing and reopening the wizard restores your last input. The draft is cleared only after a game is successfully created.

---

## Common tasks

### Minimum path (3 steps to start playing)

1. Enter a save name and select a script.
2. In "Choose a character", pick an existing card (or create one).
3. Select a starting point and click **Start Game**.

### Play as a script NPC

1. In "Choose a character", switch to the **Script NPC** tab.
2. Click the target NPC card (origin locks to "Native" automatically).
3. Select a starting point and click **Start Game**.

### Generate an identity card with AI

1. Select a script and starting point first.
2. In the "Origin and identity card" section, switch to the **AI generate** tab and click "Generate".
3. Wait for the candidate list to appear, then click one to select it.
4. If unsatisfied, click "Generate" again to retry.

---

## FAQ

**The script dropdown is empty or all options are disabled.**
Import at least one script from Script Management and wait for the import to finish (chapters and anchors must be ready).

**The starting-point list isn't loading.**
Select a script in the Basic info section first — the list only loads after a script is selected.

**Are there length or format requirements for Story expectations?**
No constraints. Plain language is fine. It helps to state what you want to avoid and which settings are secrets.

**Can these settings be changed after the game is created?**
Origin (`player_origin`) is locked at creation and cannot be changed after the game starts — create a new save to use a different origin. Save names can be renamed from the Save Management page. Other parameters (guidance intensity, etc.) can be adjusted in the save's Settings tab.

**Will my draft be lost if I close the wizard?**
No. The draft is saved locally whenever you close the wizard or navigate away. It is restored the next time you open the wizard. The draft is cleared only after a game is successfully created.

---

## Related

- [Save Management](/en/saves) — Save list, continue game, and rename
- [New Game Wizard (advanced settings)](/en/new-game-wizard) — World lines and meta-knowledge settings
- [Character cards](/en/cards) — Create and manage player character cards
- [Script management](/en/scripts) — Import scripts and check import status
