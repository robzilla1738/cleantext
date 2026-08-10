# Threat model

CleanText helps users notice invisible or control Unicode and avoid accidental corruption while moving text between systems.

## In scope

- Hidden/control Unicode that is easy to miss during review.
- Lossy UTF-8 decoding.
- Accidental normalization or rewriting.
- Unsafe in-place file replacement.
- Misclassification of legitimate script, bidi, emoji, or mathematical formatting.

## Out of scope

CleanText is not designed to defeat provenance, attribution, watermarking, or content-detection systems, and a scan cannot establish authorship.

Input text is treated as untrusted data and is never evaluated as code. Diagnostics identify suspicious characters by code-point labels rather than relying on invisible rendering.
