param()

$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$authFile = Join-Path $root '.clasprc-live.json'
$projectFile = Join-Path $root '.clasp.json'

if (-not (Test-Path $authFile)) {
  throw 'Missing .clasprc-live.json. Reconnect clasp auth before pushing source.'
}

if (-not (Test-Path $projectFile)) {
  throw 'Missing .clasp.json. Link this workspace to the Apps Script project first.'
}

& (Join-Path $PSScriptRoot 'validate-app.ps1')

Write-Host 'Pushing local source into the bound Apps Script project...'
& npx.cmd --cache (Join-Path $root '.npm-cache') @google/clasp --auth $authFile --project $projectFile push

if ($LASTEXITCODE -ne 0) {
  throw 'clasp push failed.'
}

Write-Host 'Source push finished. The live web app is unchanged until you redeploy a version.'
