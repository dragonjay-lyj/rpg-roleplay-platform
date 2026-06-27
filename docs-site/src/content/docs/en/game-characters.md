---
title: "In-Game · Characters Panel"
description: "The Characters panel (labeled \"Characters\" in the right sidebar) shows the runtime character index for the current save — organized into three sections: entities currently present in the scene, explicit relationships between you and individual characters, and pinned entries linked to platform character cards. You can record or update relationship statuses here, and quickly insert any character name into the input box."
---

The Characters panel (labeled "Characters" in the right sidebar) shows the runtime character index for the current save — organized into three sections: entities currently present in the scene, explicit relationships between you and individual characters, and pinned entries linked to platform character cards. You can record or update relationship statuses here, and quickly insert any character name into the input box.

Access: Game interface right sidebar → top tab "Characters".

> This panel is a runtime index, not an entry point for creating or editing character cards. To promote an NPC to a persistent character card, go to the platform's "Character Cards" page.

---

## Three Layers of Character Data

The panel is divided into three sections, each sourced from different data:

**Currently Present**
The list of entities actually in the current room or combat encounter. Data is sourced from `active_entities` written by the backend when a room is entered or a valid combat is triggered, supplemented by combatant lists. Defeated entities (status: defeated) are not shown. Each card displays the character's name, avatar (if available), type tag (NPC / Enemy / Ally / Unknown), and current HP (combat only).

If you are not currently in a module room, the section shows "No characters present in this room" — this is expected behavior.

**Relationships**
Explicit attitude records between the player and specific characters. Records come from two sources:
- Auto-written by the system when GM output contains a structured tag in the form "Relationship: X -> Y"
- Manually created by clicking the "Add Relationship" button

Relationship entries are shown as colored status badges: Friendly / Trusted = green, Cautious = orange, Close = blue, Hostile = red, Neutral or unknown = no color.

**Pinned Character Cards**
Entries among the currently present entities that are linked to platform user character cards (have a `card_id`). These characters have full profiles in the platform's card library. If no linked entries exist, this section is hidden.

### Avatars

If a character has an avatar image (from a platform character card or imported card art), a thumbnail is shown on the left side of the card. Otherwise, the first character of the name is used as a placeholder.

---

## Common Tasks

### See who is in the scene

Check the "Currently Present" section. Each card shows the character's name, type (NPC / Enemy / Ally / Unknown), and current HP (during combat).

### Manually add a relationship record

Click "Add Relationship" at the bottom of the "Relationships" section → enter the NPC's name in the dialog → enter a relationship status (e.g., "Trusted", "Wary", "Hostile") → confirm.

### Update a relationship status

In the "Relationships" section, find the character's card → click the text in the status badge → type the new status → press Enter to save.

### Delete a relationship record

In the "Relationships" section, find the character's card → click the delete button in the top-right corner → confirm the deletion dialog.

### Insert a character name into the input box

Click the @ button in the top-right corner of any character card to insert `@CharacterName` into the game input box. If the browser does not support this, the name is automatically copied to the clipboard for manual pasting.

You can also drag a character card directly onto the input area to insert `@CharacterName`.

---

## FAQ

**An NPC appeared in the story but isn't showing in "Currently Present." Why?**
"Currently Present" only shows runtime entities that the backend has synced — these must go through the room-entry or valid combat trigger flow to be written. If the NPC appears only in the GM's narrative text without going through that flow, it will not appear here automatically. You can manually add a relationship record for that character as a temporary workaround.

**What format does the GM use for auto-written relationship tags?**
When the GM's output contains a structured tag in the form "Relationship: X -> Y", the system parses it and writes the entry to the "Relationships" section. If the GM only describes emotions in narrative prose without that tag format, no auto-write is triggered.

**Does the relationship status affect the GM's narrative?**
Yes. The GM references `state.relationships` when generating responses. Characters with a "Hostile" relationship tend to be written as acting antagonistically in the GM's narrative.

**The "Pinned Character Cards" section is empty. Is that normal?**
Yes. The section only appears when currently present entities have entries linked to platform character cards. If no such links exist in the platform's character cards page, nothing will be shown here.

**Why is there no "Create Character Card" button?**
The in-game panel only displays runtime entities. Creating, editing, and promoting persistent character cards is done from the platform's "Character Cards" page. A prompt at the bottom of the panel links you to that entry point.

---

## Related

- [Memory Panel](/en/game-memory) — Character facts are auto-written to the fact library by the GM
- [Worldbook Panel](/en/game-worldbook) — Source of character background settings
- [Character Cards (platform)](/en/cards) — Create and manage persistent character cards
