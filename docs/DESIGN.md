# Design

## Core invariant

CleanText never performs substitutions, normalization, case folding, compatibility folding, grapheme rewriting, reordering, transliteration, or model generation. A changed output is always derivable from the input by deleting only code points explicitly authorized by the selected policy.

## Conservative Unicode handling

Default-ignorable does not mean meaningless. Join controls, variation selectors, bidi controls, tag sequences, mathematical invisibles, and script-format controls can affect semantics or rendering. CleanText therefore reports these characters and preserves them by default.

The `transport` policy removes only NUL and a leading BOM represented as a text code point. The `preserve` policy removes nothing.

## Reproducibility

Unicode property tables are pinned to Unicode 17.0.0. The generator validates upstream files by SHA-256 before generating source data.
