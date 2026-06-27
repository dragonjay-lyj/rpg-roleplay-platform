---
title: "Settings: Model Parameters"
description: "Adjust the sampling parameters sent to the AI model to control GM output randomness, response length, repetition suppression, and adult content policy. Changes take effect immediately and are saved automatically."
---

Adjust the sampling parameters sent to the AI model to control GM output randomness, response length, repetition suppression, and adult content policy. These settings affect every API call — they tune how the model writes, not what it is allowed to write. Changes take effect immediately and are saved automatically.

Navigation: top bar **Settings** → **Model Parameters**.

## Key Concepts

- **Temperature**: Controls output randomness. Higher values produce more creative, unpredictable text; lower values produce more consistent, conservative output. Range 0–2, default 0.78, recommended 0.4–1.0.
- **Top-p**: Nucleus sampling cutoff. The model samples only from the smallest set of tokens whose cumulative probability meets this threshold. Lower values narrow the distribution. Typical range 0.90–0.95.
- **Top-k**: Limits sampling to the K highest-probability tokens. 0 disables the parameter; default 40.
- **Repetition Penalty**: Suppresses repeated tokens. 1.0 = no effect; 1.15–1.2 is a common working range.
- **Frequency Penalty**: OpenAI-style parameter. Reduces the probability of tokens proportional to how many times they have appeared in the generated text so far.
- **Presence Penalty**: OpenAI-style parameter. Reduces the probability of tokens that have appeared at all, regardless of frequency.
- **Max Tokens**: Maximum output length for a single reply, default 4096. Setting this too low can cause the GM's narrative to be cut off mid-sentence.
- **Context Size**: The amount of conversation history included in each request. Options: 4K / 8K / 16K / 32K / 64K / 128K / 1M, default 16K. Content beyond the limit is truncated automatically.
- **Seed**: -1 means random each time. A fixed integer makes the same input produce the same output — useful for reproducible testing.
- **Stop sequences**: The model stops generating as soon as any of these strings is encountered. Separate multiple entries with `|`, e.g. `player:|system:`.
- **Reasoning Effort**: Shown only for reasoning-capable models (e.g. o3, DeepSeek R1). Controls inference depth: low = fast and token-efficient, medium = default, high = deepest reasoning.

## Common Tasks

### Switch to a Preset

Five preset buttons are available at the top of the page. Clicking one applies immediately:

| Preset | temperature | top_p | Best for |
|---|---|---|---|
| Balanced | 0.78 | 0.92 | General use — fluency and creativity |
| Conservative | 0.40 | 0.85 | Rule adjudication, system instruction parsing |
| Creative | 1.00 | 0.98 | Open-world exploration, poetry, dream sequences |
| Deterministic | 0.10 | 0.50 | Debugging, reproducibility, scripted scenarios |
| Custom | — | — | Selected automatically when you adjust any slider |

After switching a preset, the sliders below update to match. Manually adjusting any slider switches the active preset to **Custom**.

### Adjust an Individual Parameter

Temperature, Top-p, Top-k, Repetition Penalty, Frequency Penalty, and Presence Penalty each have a slider and a numeric input field that stay in sync. Adjusting either control switches the preset to **Custom** automatically.

Max Tokens and Seed use numeric input fields. Context Size uses a dropdown.

### Configure Adult Content Policy

The **NSFW / Adult Content** section in the middle of the page offers four levels:

- **Disabled**: The GM produces no adult content.
- **Suggestive**: Implications are allowed; explicit depictions are avoided. (default)
- **Explicit**: Explicit content is allowed; intensity is controlled by the **NSFW Intensity** slider (0–1).
- **Unrestricted**: Fully open; the GM may proactively escalate.

When **Suggestive**, **Explicit**, or **Unrestricted** is selected, the **NSFW Intensity** slider appears. The **NSFW Additional Constraints** text field accepts free-text instructions that are injected directly into the system prompt, for example: `All characters must be 18+`.

Sexual content involving minor characters is blocked by the system regardless of the setting selected here.

### Enable Mirostat (Advanced)

The **Mirostat Advanced Control** toggle is off by default. Enabling it lets you choose between the v1 and v2 algorithms and adjust the target perplexity (τ, default 5.0) and learning rate (η, default 0.10). Mirostat is primarily effective with local backends such as vLLM or llama.cpp; most hosted cloud APIs do not support it.

### Preview the Parameters Being Sent

The **Preview JSON** section at the bottom of the page shows a live JSON view of the exact parameters that will be sent to the API, useful for verifying your configuration.

## FAQ

**Q: After raising temperature the GM output becomes incoherent. What should I do?**
A: Bring it back below 1.0 and consider lowering top_p to around 0.90. Many models degrade noticeably above temperature 1.2.

**Q: What is a reasonable max_tokens value?**
A: A typical GM narrative passage is 200–600 characters, corresponding to roughly 300–900 tokens. 1024 is a safe starting point. For longer passages, 2048–4096 is appropriate. Keep in mind that higher max_tokens increases API cost.

**Q: I changed a parameter but it doesn't seem to have any effect.**
A: Parameter support varies by provider. top_k and repetition_penalty have no effect on Anthropic models. frequency_penalty and presence_penalty have no effect on Anthropic. mirostat is only supported by local backends. Unsupported parameters are silently filtered by the backend — they do not cause errors, but they are not applied.

**Q: Reasoning Effort doesn't appear for my model.**
A: It is only shown when the selected model has the "reasoning" capability tag (e.g. o3, DeepSeek R1). If your model qualifies but the control is missing, verify the model's capability tags in [Model Configuration](/en/settings-models).

**Q: What does adding `player:` to Stop sequences do?**
A: The GM stops generating as soon as it produces the text `player:`, which prevents it from writing dialogue on the player's behalf. Separate multiple stop strings with `|`.

**Q: Do parameter changes affect my current conversation?**
A: No. Changes take effect starting from the next GM reply. Existing conversation history is not modified.

## Related

- [Model Configuration](/en/settings-models) — configure AI providers and models
- [Module Model Assignment](/en/settings-modules) — assign models per module
- [Memory Settings](/en/settings-memory) — context memory and retrieval
