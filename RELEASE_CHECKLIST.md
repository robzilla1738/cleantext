# Release checklist

1. Run `npm run release:check` on Node 20+.
2. Confirm the `cleantext` package name is available in the target package registry.
3. Review `CHANGELOG.md` and version metadata.
4. Confirm generated Unicode data matches pinned upstream hashes.
5. If Claude Code is installed, run `claude plugin validate ./plugins/cleantext`.
6. Tag the release and publish the npm package only after CI is green.
