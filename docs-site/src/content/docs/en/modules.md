---
title: "Modules"
description: "The Adventure Modules page lists built-in rule modules — currently centered on 5E-compatible adventures. Start a module game from here; the system creates an isolated save that does not affect any of your existing novel saves."
---

The Adventure Modules page lists the platform's built-in rule modules, currently focused on 5E-compatible adventures. You can start a module game directly from here — the system creates an isolated save that does not affect any of your existing novel saves.

Entry point: top navigation bar → All Features → Adventure Modules (route `#modules`).

---

## Key Concepts

### Adventure Modules

Adventure modules are predefined rule packages containing maps, quests, characters, and combat rules. The platform uses original place names and characters; the rules layer is 5E-compatible — dice rolls, skill checks, combat, and HP/AC calculations are all handled by a deterministic rules engine. The GM cannot directly alter these numeric values, ensuring rules consistency. The LLM is responsible only for narrative prose.

### Isolated Save

When you start a module, the system creates an independent game save that is fully isolated from your novel RPG saves. You can start freely without worrying about overwriting other progress.

---

## Common Tasks

### Browse Available Modules

Open the Modules page. The table lists all built-in modules with name, rule set, character level range, and estimated play time. If the list is empty, the current deployment does not include module data.

### Start a Module

1. Find the module you want in the list.
2. Click **Start Module** at the right end of the row.
3. The system creates an isolated save in the background and loads the rules environment, then automatically navigates to the Rules tab in the game console.

---

## FAQ

**The module list is empty — why?**
The current deployment does not include module data. This is a deployment configuration issue and does not affect the regular novel RPG functionality.

**Will starting a module affect my novel saves?**
No. Each click of Start Module creates a brand-new isolated save that is completely independent of all your existing saves.

**Are dice rolls and HP calculated for real in modules?**
Yes. All dice rolls, skill checks, combat resolution, and HP/AC calculations are performed deterministically by the backend rules engine. The LLM only generates narrative text and cannot directly modify numeric game state.

---

## Related

- [Module Model Assignment](/en/settings-modules) — Assign specific models to AI sub-modules such as GM, extractors, and vector embedders
- [Saves](/en/saves) — View and manage all game saves
- [New Game Wizard](/en/new-game-wizard) — Start a new game from a novel script
