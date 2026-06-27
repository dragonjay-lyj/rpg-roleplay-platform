---
title: "Input Panel"
description: "The input area at the bottom of the game interface is the primary way you interact with the GM (Game Master). In addition to regular dialogue, it integrates a command menu, attachments, character @mentions, permission controls, model switching, and context usage display."
---

The input area at the bottom of the game interface is the primary way you interact with the GM (Game Master). In addition to regular dialogue, it integrates a command menu, attachments, character @mentions, permission controls, model switching, and context usage display.

Access: The fixed input area at the bottom of the screen when inside a game.

---

## Keyboard Shortcuts

| Action | Behavior |
|---|---|
| Enter | Send message (default) |
| Shift + Enter | Insert a line break in the input box |
| ⌘ + Enter | Also sends (alternative) |

The "↵" toggle button in the bottom-right corner of the input box switches between "Enter to send" and "⌘ + Enter to send." The setting persists across sessions.

When the GM is generating output, the Send button in the bottom-right corner changes to Stop, which interrupts generation immediately.

---

## Toolbar

Two rows of buttons appear below the input box:

**Left side**

- **+**: Opens the attachment menu. Attach local files, images, chapters, character cards, world book entries, MCP tools, skill packages, or enable plan mode.
- **/**: Opens the slash command menu with commands for state writes, memory management, mode switching, and more.
- Image icon: Opens the AI image generation dialog.
- **Continue**: Advances the story one beat without requiring player input (use when the player is in a passive role).
- Permission label (e.g. "Default Permissions"): Click to switch the GM's write-permission mode.

**Right side**

- Ring progress icon: Context usage. Click to see a breakdown of token consumption by category.
- Model label: The AI model the GM is currently using. Click to switch; the bottom of the flyout also lets you configure the Effort (reasoning depth) level for the selected model.

---

## Common Tasks

### Send a Message

Type an action, dialogue, or description in the input box and press Enter. The GM streams its response.

### Use Slash Commands

Type `/` in the input box to open the command menu. Use the arrow keys to select a command, then press Enter to confirm. Common commands include:

- `/set <description>`: Force-write game parameters in natural language (batch)
- `/loc <location>` / `/time <moment>`: Quickly update the current location or time
- `/pin <text>`: Add a pinned memory
- `/save` / `/retry`: Manually save the game or retry the last GM output

### @Mention a Character

Type `@` in the input box to open a character list drawn from the current script's relationships. Use arrow keys to select and Enter to insert, or type a name to filter. The GM treats `@CharacterName` as speech or an action directed at that character.

### Switch the Send Key

Click the "↵" icon in the bottom-right corner of the input box to toggle between "Enter to send" and "⌘ + Enter to send." The current mode is also indicated by the keyboard icon next to it.

### Switch GM Write Permissions

Click the permission label on the left to cycle through four modes:

- **Read-only · Narration only**: Every write operation requires explicit player approval.
- **Default permissions**: Whitelisted fields (location, time, etc.) are written automatically; others require approval.
- **Auto-approve**: Whitelist fields plus relationships and world variables are written automatically.
- **Full access**: Everything except hard-blacklisted fields is written automatically.

When the GM produces pending write requests or questions, confirmation entries appear above the input box.

### Switch Model and Reasoning Depth

Click the model label on the right to open the model selection flyout. After selecting a model, set the Effort level at the bottom of the flyout (Off / Low / Medium / High / Extra / Max) to control the thinking budget. The switch affects only the current save.

---

## FAQ

**Pressing Enter inserted a line break but the message was sent anyway. How do I change this?**

Click the "↵" button in the bottom-right corner of the input box to turn off "Enter to send." After that, Enter inserts a line break and ⌘ + Enter sends.

**A pending confirmation entry disappeared. Where did the GM's request go?**

Clicking × on the right side of an entry closes it without processing. To approve it retroactively, the GM must raise the request again on the next turn, or manually use `/permission` to switch permission modes and trigger another write.

**The model selection flyout closes as soon as I open it?**

This was a known bug caused by an initialization echo being misidentified as a user action. It has been fixed in the current version. If it still occurs, refresh the page and try again.

---

## See Also

- [Input / Commands / Attachments (full reference)](/en/game-composer) — Complete command list, attachment types, and permission mode details
- [In-Game Memory Panel](/en/game-memory) — Manage pinned memory and notes
- [In-Game World Book Panel](/en/game-worldbook) — View current world state
- [Branch Graph](/en/branch-graph) — Save branches and regeneration
- [MCP Tools](/en/mcp) — Configure and use MCP servers
