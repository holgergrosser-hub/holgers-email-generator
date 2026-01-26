# 🔧 Troubleshooting Guide

Häufige Probleme und ihre Lösungen.

---

## ⚠️ "Failed to fetch" Fehler

### Symptom
Du siehst die Fehlermeldung: "Netzwerkfehler: Bitte überprüfe deine Internetverbindung..."

### Mögliche Ursachen & Lösungen

#### 1. Ad-Blocker oder Browser-Extensions
**Problem**: Ad-Blocker blockieren manchmal API-Anfragen

**Lösung**:
- Deaktiviere Ad-Blocker für diese Seite
- Deaktiviere Browser-Extensions (z.B. Privacy Badger, uBlock Origin)
- Teste in einem Inkognito/Private-Fenster

#### 2. CORS-Problem (nur bei localhost)
**Problem**: Browser blockiert Cross-Origin Requests

**Lösung für Development**:
```bash
# Chrome mit CORS deaktiviert starten (nur für Testing!)
# macOS
open -na "Google Chrome" --args --disable-web-security --user-data-dir=/tmp/chrome_dev

# Windows
"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir=C:\tmp\chrome_dev

# Linux
google-chrome --disable-web-security --user-data-dir=/tmp/chrome_dev
```

**WICHTIG**: Das ist NUR für lokales Testing! Nutze immer deployed Version für Production.

#### 3. Firewall oder Netzwerk-Einschränkungen
**Problem**: Dein Netzwerk blockiert api.anthropic.com

**Lösung**:
- Teste von einem anderen Netzwerk (z.B. Mobile Hotspot)
- Überprüfe Firewall-Einstellungen
- Kontaktiere deinen IT-Administrator

#### 4. VPN-Probleme
**Problem**: VPN blockiert oder verändert Anfragen

**Lösung**:
- Deaktiviere VPN temporär
- Wechsle VPN-Server
- Nutze Split-Tunneling für api.anthropic.com

---

## 🔑 "Ungültiger API Key" Fehler

### Symptom
Du siehst: "Ungültiger API Key. Bitte überprüfe deinen Key."

### Lösungen

#### 1. API Key Format überprüfen
**Richtig**: `sk-ant-api03-...` (beginnt mit "sk-ant-")
**Falsch**: 
- Leerzeichen am Anfang/Ende
- Nur teilweise kopiert
- Alte Key-Version

**Lösung**:
1. Gehe zu https://console.anthropic.com/
2. Erstelle einen NEUEN API Key
3. Kopiere den KOMPLETTEN Key
4. Füge ihn ohne Leerzeichen ein

#### 2. API Key ist abgelaufen
**Lösung**: Erstelle einen neuen Key in der Anthropic Console

#### 3. API Key wurde gelöscht
**Lösung**: Erstelle einen neuen Key

---

## 💳 "Zu viele Anfragen" (429 Error)

### Symptom
"Zu viele Anfragen. Bitte warte einen Moment..."

### Lösungen

1. **Warte 1 Minute** und versuche es erneut
2. **Überprüfe dein Anthropic-Konto**: 
   - Hast du noch Credits?
   - Ist dein Account aktiv?
3. **Rate Limits beachten**:
   - Free Tier: Weniger Requests pro Minute
   - Upgrade zu Pro für höhere Limits

---

## 🌐 "Server-Fehler bei Anthropic" (500 Error)

### Symptom
"Server-Fehler bei Anthropic. Bitte versuche es später erneut."

### Lösungen

1. **Warte 5-10 Minuten** - temporäres Problem
2. **Überprüfe Anthropic Status**: https://status.anthropic.com
3. **Versuche es später** - könnte Wartung sein

---

## 🖥️ Lokale Development-Probleme

### "npm: command not found"

**Lösung**:
```bash
# Node.js installieren von: https://nodejs.org/
# Nach Installation Terminal neu starten
node --version  # Sollte Version anzeigen
npm --version   # Sollte Version anzeigen
```

### "Port 5173 already in use"

**Lösung**:
```bash
# Option 1: Anderen Port nutzen
# In vite.config.js:
export default defineConfig({
  server: { port: 3000 }
})

# Option 2: Prozess beenden
# macOS/Linux
lsof -ti:5173 | xargs kill

# Windows
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F
```

### Build schlägt fehl

**Lösung**:
```bash
# Kompletter Reset
rm -rf node_modules package-lock.json
npm install
npm run build
```

### "vite not found" oder "terser not found"

**Lösung**:
```bash
# Dependencies neu installieren
npm install --save-dev vite @vitejs/plugin-react

# Stelle sicher dass vite.config.js korrekt ist:
# minify: 'esbuild' (NICHT 'terser')
```

---

## 📱 Browser-Kompatibilität

### App funktioniert nicht in älteren Browsern

**Lösung**:
Aktualisiere auf eine moderne Browser-Version:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Copy-to-Clipboard funktioniert nicht

**Lösung**:
- Erlaube Clipboard-Zugriff in den Browser-Einstellungen
- Nutze HTTPS (nicht HTTP)
- Teste in einem anderen Browser

---

## 🔍 Debugging

### Developer Console öffnen

**Chrome/Edge/Firefox**:
- `F12` oder
- `Ctrl+Shift+I` (Windows/Linux)
- `Cmd+Option+I` (macOS)

### Console Logs überprüfen

Die App loggt wichtige Informationen:
```
Sending request to Anthropic API...
Response status: 200
API Response: {...}
```

**Bei Fehlern**:
```
API Error: {...}
Error generating email: ...
```

Screenshot davon machen und in einem GitHub Issue posten!

### Network Tab überprüfen

1. Developer Console öffnen
2. "Network" Tab wählen
3. E-Mail generieren
4. Suche nach "messages" Request
5. Überprüfe:
   - Status Code
   - Request Headers
   - Response

---

## 🚀 Netlify Deployment-Probleme

### Build schlägt fehl

**Lösung 1: Build Command überprüfen**
In `netlify.toml`:
```toml
[build]
  command = "npm install && npm run build"
  publish = "dist"
```

**Lösung 2: Node Version**
Erstelle `.nvmrc`:
```
18.0.0
```

**Lösung 3: Environment Variables**
- Stelle sicher keine ENV-Variablen fehlen
- Netlify Dashboard → Site settings → Build & deploy → Environment

### Site deployed aber leer

**Lösung**:
Überprüfe `publish` directory:
- Sollte `dist` sein (nicht `build`)
- Nach Build sollte `dist/` Ordner existieren

### 404 beim Navigieren

**Lösung**:
Stelle sicher `netlify.toml` hat:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 💾 localStorage-Probleme

### API Key wird nicht gespeichert

**Lösung**:
- Überprüfe Browser-Einstellungen (Cookies erlaubt?)
- Teste in Inkognito-Modus (localStorage funktioniert auch dort)
- Lösche Browser-Cache

### API Key verschwindet

**Lösung**:
- Nutzt du "Clear cache on exit"? → Deaktivieren
- Nutzt du Private/Inkognito permanent? → Normal-Modus nutzen

---

## 🐛 Noch nicht gelöst?

### GitHub Issue erstellen

1. Gehe zu: https://github.com/DEIN-USERNAME/holgers-email-generator/issues
2. Klicke "New Issue"
3. Wähle "Bug Report"
4. Füge hinzu:
   - Genaue Fehlermeldung
   - Screenshots
   - Browser + Version
   - OS + Version
   - Console Logs
   - Network Tab Screenshot

### Debugging-Info sammeln

```javascript
// In Browser Console ausführen:
console.log('Browser:', navigator.userAgent);
console.log('localStorage available:', typeof localStorage !== 'undefined');
console.log('API Key stored:', !!localStorage.getItem('anthropic_api_key'));
```

Screenshot davon machen und dem Issue hinzufügen.

---

## 📞 Weitere Hilfe

- **GitHub Discussions**: Stelle Fragen
- **README.md**: Vollständige Dokumentation
- **QUICK_REFERENCE.md**: Kommando-Referenz
- **Anthropic Support**: https://support.anthropic.com

---

**💡 Pro-Tip**: Die meisten Probleme sind API-Key- oder Netzwerk-bezogen. Überprüfe diese zuerst!
