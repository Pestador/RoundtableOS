param(
  [Parameter(Mandatory = $true)][string]$RepoUrl,
  [string]$UserName,
  [string]$UserEmail,
  [switch]$InitialCommit,
  [switch]$Push
)

$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$safeRoot = $root -replace '\\', '/'

function Invoke-GitChecked {
  param(
    [Parameter(Mandatory = $true)][string[]]$Arguments
  )

  & git @Arguments
  if ($LASTEXITCODE -ne 0) {
    throw ("git " + ($Arguments -join ' ') + " failed.")
  }
}

Invoke-GitChecked -Arguments @('config', '--global', '--add', 'safe.directory', $safeRoot)

Set-Location $root

if (-not (Test-Path '.git')) {
  throw 'This workspace is not a git repository yet. Run: git init -b main'
}

if ($UserName) {
  Invoke-GitChecked -Arguments @('config', '--local', 'user.name', $UserName)
}

if ($UserEmail) {
  Invoke-GitChecked -Arguments @('config', '--local', 'user.email', $UserEmail)
}

Invoke-GitChecked -Arguments @('config', '--local', 'http.sslBackend', 'openssl')

$configuredRemotes = ((& git remote 2>$null) | ForEach-Object { $_.Trim() }) | Where-Object { $_ }
if ($configuredRemotes -contains 'origin') {
  Invoke-GitChecked -Arguments @('remote', 'set-url', 'origin', $RepoUrl)
} else {
  Invoke-GitChecked -Arguments @('remote', 'add', 'origin', $RepoUrl)
}

Write-Host "Connected origin -> $RepoUrl"
Invoke-GitChecked -Arguments @('remote', '-v')

if ($InitialCommit) {
  Invoke-GitChecked -Arguments @('add', '.')
  $hasChanges = (& git status --porcelain | Out-String).Trim()
  if ($hasChanges) {
    Invoke-GitChecked -Arguments @('commit', '-m', 'Initial Roundtable OS source snapshot')
    Write-Host 'Created initial commit.'
  } else {
    Write-Host 'No changes to commit.'
  }
}

if ($Push) {
  Invoke-GitChecked -Arguments @('push', '-u', 'origin', 'main')
  Write-Host 'Pushed main to origin.'
}
