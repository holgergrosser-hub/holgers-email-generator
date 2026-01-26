@echo off
REM Holgers AI-Assistent - Desktop Shortcut
REM Öffnet die App direkt im Browser

echo Öffne Holgers AI-Assistent...

REM Versuche Chrome zu öffnen
start chrome "https://holgers-email-generator.netlify.app"

REM Falls Chrome nicht gefunden wird, nutze Standard-Browser
if %ERRORLEVEL% NEQ 0 (
    start https://holgers-email-generator.netlify.app
)

exit
