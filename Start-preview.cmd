@echo off
setlocal
cd /d "%~dp0"
powershell.exe -NoProfile -Command "$node=Get-Command node -ErrorAction SilentlyContinue; if($node){& $node.Source 'preview-server.cjs'; exit $LASTEXITCODE}; $pkg=Get-AppxPackage -Name 'OpenAI.CodexPrimaryRuntime*' | Sort-Object Version -Descending | Select-Object -First 1; if(!$pkg){Write-Host 'Node.js was not found. Use an HTTPS host, or install Node.js from nodejs.org.'; exit 1}; $exe=Join-Path $pkg.InstallLocation 'dependencies\node\bin\node.exe'; if(!(Test-Path -LiteralPath $exe)){Write-Host 'Node.js runtime missing.'; exit 1}; & $exe 'preview-server.cjs'; exit $LASTEXITCODE"
if errorlevel 1 pause
