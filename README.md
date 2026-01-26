# 📧 Holgers E-Mail Generator

KI-gestützter E-Mail-Generator mit deinem persönlichen Schreibstil. Erstellt professionelle, kurze und präzise E-Mail-Antworten basierend auf deinen individuellen Formulierungsregeln.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎯 Features

- ✨ **KI-gestützte Texterstellung** mit Claude Sonnet 4
- 📝 **Dein persönlicher Stil** - basierend auf deinen echten E-Mails
- ⚡ **Schnell & Effizient** - Antworten in Sekunden
- 🔒 **100% Privacy** - API Key bleibt im Browser
- 🎨 **Modernes UI** - Responsive Design für Desktop & Mobile
- 📋 **Copy-to-Clipboard** - Ein Klick zum Kopieren
- 🔧 **Leicht erweiterbar** - Klare Code-Struktur

## 🚀 Live Demo

👉 [Demo hier einfügen nach Deployment]

## 📦 Installation

### Voraussetzungen

- Node.js (Version 18 oder höher)
- npm oder yarn
- Anthropic API Key ([hier erstellen](https://console.anthropic.com/))

### Lokale Installation

1. **Repository klonen**
```bash
git clone https://github.com/DEIN-USERNAME/holgers-email-generator.git
cd holgers-email-generator
```

2. **Dependencies installieren**
```bash
npm install
```

3. **Development Server starten**
```bash
npm run dev
```

4. **Im Browser öffnen**
```
http://localhost:5173
```

## 🌐 Deployment auf Netlify

### Option 1: Über GitHub (Empfohlen)

1. **Repository zu GitHub pushen**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/DEIN-USERNAME/holgers-email-generator.git
git push -u origin main
```

2. **Netlify mit GitHub verbinden**
   - Gehe zu [netlify.com](https://netlify.com)
   - Klicke "Add new site" → "Import an existing project"
   - Wähle GitHub und dein Repository
   - Build Settings sind bereits in `netlify.toml` konfiguriert
   - Klicke "Deploy"

3. **Fertig!** 🎉
   - Netlify baut und deployed automatisch
   - Bei jedem Git Push wird automatisch neu deployed

### Option 2: Netlify CLI

```bash
# Netlify CLI installieren
npm install -g netlify-cli

# Projekt bauen
npm run build

# Deployen
netlify deploy --prod
```

## 🔑 API Key Setup

### Anthropic API Key erhalten

1. Gehe zu [console.anthropic.com](https://console.anthropic.com/)
2. Erstelle einen Account (falls noch nicht vorhanden)
3. Navigiere zu "API Keys"
4. Erstelle einen neuen API Key
5. Kopiere den Key (beginnt mit `sk-ant-api03-...`)

### API Key verwenden

Der API Key wird direkt in der Anwendung eingegeben und **nur im Browser** gespeichert (localStorage). Er wird **niemals** an andere Server gesendet außer direkt an Anthropic's API.

## 📖 Verwendung

1. **API Key eingeben** im ersten Feld
2. **Kundeninfo eingeben** (optional):
   - Kundenname
   - Kontext (z.B. "Zertifikat", "Audit")
3. **Antworttyp wählen**:
   - Standard Antwort
   - Angebot/Preis
   - Absage
   - Problem/Entschuldigung
   - Erfolgs-Update
4. **Original-Nachricht** einfügen
5. **"E-Mail generieren" klicken**
6. **Generierte E-Mail kopieren** und verwenden

## 🛠️ Technologie-Stack

- **Frontend**: React 18
- **Build Tool**: Vite 5
- **Styling**: CSS3 (keine Frameworks für maximale Kontrolle)
- **AI**: Anthropic Claude API (Sonnet 4)
- **Hosting**: Netlify
- **Version Control**: Git/GitHub

## 📁 Projektstruktur

```
holgers-email-generator/
├── src/
│   ├── App.jsx          # Haupt-Komponente mit Logik
│   ├── main.jsx         # React Entry Point
│   └── styles.css       # Styling
├── index.html           # HTML Template
├── package.json         # Dependencies
├── vite.config.js       # Vite Konfiguration
├── netlify.toml         # Netlify Build Settings
├── .gitignore          # Git Ignore Rules
├── .env.example        # Environment Variables Template
└── README.md           # Diese Datei
```

## 🔧 Erweiterungsmöglichkeiten

### Neue E-Mail-Typen hinzufügen

In `src/App.jsx`, füge neue Optionen zum `<select>` hinzu:

```jsx
<select name="responseType" ...>
  <option value="standard">Standard Antwort</option>
  <option value="custom">Dein neuer Typ</option>
</select>
```

### E-Mail-Prompt anpassen

Bearbeite die Konstante `EMAIL_PROMPT` in `src/App.jsx`:

```jsx
const EMAIL_PROMPT = `
// Deine Anpassungen hier
`
```

### Template-System hinzufügen

Erstelle eine neue Datei `src/templates.js`:

```javascript
export const templates = {
  absage: "Standardtext für Absagen...",
  angebot: "Standardtext für Angebote..."
}
```

### Datenbank-Integration

Erweitere das Projekt um:
- Speicherung von häufig genutzten Antworten
- Historie der generierten E-Mails
- Kundendatenbank

### Multi-Language Support

Füge Sprachauswahl hinzu:
- Englisch
- Spanisch
- Weitere Sprachen

## 🐛 Troubleshooting

### Build-Fehler: "vite not found"

**Lösung:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### API Fehler: "Invalid API Key"

**Lösung:**
- Überprüfe ob der API Key korrekt kopiert wurde
- Stelle sicher, dass er mit `sk-ant-api03-` beginnt
- Erstelle ggf. einen neuen Key

### Netlify Build Fehler: "terser not found"

**Lösung:**
Die `vite.config.js` verwendet bereits `esbuild` statt `terser`. Falls der Fehler trotzdem auftritt:

```javascript
// In vite.config.js
build: {
  minify: 'esbuild', // Sicherstellen dass dies gesetzt ist
}
```

### CORS-Fehler bei API Calls

**Lösung:**
Die Anthropic API unterstützt CORS. Falls Fehler auftreten:
- Überprüfe dass der API Key korrekt ist
- Stelle sicher dass `Content-Type: application/json` im Header ist

## 📝 Lizenz

MIT License - Frei verwendbar für private und kommerzielle Zwecke.

## 👤 Autor

**Holger Grosser**
- Website: [qm-dienstleistungen.de](https://qm-dienstleistungen.de)
- LinkedIn: [dein-profil]
- GitHub: [dein-github]

## 🤝 Beitragen

Contributions sind willkommen! Für größere Änderungen öffne bitte zuerst ein Issue.

1. Fork das Projekt
2. Erstelle einen Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Committe deine Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Push zum Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen Pull Request

## 📊 Roadmap

- [ ] Template-System für häufige Antworten
- [ ] Browser Extension für Gmail Integration
- [ ] Mehrsprachigkeit (EN, ES)
- [ ] Datenbank für E-Mail-Historie
- [ ] A/B Testing verschiedener Formulierungen
- [ ] Mobile App (React Native)
- [ ] Outlook Add-In

## ⭐ Support

Gefällt dir das Projekt? Gib ihm einen ⭐ auf GitHub!

Bei Fragen oder Problemen öffne ein [GitHub Issue](https://github.com/DEIN-USERNAME/holgers-email-generator/issues).

---

Made with ❤️ by Holger Grosser
