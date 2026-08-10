# CleanText

CleanText is a deterministic Unicode integrity auditor and deletion-only transport sanitizer for plain text.

It is built for the awkward cases where text *looks* normal but contains zero-width characters, bidi controls, Unicode tags, variation selectors, script-format controls, NUL bytes, or other characters that are easy to miss during review.

CleanText does **not** paraphrase, normalize, autocorrect, transliterate, reorder, or regenerate text. Its transport-cleaning mode removes only two things: NUL (`U+0000`) and a leading BOM (`U+FEFF`). Everything else is reported and preserved.

## Non-goal

CleanText is not a watermark remover and is not designed to defeat provenance, attribution, watermarking, or content-detection systems. A scan result cannot prove human authorship, model authorship, or the absence of a provider-side watermark.

## Why this design

Naively deleting every invisible Unicode code point breaks real text. ZWJ/ZWNJ can affect Arabic, Persian, Indic scripts, and emoji; variation selectors alter presentation; bidi controls alter ordering; Unicode tag characters participate in valid subdivision-flag emoji; invisible mathematical operators can carry semantics.

CleanText therefore treats “invisible” as something to **inspect**, not automatically erase.

## Features

- Unicode 17.0.0 `Default_Ignorable_Code_Point` coverage.
- Unicode 17.0.0 `Bidi_Control` coverage.
- Recognition of Unicode 17 RGI emoji tag sequences.
- Exact UTF-8, UTF-16, and code-point offsets for findings.
- Strict UTF-8 decoding: invalid byte sequences fail instead of being replacement-decoded.
- Deletion-only invariant: cleaning can never substitute, normalize, reorder, or rewrite a character.
- `scan`, `clean`, `--check`, JSON output, atomic `--in-place`, and clipboard commands.
- Claude Code plugin that audits `MessageDisplay` output and adds a visible warning when hidden/control Unicode appears; it does not strip the original text.
- No runtime npm dependencies.
- Cross-platform CI on Node 20 and 22 for Linux, macOS, and Windows.

## Install from source

Requirements: Node.js 20 or newer.

```bash
git clone https://github.com/robzilla1738/cleantext.git
cd cleantext
npm install
npm link
```

Then:

```bash
cleantext --help
```

Once published to npm, installation becomes:

```bash
npm install --global cleantext
```

## Audit text

```bash
cat document.txt | cleantext scan
cleantext scan document.txt --json
cleantext scan document.txt --check
```

## Safe transport cleanup

```bash
cleantext clean document.txt > cleaned.txt
cleantext clean document.txt --in-place --report
```

The default `transport` policy removes only NUL and a leading BOM represented as a text code point. `--policy preserve` makes cleaning read-only while retaining diagnostics.

## Clipboard

```bash
cleantext clipboard --report
```

On macOS and Windows, CleanText uses built-in clipboard commands. On Linux it uses `wl-clipboard` when available and falls back to `xclip`.

## Claude Code plugin

The repository includes a Claude Code plugin at `plugins/cleantext` and a marketplace manifest at `.claude-plugin/marketplace.json`.

```bash
claude --plugin-dir ./plugins/cleantext
```

The plugin registers a `MessageDisplay` audit hook. Suspicious hidden/control Unicode is preserved and visibly reported rather than silently deleted.

## Library API

```js
import { cleanText, scanText, verifyDeletionOnly } from 'cleantext';

const report = scanText('A\u200BB');
const cleaned = cleanText('\uFEFFhello\u0000', { policy: 'transport' });
console.log(verifyDeletionOnly('\uFEFFhello\u0000', cleaned.text, cleaned.findings));
```

## Reproducible Unicode data

```bash
npm run generate:unicode
```

The generator verifies SHA-256 hashes before accepting pinned Unicode 17.0.0 upstream data.

## Development

```bash
npm run check
npm test
npm pack --dry-run
```

The test suite covers multilingual text, Arabic/Persian join controls, bidi controls, emoji ZWJ and variation selectors, RGI tag flags, orphan tag data, line-ending preservation, exact byte offsets, invalid UTF-8 handling, atomic writes, and the Claude Code audit-hook protocol.

## Security

If you find a case where CleanText silently changes anything other than an explicitly permitted deletion, treat it as a security bug. See `SECURITY.md`.

## License

CleanText source code is MIT licensed. Generated Unicode property tables are derived from Unicode data licensed under Unicode License v3; see `THIRD_PARTY_NOTICES.md`.
