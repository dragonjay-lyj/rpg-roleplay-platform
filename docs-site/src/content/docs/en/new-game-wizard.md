---
title: "New Game Wizard"
description: "The New Game Wizard guides you through everything from selecting a script to configuring your origin. Once all required fields are filled in, click Create & Enter to go directly into the game. Draft progress is saved locally — closing the dialog or navigating away mid-way will not lose your input."
---

The New Game Wizard guides you through everything from selecting a script to configuring your origin. Once all required fields are filled in, click **Create & Enter** to go directly into the game. Draft progress is saved locally — closing the dialog or navigating away mid-way will not lose your input.

Entry point: **Start New Game** button in the top-right of the Save Management page.

---

## Section reference

The wizard presents each section as a scrollable form. The **Summary** panel on the right aggregates your current selections in real time.

### Basic info (required)

- **Save name** (required): A name for this save file. Can be renamed later from the save detail page.
- **Script** (required): Choose from your imported scripts. If the list is empty, import a script from Script Management first.

If a script is still being imported in the background or is missing required data (chapters / anchors), a warning is shown and the script cannot be selected. Wait for the import to finish and try again.

### Choose a character (required)

Three tabs for character source:

- **Use existing**: Choose from the player personas and character cards in your account. Preview support included.
- **Script NPC**: Play directly as a named character from the source material — selecting one automatically locks your origin to **Native**.
- **Create new card**: Fill in a character name (required), identity description, and background. The card is added to your library automatically after creation.

### Starting point (required)

Choose the timeline anchor where your story begins. Select a script first — the starting-point list only loads after a script is selected. Anchors are grouped by story phase; expand a phase to see specific nodes (with chapter ranges and plot summary hints). If no anchor is selected, the story starts from the beginning.

### Character origin and identity (steps 2–4)

This section has three sub-steps:

**Step 1: Origin**

Determines how you enter the story world and affects how the GM handles your memory, knowledge, and soul configuration:

| Origin | Meaning | Identity card constraint |
|---|---|---|
| **Soul transmigration** | Foreign soul in a local body; retains modern memory and foreknowledge | Can attach any identity card, or none |
| **Physical transmigration** | Entire self transported — complete outsider | No local identity; must choose "No identity card" |
| **Dual soul** | Coexists with the native soul in one body; GM plays the other soul | Must attach an identity card |
| **Native** | You are this world's native inhabitant | Can omit, or add a social position overlay |

Selecting a Script NPC character locks origin to **Native** and cannot be changed.

**Step 2: Character identity (optional)**

An identity card is a social-position overlay layered on top of your character card (social role, alias, relationship network) — it does not affect name or appearance. Four sources:

- **No identity card**: Enter the game using only your character card (the only valid option for Physical transmigration; also available for other origins).
- **From source character**: Pick an NPC from the script as the protagonist's forgotten or assumed real identity.
- **AI generate**: Click "Generate identity" — the system produces 4 candidates based on the script, starting point, and character. Select one; click "Regenerate" if unsatisfied.
- **Fill manually**: Enter an alias, role description, and background, then click "Confirm identity".

**Step 3: Know your identity? (only available when an identity card is attached and origin is not Physical transmigration)**

- **Yes**: Your character knows their social connections and secrets from the start.
- **No**: Amnesia / just-awakened state — identity is revealed gradually through the story.

### Guidance and spoiler protection (optional)

| Setting | Options | Description |
|---|---|---|
| **Meta-knowledge / foreknowledge** | None / Partial / Full | How much you as a player know about the source material's plot |
| **NPC suspicion threshold** | Oblivious / Suspicious | How sensitive in-world NPCs are to your out-of-character behavior |
| **Story guidance** | Strong / Moderate / Free | How hard the GM pushes the story toward the source material's track |
| **Spoiler protection level** | Strict / Relaxed | How carefully the GM protects plot details from being revealed prematurely |

All settings have defaults and take effect if left unchanged. They can also be adjusted in the settings panel after entering the game (guidance intensity is adjustable in real time during play).

### High-priority GM directives (optional)

Tell the GM your game direction and preferences in plain language — for example, "The protagonist refuses any combat and must find non-combat solutions" or "The transmigrator identity is an absolute secret." This text is injected at high priority into every turn's context; the GM will follow it as closely as possible. This field can be left empty.

---

## Common tasks

### Minimum path (4 steps to start playing)

1. In "Basic info", enter a save name and select a script.
2. In "Choose a character", select an existing card (or create one).
3. In "Starting point", expand a phase and select an anchor.
4. Click **Create & Enter**.

### Play as a script NPC

1. In "Choose a character", switch to the **Script NPC** tab.
2. Select a source character.
3. Origin locks to "Native" automatically — the GM strictly follows this character's canon worldview.

### Generate an identity card with AI

1. Select a script, starting point, and character first.
2. In the "Character identity" section, choose **AI generate**.
3. Click **Generate identity** and wait for 4 candidates to appear.
4. Click one to select it. Click **Regenerate** to try again if unsatisfied.

### Amnesia opening

1. Attach an identity card (AI generate or from source character).
2. In "Know your identity?", choose **No**.
3. The character starts with no knowledge of their true identity — it unfolds through the story.

---

## FAQ

**The script dropdown is empty or shows "Import a script first".**
Go to Script Management and complete the import of at least one script. Return and reopen the wizard once processing is done.

**The starting-point list isn't loading.**
Select a script in the "Basic info" section first — the list only loads after a script is selected. If the script was just imported, click "Retry" to refresh.

**The "Script NPC" tab is grayed out and not clickable.**
No NPC character cards have been extracted for this script yet. Generate or extract character cards in the script editor, then try again.

**Why does Dual soul require an identity card?**
Dual soul needs a native body for the GM to roleplay as the other soul. Without an identity card, the GM has no information about that body's background or relationships, making the narrative impossible to establish.

**Can I change the origin after selecting it?**
No. Origin is locked when the save is created and cannot be changed after the game starts. Create a new save to use a different origin.

**I closed the wizard halfway through. Will my progress be gone?**
No. The wizard saves to a local draft in real time. Reopening the wizard restores your last input automatically.

**Can the save name be changed later?**
Yes. Go to Save Management, select the save, and use the "Rename" action in the detail panel.

---

## Related

- [Save Management](/en/saves) — Save list, continue game, and branch management
- [Character cards](/en/cards) — Create and manage player character cards
- [Script management](/en/scripts) — Import and manage scripts
- [Game settings](/en/settings-params) — Adjust guidance intensity and other parameters in-game
