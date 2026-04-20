param(
  [Parameter(Mandatory = $true)][Alias('DeploymentId')][string]$LiveDeploymentId,
  [string]$VersionNumber = '',
  [string]$ReleaseNote = ''
)

$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$lastPreviewFile = Join-Path $root '.last-preview-deploy.json'
Set-Location $root

if (-not $VersionNumber) {
  if (-not (Test-Path $lastPreviewFile)) {
    throw 'Missing .last-preview-deploy.json. Run the preview deploy first or pass -VersionNumber explicitly.'
  }

  $previewRecord = Get-Content -Path $lastPreviewFile -Raw | ConvertFrom-Json
  $VersionNumber = [string]$previewRecord.versionNumber
}

if (-not $VersionNumber) {
  throw 'A validated Apps Script version number is required before promoting live.'
}

if (-not $ReleaseNote) {
  $ReleaseNote = 'Promote validated preview version ' + $VersionNumber
}

Write-Host "Promoting version $VersionNumber to live deployment $LiveDeploymentId..."
$deployOutput = & powershell -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'redeploy-webapp.ps1') -DeploymentId $LiveDeploymentId -VersionNumber $VersionNumber -Description $ReleaseNote -SkipPush
if ($LASTEXITCODE -ne 0) {
  throw 'Live promotion failed.'
}

$deployRecord = (($deployOutput | Select-Object -Last 1) | ConvertFrom-Json)
Write-Host "Live deployment $($deployRecord.deploymentId) now points at version $($deployRecord.versionNumber)."
