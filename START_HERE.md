# 🚀 START HIER!

Willkommen bei Holgers E-Mail Generator! Diese Datei zeigt dir die schnellsten Wege zum Starten.

## ⚡ Quick Start (5 Minuten)

### 1. Lokale Installation & Test

```bash
# Terminal öffnen im Projekt-Ordner
cd holgers-email-generator

# Quick Setup Script ausführen
./setup.sh

# Oder manuell:
npm install
npm run dev
```

Öffne dann: **http://localhost:5173**

### 2. API Key holen

1. Gehe zu: https://console.anthropic.com/
2. Erstelle einen Account
3. Navigiere zu "API Keys"
4. Erstelle neuen Key
5. Kopiere den Key (beginnt mit `sk-ant-api03-...`)

### 3. Erste E-Mail generieren

1. API Key in der App eingeben
2. Original-Nachricht einfügen
3. "E-Mail generieren" klicken
4. Fertig! ✨

## 🌐 Online Deployment (10 Minuten)

### GitHub + Netlify (Empfohlen)

```bash
# 1. Git Repository erstellen
git init
git add .
git commit -m "Initial commit"

# 2. Zu GitHub pushen
# Erstelle zuerst ein leeres Repo auf github.com
git remote add origin https://github.com/DEIN-USERNAME/holgers-email-generator.git
git branch -M main
git push -u origin main

# 3. Netlify Setup
# Gehe zu netlify.com
# → "Add new site" → "Import from GitHub"
# → Wähle dein Repository
# → "Deploy site"
```

**Das war's!** Netlify deployt automatisch. 🎉

## 📚 Wichtige Dateien

- **README.md** - Vollständige Dokumentation
- **DEPLOYMENT.md** - Detaillierte Deployment-Anleitungen
- **QUICK_REFERENCE.md** - Schnell-Referenz für Kommandos
- **CONTRIBUTING.md** - Contribution Guidelines

## 🎯 Nächste Schritte

### Für Entwicklung:
1. ✅ Lies die **README.md**
2. ✅ Schau dir **QUICK_REFERENCE.md** an
3. ✅ Experimentiere mit dem Code in `src/App.jsx`

### Für Deployment:
1. ✅ Folge **DEPLOYMENT.md** für Netlify Setup
2. ✅ Konfiguriere Custom Domain (optional)
3. ✅ Teile deine App! 🚀

### Für Erweiterungen:
1. ✅ Lies **CONTRIBUTING.md**
2. ✅ Erstelle einen Branch für dein Feature
3. ✅ Öffne einen Pull Request

## 🆘 Hilfe benötigt?

### Schnelle Problemlösungen:

**Problem: "npm: command not found"**
- Installiere Node.js von https://nodejs.org/

**Problem: "Port 5173 already in use"**
- Ändere Port in `vite.config.js` oder stoppe den anderen Prozess

**Problem: Build schlägt fehl**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Problem: API Fehler**
- Überprüfe ob API Key korrekt kopiert wurde
- Stelle sicher dass er mit `sk-ant-api03-` beginnt

### Weitere Hilfe:
- GitHub Issues: https://github.com/DEIN-USERNAME/holgers-email-generator/issues
- Dokumentation: Siehe README.md
- Quick Reference: Siehe QUICK_REFERENCE.md

## 💡 Pro-Tips

1. **Bookmark die App** wenn deployed
2. **Nutze Setup Script** für schnelle Installation
3. **Aktiviere GitHub Actions** für automatisches Testing
4. **Erstelle .env Datei** für lokale API Keys
5. **Check CHANGELOG.md** für Updates

## 🎉 Viel Erfolg!

Du bist bereit! Starte jetzt mit:

```bash
./setup.sh
```

Oder spring direkt zu **DEPLOYMENT.md** für Online-Deployment.

---

**Fragen?** Öffne ein Issue auf GitHub oder check die README.md! 🚀
