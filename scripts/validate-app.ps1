param()

$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$syntaxDir = Join-Path $root '_syntax_check'

if (-not (Test-Path $syntaxDir)) {
  New-Item -ItemType Directory -Path $syntaxDir | Out-Null
}

function Export-ScriptBlock {
  param(
    [Parameter(Mandatory = $true)][string]$SourcePath,
    [Parameter(Mandatory = $true)][string]$TargetPath
  )

  $raw = Get-Content -Path $SourcePath -Raw
  $match = [regex]::Match($raw, '<script[^>]*>([\s\S]*)</script>')
  if (-not $match.Success) {
    throw "Could not locate a <script> block in $SourcePath"
  }

  Set-Content -Path $TargetPath -Value $match.Groups[1].Value
}

function Export-PlainJavaScript {
  param(
    [Parameter(Mandatory = $true)][string]$SourcePath,
    [Parameter(Mandatory = $true)][string]$TargetPath
  )

  Get-Content -Path $SourcePath -Raw | Set-Content -Path $TargetPath
}

Export-PlainJavaScript -SourcePath (Join-Path $root 'Code.gs') -TargetPath (Join-Path $syntaxDir 'Code.js')
Export-PlainJavaScript -SourcePath (Join-Path $root 'LLM.gs') -TargetPath (Join-Path $syntaxDir 'LLM.js')
Export-PlainJavaScript -SourcePath (Join-Path $root 'Scoring.gs') -TargetPath (Join-Path $syntaxDir 'Scoring.js')
Export-PlainJavaScript -SourcePath (Join-Path $root 'Reminders.gs') -TargetPath (Join-Path $syntaxDir 'Reminders.js')
Export-ScriptBlock -SourcePath (Join-Path $root 'api.js.html') -TargetPath (Join-Path $syntaxDir 'api.js')
Export-ScriptBlock -SourcePath (Join-Path $root 'utils.js.html') -TargetPath (Join-Path $syntaxDir 'utils.js')

$filesToCheck = @(
  '_syntax_check\Code.js',
  '_syntax_check\LLM.js',
  '_syntax_check\Scoring.js',
  '_syntax_check\Reminders.js',
  '_syntax_check\api.js',
  '_syntax_check\utils.js'
)

foreach ($relativePath in $filesToCheck) {
  $absolutePath = Join-Path $root $relativePath
  Write-Host "Checking $relativePath"
  & node --check $absolutePath
  if ($LASTEXITCODE -ne 0) {
    throw "Syntax validation failed for $relativePath"
  }
}

$manifestPath = Join-Path $root 'appsscript.json'
Get-Content -Path $manifestPath -Raw | ConvertFrom-Json | Out-Null

Write-Host 'Validation passed.'
