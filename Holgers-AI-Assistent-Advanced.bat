@echo off
REM =================================================================
REM Holgers AI-Assistent - Desktop Launcher
REM Version 2.0
REM =================================================================

title Holgers AI-Assistent Launcher

REM KONFIGURATION - HIER DEINE URL EINTRAGEN!
set APP_URL=https://holgers-email-generator.netlify.app

REM Optional: Bestimmten Browser wählen
REM Setze BROWSER auf: chrome, firefox, edge, oder default
set BROWSER=chrome

REM =================================================================

cls
echo.
echo ╔══════════════════════════════════════════════════════════╗
echo ║                                                          ║
echo ║         🤖 Holgers AI-Assistent                         ║
echo ║                                                          ║
echo ║         E-Mails • Google-Rezensionen • LinkedIn         ║
echo ║                                                          ║
echo ╚══════════════════════════════════════════════════════════╝
echo.
echo Öffne App in %BROWSER%...
echo.

REM Browser auswählen und öffnen
if /i "%BROWSER%"=="chrome" (
    start chrome "%APP_URL%"
    if %ERRORLEVEL% NEQ 0 goto TryDefault
) else if /i "%BROWSER%"=="firefox" (
    start firefox "%APP_URL%"
    if %ERRORLEVEL% NEQ 0 goto TryDefault
) else if /i "%BROWSER%"=="edge" (
    start msedge "%APP_URL%"
    if %ERRORLEVEL% NEQ 0 goto TryDefault
) else (
    goto TryDefault
)

goto Success

:TryDefault
echo Browser '%BROWSER%' nicht gefunden, nutze Standard-Browser...
start "" "%APP_URL%"

:Success
echo.
echo ✅ App wurde geöffnet!
echo.
timeout /t 2 /nobreak >nul
exit
