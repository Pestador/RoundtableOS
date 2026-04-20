param(
  [Parameter(Mandatory = $true)][string]$DeploymentId,
  [string]$Description = '',
  [string]$VersionNumber = '',
  [switch]$SkipPush
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

if (-not $Description) {
  $Description = 'Validated redeploy ' + (Get-Date -Format 'yyyy-MM-dd HH:mm')
}

if (-not $VersionNumber) {
  if (-not $SkipPush) {
    Write-Host 'Pushing the latest local source before updating the deployment...'
    & npx.cmd --cache (Join-Path $root '.npm-cache') @google/clasp --auth $authFile --project $projectFile push
    if ($LASTEXITCODE -ne 0) {
      throw 'clasp push failed before deployment.'
    }
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

  $VersionNumber = $versionMatch.Groups[1].Value
}

Write-Host "Updating deployment $DeploymentId with version $VersionNumber"

& npx.cmd --cache (Join-Path $root '.npm-cache') @google/clasp --auth $authFile --project $projectFile deploy --deploymentId $DeploymentId --versionNumber $VersionNumber --description $Description
if ($LASTEXITCODE -ne 0) {
  throw 'Web app redeploy failed.'
}

Write-Host "Deploy complete. Deployment $DeploymentId now points at version $VersionNumber."
Write-Output (
  @{
    deploymentId = $DeploymentId
    versionNumber = [string]$VersionNumber
    description = $Description
  } | ConvertTo-Json -Compress
)
