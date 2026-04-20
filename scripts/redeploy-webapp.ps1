param(
  [Parameter(Mandatory = $true)][string]$DeploymentId,
  [string]$Description = ''
)

$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$authFile = Join-Path $root '.clasprc-live.json'
$projectFile = Join-Path $root '.clasp.json'

if (-not (Test-Path $authFile)) {
  throw 'Missing .clasprc-live.json. Reconnect clasp auth before redeploying.'
}

if (-not (Test-Path $projectFile)) {
  throw 'Missing .clasp.json. Link this workspace to the Apps Script project first.'
}

& (Join-Path $PSScriptRoot 'validate-app.ps1')

Write-Host 'Pushing the latest local source before redeploying the web app...'
& npx.cmd --cache (Join-Path $root '.npm-cache') @google/clasp --auth $authFile --project $projectFile push
if ($LASTEXITCODE -ne 0) {
  throw 'clasp push failed before redeploy.'
}

if (-not $Description) {
  $Description = 'Validated redeploy ' + (Get-Date -Format 'yyyy-MM-dd HH:mm')
}

Write-Host "Creating a new Apps Script version: $Description"
$versionOutput = & npx.cmd --cache (Join-Path $root '.npm-cache') @google/clasp --auth $authFile --project $projectFile version $Description
if ($LASTEXITCODE -ne 0) {
  throw 'Failed to create a new Apps Script version.'
}

$versionText = ($versionOutput | Out-String)
$versionMatch = [regex]::Match($versionText, 'Created version (\d+)')
if (-not $versionMatch.Success) {
  throw "Could not parse the new version number from clasp output: $versionText"
}

$versionNumber = $versionMatch.Groups[1].Value
Write-Host "Redeploying deployment $DeploymentId with version $versionNumber"

& npx.cmd --cache (Join-Path $root '.npm-cache') @google/clasp --auth $authFile --project $projectFile deploy --deploymentId $DeploymentId --versionNumber $versionNumber --description $Description
if ($LASTEXITCODE -ne 0) {
  throw 'Web app redeploy failed.'
}

Write-Host "Redeploy complete. Deployment $DeploymentId now points at version $versionNumber."
