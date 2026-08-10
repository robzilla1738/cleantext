# Security Policy

## Reporting

Please report security-sensitive issues privately through GitHub's private vulnerability reporting feature when enabled. Do not include confidential source text in a public issue.

## High-severity invariants

CleanText considers silent non-deletion transformations, normalization, substitution, reordering, data corruption, unsafe file replacement, or incorrect claims that text is provenance/watermark-free to be security-sensitive behavior.

The sanitizer is intentionally conservative: ambiguous or semantically meaningful Unicode is preserved and reported rather than silently removed.
