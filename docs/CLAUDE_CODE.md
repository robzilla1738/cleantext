# Claude Code integration

CleanText ships as a Claude Code plugin under `plugins/cleantext`.

For local development:

```bash
claude --plugin-dir ./plugins/cleantext
```

The `MessageDisplay` hook audits each display batch using preserve mode. If hidden/control Unicode is present, it appends a visible diagnostic while preserving the original displayed text. It does not modify Claude's stored transcript or model-visible context.

The bundled `/cleantext` skill provides deterministic Unicode integrity diagnostics on text files. It avoids provenance-removal workflows and instructs Claude to use the deterministic scanner rather than rewriting text with a model.
