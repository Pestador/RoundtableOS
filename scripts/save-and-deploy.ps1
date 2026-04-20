param(
  [Parameter(Mandatory = $true)][string]$CommitMessage,
  [Parameter(Mandatory = $true)][Alias('DeploymentId')][string]$PreviewDeploymentId,
  [string]$ReleaseNote = '',
  [switch]$SkipGitHub,
  [switch]$SkipPreviewDeploy
)

$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$lastPreviewFile = Join-Path $root '.last-preview-deploy.json'
Set-Location $root

if ($SkipPreviewDeploy) {
  Write-Host 'Validating local source...'
  & powershell -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'validate-app.ps1')
  if ($LASTEXITCODE -ne 0) {
    throw 'Validation failed.'
  }
}

if (-not $SkipPreviewDeploy) {
  if (-not $ReleaseNote) {
    $ReleaseNote = $CommitMessage
  }

  Write-Host 'Deploying the preview web app...'
  $deployOutput = & powershell -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'redeploy-webapp.ps1') -DeploymentId $PreviewDeploymentId -Description $ReleaseNote
  if ($LASTEXITCODE -ne 0) {
    throw 'Preview deployment failed.'
  }

  $deployRecord = (($deployOutput | Select-Object -Last 1) | ConvertFrom-Json)
  $deployRecord | ConvertTo-Json | Set-Content -Path $lastPreviewFile
  Write-Host "Preview deployment $($deployRecord.deploymentId) now points at version $($deployRecord.versionNumber)."
  Write-Host 'Open the preview deployment, run the in-app smoke checks from Settings, and only then promote the validated version live.'
}

if (-not $SkipGitHub) {
  Write-Host 'Saving the validated source snapshot to GitHub...'
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

Write-Host 'Preview workflow complete.'
