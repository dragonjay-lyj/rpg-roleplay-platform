---
title: "Character Management"
description: "The NPC Character Cards tab is the entry point for viewing and editing character cards in a script's knowledge base. Cards are extracted automatically by an LLM when a script is imported, or can be created manually. Each card is bound to a specific script; during a game session the GM injects character information into context on demand."
---

The NPC Character Cards tab is the entry point for viewing and editing character cards in a script's knowledge base. Cards are extracted automatically by an LLM when a script is imported, or can be created manually. Each card is bound to a specific script; during a game session the GM injects character information into context on demand.

Access: Script Management → select a script → detail panel → NPC Character Cards tab.

## Key Concepts

**NPC character cards vs. knowledge-base characters**: Both appear in the script detail view, but they serve different purposes. Knowledge-base characters (a separate tab) are normalized entries extracted from text (names, locations, organizations, etc.) used for semantic search. NPC character cards are structured cards that drive the game directly — the GM uses them to understand a character's personality, background, and current state.

**NPC character cards vs. user character cards**:

| | NPC Character Card | User Character Card |
|---|---|---|
| Represents | Supporting characters / protagonist in the script | The PC you play |
| Belongs to | Bound to a specific script | Account-level, shared across scripts |
| Access | Script Management → detail → NPC Cards | Top bar "Character Cards" page |
| Visibility | Script-only / private / public | Private / public |

**Protagonist flag**: The highest-importance NPC card in each script receives a "Protagonist" badge; the GM references it more frequently during play. If the AI's automatic judgment is wrong, the script owner can correct it manually.

## Character Card Fields

The edit dialog is divided into four sections:

- **Basic info**: Name (required), full name, role, aliases (comma-separated), tags (comma-separated)
- **Character design**: Background, appearance, personality, speech style, current state
- **Story design**: Secrets, example dialogue (one line per entry)
- **Injection controls**:
  - Importance — higher values are prioritized for context injection (default 100)
  - First reveal chapter — NPC-only; the GM will not proactively reference this character before this chapter (default 1 = available throughout)
  - Token budget — maximum tokens this card may occupy when injected (default 450)
  - Priority — sort weight when multiple cards compete for the token budget
  - Visibility — script-only / private / public
  - Enabled — when disabled, the card is excluded from GM context

## Common Tasks

### View the NPC Card List

Script Management → select a script → detail panel NPC Character Cards tab. The list shows all NPC cards for the script, each displaying the avatar, name, role, alias badge, importance score, and first-reveal chapter.

### Create an NPC Card

Click "Add NPC Card" in the top-right corner of the NPC tab, fill in the fields, and save. Manually created cards behave identically to auto-extracted ones in-game.

### Edit an NPC Card

Click "View / Edit" on a card to open the edit form. Changes take effect immediately on save.

### Disable an NPC Card

Toggle the Enabled switch off at the bottom of the edit dialog. The card is hidden from GM context but not deleted; it can be re-enabled at any time.

### Correct the Protagonist (Script Owner Only)

If a card is incorrectly identified as a non-protagonist, click "Set as Protagonist" on that card. The system re-labels it and refreshes the list.

### Convert an NPC Card to a User Character Card

Any viewer (including subscribers) can click "Convert to User Character Card" on a card. The system copies the NPC into an independent character card under your account (including the avatar) without affecting the original script. The converted card appears under "Character Cards · Mine" and can be attached to any script.

### AI Review of Names and Semantics (Script Owner Only, shown when ≥ 2 cards exist)

When there are two or more NPC cards, an "AI Review Names / Semantics" button appears in the top-right corner. After selecting a model, the system runs a batch audit of all NPC cards: merging duplicate cards for the same character, identifying and locking the true protagonist, and deleting non-name cards (titles, place names, etc.) that were erroneously generated. This is an on-demand operation; it does not affect subsequent import flows and incurs no additional automatic cost.

## FAQ

**The NPC card list is empty?**
The script has not completed knowledge-base extraction, or "Generate NPC Character Cards" was turned off during import. Re-run extraction from the module status section in the script detail view.

**What is the difference between disabling a card and deleting it?**
Disabling temporarily removes the card from GM context while preserving its data. Deleting is permanent. For auto-extracted cards, disabling is preferred over deleting if you simply want to exclude it from certain games.

**I cannot see NPCs on the main Character Cards page?**
NPC cards belong to their script and do not appear in the user character card list. Convert an NPC card to a user character card first; it will then appear under "Character Cards · Mine."

**"First reveal chapter" is set to 5, but the GM mentioned the character in chapter 2?**
The chapter gate controls only proactive GM references to the NPC's information. If the player explicitly names the character, the GM may still respond. The chapter gate cannot fully suppress player-triggered dialogue.

**The AI Review button is gone?**
This feature is visible only to the script owner and requires at least 2 NPC cards to be present.

## See Also

- [Character Cards (User Cards)](/en/cards) — Managing the character cards for the PC you play
- [Script Management](/en/scripts) — Entry point for extracting NPC character cards
- [In-Game Character Panel](/en/game-characters) — View runtime character state during a session
- [Knowledge Base Modules](/en/modules) — Understanding the knowledge base system that NPC cards belong to
