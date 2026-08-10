#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT=resolve(dirname(fileURLToPath(import.meta.url)),'..'),OUT=resolve(ROOT,'plugins/cleantext/src/unicode-data.mjs');
const SOURCES=[
{key:'derived',url:'https://www.unicode.org/Public/17.0.0/ucd/DerivedCoreProperties.txt',sha256:'24c7fed1195c482faaefd5c1e7eb821c5ee1fb6de07ecdbaa64b56a99da22c08'},
{key:'propList',url:'https://www.unicode.org/Public/17.0.0/ucd/PropList.txt',sha256:'130dcddcaadaf071008bdfce1e7743e04fdfbc910886f017d9f9ac931d8c64dd'},
{key:'emojiSequences',url:'https://www.unicode.org/Public/17.0.0/emoji/emoji-sequences.txt',sha256:'12cc8267dc33cbd11ed32bcf6fc5dc2ad9c7a77bae1bdfba2f41b1b9b3ead8dd'}];
async function fetchPinned(s){let bytes;const d=process.env.UNICODE_DATA_DIR;if(d){const{readFile}=await import('node:fs/promises');const f=s.key==='derived'?'DerivedCoreProperties.txt':s.key==='propList'?'PropList.txt':'emoji-sequences.txt';bytes=await readFile(resolve(d,f));}else{const r=await fetch(s.url);if(!r.ok)throw new Error(`Failed to fetch ${s.url}: HTTP ${r.status}`);bytes=Buffer.from(await r.arrayBuffer());}const h=createHash('sha256').update(bytes).digest('hex');if(h!==s.sha256)throw new Error(`SHA-256 mismatch for ${s.url}\nexpected ${s.sha256}\nactual   ${h}`);return bytes.toString('utf8');}
function parseRanges(text,property){const ranges=[];for(const raw of text.split(/\r?\n/u)){const line=raw.replace(/#.*/u,'').trim();if(!line)continue;const[lhs,rhs]=line.split(';').map(p=>p.trim());if(rhs!==property)continue;const[a,b=a]=lhs.split('..');ranges.push([parseInt(a,16),parseInt(b,16)]);}return ranges;}
function parseEmojiTagSequences(text){const sequences=[];for(const raw of text.split(/\r?\n/u)){const line=raw.replace(/#.*/u,'').trim();if(!line)continue;const[lhs,rhs]=line.split(';').map(p=>p.trim());if(rhs==='RGI_Emoji_Tag_Sequence')sequences.push(lhs.split(/\s+/u).map(h=>parseInt(h,16)));}return sequences;}
const fetched=Object.fromEntries(await Promise.all(SOURCES.map(async s=>[s.key,await fetchPinned(s)]))),defaultIgnorable=parseRanges(fetched.derived,'Default_Ignorable_Code_Point'),bidiControl=parseRanges(fetched.propList,'Bidi_Control'),emojiTagSequences=parseEmojiTagSequences(fetched.emojiSequences);
const header='// GENERATED FILE. DO NOT EDIT.\n// Unicode 17.0.0 data derived from Unicode Character Database files.\n// Regenerate with: npm run generate:unicode\n// Unicode data is © Unicode, Inc. and licensed under Unicode License v3.\n\n';
const body=[`export const UNICODE_VERSION = '17.0.0';`,`export const DEFAULT_IGNORABLE_RANGES = ${JSON.stringify(defaultIgnorable)};`,`export const BIDI_CONTROL_RANGES = ${JSON.stringify(bidiControl)};`,`export const RGI_EMOJI_TAG_SEQUENCES = ${JSON.stringify(emojiTagSequences)};`,''].join('\n');
await mkdir(dirname(OUT),{recursive:true});await writeFile(OUT,header+body,'utf8');console.log(`Wrote ${OUT}`);
