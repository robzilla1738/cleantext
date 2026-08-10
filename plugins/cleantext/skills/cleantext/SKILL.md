---
name: cleantext
description: Audit text files for invisible, default-ignorable, bidi, tag, and control Unicode. Use for Unicode integrity, suspicious hidden characters, text transport bugs, or copy/paste diagnostics. Do not use it to remove or evade provenance, attribution, or watermarking systems.
allowed-tools: Bash
---

# CleanText

Use the bundled deterministic scanner for Unicode integrity work. Do not rewrite the user's text with a language model.

## Audit a file

```bash
node "$CLAUDE_PLUGIN_ROOT/bin/cleantext.mjs" scan PATH --json
```

Explain findings by code point and offset. Preserve Unicode characters that may affect shaping, bidi ordering, emoji presentation, mathematical semantics, or script behavior.

## Safe transport cleanup

Only for text transport corruption rather than provenance or attribution:

```bash
node "$CLAUDE_PLUGIN_ROOT/bin/cleantext.mjs" clean PATH --in-place --report
```

The transport policy removes only NUL and a leading BOM. Never claim a negative scan proves human authorship or absence of an AI watermark.
