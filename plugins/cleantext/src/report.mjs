export function formatHumanReport(result) {
  const lines = [];
  lines.push(`CleanText ${result.changed ? 'changed' : 'did not change'} the text.`);
  lines.push(`Policy: ${result.policy}; Unicode data: ${result.unicodeVersion}; deletion-only invariant: ${result.deletionOnly ? 'PASS' : 'FAIL'}.`);
  lines.push(`Code points: ${result.inputCodePoints} -> ${result.outputCodePoints}. Findings: ${result.findings.length}; removed: ${result.removed.length}; preserved: ${result.preservedFindings.length}.`);
  if (result.findings.length) {
    lines.push('');
    for (const finding of result.findings) {
      const name = finding.name ? ` ${finding.name}` : '';
      lines.push(`${finding.action.toUpperCase().padEnd(8)} ${finding.code}${name} at cp:${finding.offsetCodePoint} utf8:${finding.offsetUtf8} — ${finding.reason}`);
    }
  }
  return `${lines.join('\n')}\n`;
}
export function reportObject(result) {
  return {policy:result.policy,unicodeVersion:result.unicodeVersion,changed:result.changed,deletionOnly:result.deletionOnly,inputCodePoints:result.inputCodePoints,outputCodePoints:result.outputCodePoints,counts:{findings:result.findings.length,removed:result.removed.length,preserved:result.preservedFindings.length},findings:result.findings};
}
