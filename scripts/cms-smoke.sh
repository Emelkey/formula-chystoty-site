#!/usr/bin/env bash
# Run from repo root; only local CLI/schema writes. No auth or remote dataset commands.
set -euo pipefail
root="$PWD"
out="${CMS_QA_OUTPUT:-outputs/cms-smoke}"
mkdir -p "$out/home/.config"
out="$(cd "$out" && pwd)"
export HOME="$out/home" XDG_CONFIG_HOME="$out/home/.config" SANITY_CLI_NO_TELEMETRY=1 DO_NOT_TRACK=1 CI=1
cat > "$out/block-network.cjs" <<'JS'
const {syncBuiltinESMExports}=require('node:module');
for(const [m,keys] of [['http',['request','get']],['https',['request','get']],['net',['connect','createConnection']],['tls',['connect']]]){
 for(const k of keys)require(m)[k]=()=>{throw new Error('CMS_QA: network disabled')};
}
global.fetch=()=>Promise.reject(new Error('CMS_QA: network disabled'));
syncBuiltinESMExports();
JS
export NODE_OPTIONS="--require=$out/block-network.cjs"
: > "$out/results.txt"
for spec in version help init_help import_help export_help schema_help; do
 case "$spec" in
 version) args=(--version);; help) args=(--help);; init_help) args=(init --help);; import_help) args=(dataset import --help);; export_help) args=(dataset export --help);; schema_help) args=(schema extract --help);;
 esac
 timeout 60 ./node_modules/.bin/sanity "${args[@]}" > "$out/$spec.log" 2>&1
 printf '%s PASS\n' "$spec" | tee -a "$out/results.txt"
done
# CLI joins the provided path to cwd, so always give a relative output path.
relative=$(node -e 'console.log(require("path").relative(process.cwd(),process.argv[1]))' "$out/schema.json")
timeout 120 ./node_modules/.bin/sanity schema extract --path "$relative" > "$out/schema-extract.log" 2>&1
node - "$out/schema.json" <<'JS'
const assert=require('node:assert/strict');const fs=require('node:fs');const schema=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));assert(Array.isArray(schema));
for(const name of ['service','priceItem','review','workExample','blogPost','faqItem','siteSettings'])assert(schema.some(t=>t.name===name),`Missing schema type ${name}`);
console.log(`Schema extraction PASS: ${schema.length} types, all 7 business types preserved.`);
JS
printf 'schema_extract PASS\n' | tee -a "$out/results.txt"
