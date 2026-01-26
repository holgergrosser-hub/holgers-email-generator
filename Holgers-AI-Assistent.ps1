# Holgers AI-Assistent - PowerShell Launcher
# Version 2.0 - Für Windows 10/11

# KONFIGURATION
$AppURL = "https://holgers-email-generator.netlify.app"
$PreferredBrowser = "Chrome"  # Chrome, Firefox, Edge, oder Default

# Header anzeigen
Clear-Host
Write-Host ""
Write-Host "╔══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                                                          ║" -ForegroundColor Cyan
Write-Host "║         🤖 Holgers AI-Assistent                         ║" -ForegroundColor Cyan
Write-Host "║                                                          ║" -ForegroundColor Cyan
Write-Host "║         E-Mails • Google-Rezensionen • LinkedIn         ║" -ForegroundColor Cyan
Write-Host "║                                                          ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""
Write-Host "Öffne App in $PreferredBrowser..." -ForegroundColor Yellow
Write-Host ""

# Browser-Pfade definieren
$ChromePath = "${env:ProgramFiles}\Google\Chrome\Application\chrome.exe"
$ChromePathx86 = "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe"
$FirefoxPath = "${env:ProgramFiles}\Mozilla Firefox\firefox.exe"
$EdgePath = "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe"

# Browser öffnen
try {
    switch ($PreferredBrowser) {
        "Chrome" {
            if (Test-Path $ChromePath) {
                Start-Process $ChromePath -ArgumentList $AppURL
            } elseif (Test-Path $ChromePathx86) {
                Start-Process $ChromePathx86 -ArgumentList $AppURL
            } else {
                Start-Process $AppURL
            }
        }
        "Firefox" {
            if (Test-Path $FirefoxPath) {
                Start-Process $FirefoxPath -ArgumentList $AppURL
            } else {
                Start-Process $AppURL
            }
        }
        "Edge" {
            if (Test-Path $EdgePath) {
                Start-Process $EdgePath -ArgumentList $AppURL
            } else {
                Start-Process "microsoft-edge:$AppURL"
            }
        }
        default {
            Start-Process $AppURL
        }
    }
    
    Write-Host "✅ App wurde geöffnet!" -ForegroundColor Green
    Write-Host ""
    
} catch {
    Write-Host "❌ Fehler beim Öffnen: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Drücke eine Taste zum Beenden..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

# Kurz warten und beenden
Start-Sleep -Seconds 2
exit 0
