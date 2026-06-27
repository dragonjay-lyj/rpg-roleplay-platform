---
title: "In-Game · Worldbook Panel"
description: "The Worldbook panel shows the current save's live scene state — the player's location, the in-story time, the weather, and the current story stage. All four fields are directly editable; the GM reads the updated values on the next turn. The panel also displays the hard world-rule constraints preset by the script and the key terms the GM knows about this turn."
---

The Worldbook panel shows the current save's live scene state — the player's location, the in-story time, the weather, and the current story stage. All four fields are directly editable; the GM reads the updated values on the next turn. The panel also displays the hard world-rule constraints preset by the script and the key terms the GM knows about this turn.

Access: Game interface right sidebar → click "Worldbook" in the top tab bar.

---

## Key Concepts

### Location · Time (four editable fields)

The "Location · Time" block at the top of the panel displays four live fields:

| Field | Meaning | Source |
|------|------|----------|
| Location | Player's current position | Save runtime player state |
| Time | In-story time | Save runtime world state |
| Weather | Current weather | Save runtime world state |
| Stage | Current timeline stage | Save runtime timeline state |

A "—" value means the field has not been set. All four fields support inline editing — click a value to edit it.

### World Rules

A list of hard constraints from the script, sourced from the worldline configuration set at script import. The GM treats these as narrative hard limits — for example, "a certain character cannot be killed in this story" or "magic has no effect in a specific area." If the list is empty, the panel shows "(No world rules configured for this script)." World rules cannot be edited in-game; they must be maintained in the platform's script editor under worldline settings.

### Key Terms This Turn

The keywords and events the GM knows about this turn, displayed as tags. These are updated automatically by the GM after each narrative turn, sourced from the save's current turn state. If no terms are present this turn, the panel shows "No key terms this turn."

---

## Common Tasks

### Update the current location

Click the value (or "—") in the "Location" row → type the new location → press Enter (or click outside the field) to save. A brief confirmation appears in the top-right corner of the panel. The GM will use the new location starting from the next turn.

### Update the in-story time

Click the value in the "Time" row → enter a time description. Using the format "era + season + time of day" is recommended, e.g., "Winter 1942 · Late night" → press Enter to save.

### Update weather or story stage

The process is the same as updating location and time: click the field value, enter new content, and press Enter to save. The "Stage" field updates the name of the current story-stage in the timeline.

### View world rules

Check the constraint list in the "World Rules" block. The "N constraints" label next to the heading shows the current total count.

---

## FAQ

**I updated the location/time but the GM didn't reflect it. What should I do?**
Send a message to trigger a new GM turn. The change has already been written to the save; the GM will pick it up and incorporate it on the next turn.

**Does editing these fields affect the save?**
Yes. Changes are automatically persisted to the current save's runtime state. The updated values will still be in effect the next time you load the save.

**Why can't world rules be edited here?**
World rules are script-level configuration, managed in the worldline settings of the platform's script editor. The in-game panel is read-only for this data.

**What is the difference between this "Worldbook" and the "Worldbook entries" on the script management page?**
The script management page's worldbook entries are a complete reference library (place names, character names, rules, and other key terms) that the GM recalls relevant entries from each turn as context. This in-game panel shows dynamic scene fields (location, time, weather, stage) — a live projection of runtime state. The two are complementary.

---

## Related

- [Memory Panel](/en/game-memory) — Pinned memory and fact library
- [Characters Panel](/en/game-characters) — Currently present NPCs and relationships
- [Timeline Panel](/en/game-timeline) — Story stages and worldline convergence
- [Worldbook (script management)](/en/worldbook) — View and edit the full worldbook entry library
