#!/usr/bin/env node
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
const root=resolve('.'),files=[];
function walk(dir){for(const name of readdirSync(dir)){if(name==='node_modules'||name==='.git')continue;const path=join(dir,name),stat=statSync(path);if(stat.isDirectory())walk(path);else files.push(path);}}
walk(root);
for(const file of files.filter(p=>p.endsWith('.mjs'))){const r=spawnSync(process.execPath,['--check',file],{encoding:'utf8'});if(r.status!==0){process.stderr.write(r.stderr);process.exit(r.status||1);}}
for(const file of files.filter(p=>p.endsWith('.json')))JSON.parse(readFileSync(file,'utf8'));
console.log(`Checked ${files.filter(p=>p.endsWith('.mjs')).length} JavaScript modules and ${files.filter(p=>p.endsWith('.json')).length} JSON files.`);
