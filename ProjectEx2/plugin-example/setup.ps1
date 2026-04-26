# setup.ps1 — install (or uninstall) the taskflow-tools Claude Code plugin on Windows.
#
# Usage:
#   pwsh setup.ps1                  # install (symlink) into $HOME\.claude\plugins\taskflow-tools
#   pwsh setup.ps1 -Copy            # copy files instead of symlinking (no admin / dev mode needed)
#   pwsh setup.ps1 -Uninstall       # remove the symlink/copy
#   pwsh setup.ps1 -Target DIR      # use a different plugins directory
#
# After install: open `claude` in any project, run `/plugins`, then enable `taskflow-tools`.
#
# Note: New-Item -ItemType SymbolicLink on Windows requires either:
#   - Developer Mode enabled (Settings → For developers), OR
#   - Running as Administrator.
# If neither is available, use -Copy.

[CmdletBinding()]
param(
  [switch]$Copy,
  [switch]$Uninstall,
  [string]$Target
)

$ErrorActionPreference = 'Stop'

$PluginName = 'taskflow-tools'
$SourceDir  = Split-Path -Parent $MyInvocation.MyCommand.Path
$TargetBase = if ($Target) { $Target } else { Join-Path $HOME '.claude\plugins' }
$TargetDir  = Join-Path $TargetBase $PluginName

Write-Host "-> source: $SourceDir"
Write-Host "-> target: $TargetDir"

if ($Uninstall) {
  if (Test-Path $TargetDir) {
    Remove-Item $TargetDir -Recurse -Force
    Write-Host "OK removed $TargetDir"
  } else {
    Write-Host "nothing to remove at $TargetDir"
  }
  return
}

if (-not (Test-Path (Join-Path $SourceDir 'plugin.json'))) {
  Write-Error "plugin.json not found in $SourceDir"
  exit 1
}

New-Item -ItemType Directory -Path $TargetBase -Force | Out-Null

# refuse to clobber a real directory (only safe to remove if it's a reparse point or already managed by us)
if ((Test-Path $TargetDir) -and -not ((Get-Item $TargetDir).Attributes.ToString() -match 'ReparsePoint')) {
  Write-Error "$TargetDir exists and is not a symlink. Remove it first or run with -Uninstall."
  exit 1
}

if (Test-Path $TargetDir) { Remove-Item $TargetDir -Recurse -Force }

$useCopy = $Copy.IsPresent

if (-not $useCopy) {
  try {
    New-Item -ItemType SymbolicLink -Path $TargetDir -Target $SourceDir -ErrorAction Stop | Out-Null
    Write-Host "OK symlinked $TargetDir -> $SourceDir"
  } catch {
    Write-Warning "symlink failed (need Developer Mode or Administrator). Falling back to copy."
    $useCopy = $true
  }
}

if ($useCopy) {
  if (Test-Path $TargetDir) { Remove-Item $TargetDir -Recurse -Force }
  Copy-Item -Path $SourceDir -Destination $TargetDir -Recurse
  Write-Host "OK copied to $TargetDir (re-run setup.ps1 to refresh after edits)"
}

@"

Next steps:
  1) Open any project:   claude
  2) Inside Claude:      /plugins
  3) Enable:             $PluginName

Verify:
  Slash command:         /ping
  Subagent:              taskflow-helper

To uninstall:            pwsh setup.ps1 -Uninstall
"@ | Write-Host
