# Contributing

Contributions are welcome, especially Unicode correctness tests and portability fixes.

## Ground rules

1. The cleaning path must remain deterministic and deletion-only.
2. Do not add normalization, homoglyph substitution, transliteration, paraphrasing, or model-based rewriting.
3. Do not add features whose purpose is to defeat provenance, attribution, watermarking, or detection systems.
4. Script-sensitive and rendering-sensitive Unicode should default to preservation.
5. Every newly removable code point requires a regression test and a documented reason that removal is safe for the stated policy.

## Setup

```bash
npm install
npm run check
npm test
```

## Pull requests

Include a minimal before/after test case, the relevant Unicode property/specification reference when changing Unicode handling, and tests for non-Latin or emoji edge cases when applicable. Do not include confidential, proprietary, or personally identifying text in fixtures.
