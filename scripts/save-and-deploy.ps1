param(
  [Parameter(Mandatory = $true)][string]$CommitMessage,
  [Parameter(Mandatory = $true)][string]$DeploymentId,
  [string]$ReleaseNote = '',
  [switch]$SkipGitHub,
  [switch]$SkipAppsScriptPush,
  [switch]$SkipRedeploy
)

$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

Write-Host 'Validating local source...'
& powershell -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'validate-app.ps1')
if ($LASTEXITCODE -ne 0) {
  throw 'Validation failed.'
}

if (-not $SkipGitHub) {
  Write-Host 'Saving to GitHub...'
  git add .
  if ($LASTEXITCODE -ne 0) {
    throw 'git add failed.'
  }

  $hasChanges = (& git status --porcelain | Out-String).Trim()
  if ($hasChanges) {
    git commit -m $CommitMessage
    if ($LASTEXITCODE -ne 0) {
      throw 'git commit failed.'
    }
  } else {
    Write-Host 'No new git changes to commit.'
  }

  git push
  if ($LASTEXITCODE -ne 0) {
    throw 'git push failed.'
  }
}

if (-not $SkipAppsScriptPush) {
  Write-Host 'Pushing source to Apps Script...'
  & powershell -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'push-app-source.ps1')
  if ($LASTEXITCODE -ne 0) {
    throw 'Apps Script source push failed.'
  }
}

if (-not $SkipRedeploy) {
  if (-not $ReleaseNote) {
    $ReleaseNote = $CommitMessage
  }

  Write-Host 'Redeploying live web app...'
  & powershell -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'redeploy-webapp.ps1') -DeploymentId $DeploymentId -Description $ReleaseNote
  if ($LASTEXITCODE -ne 0) {
    throw 'Live redeploy failed.'
  }
}

Write-Host 'Done.'
