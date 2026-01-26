# ⚡ Quick Reference

Schnellübersicht über die wichtigsten Kommandos und Workflows.

## 🚀 Wichtigste Kommandos

```bash
# Development starten
npm run dev

# Production Build
npm run build

# Build Preview
npm run preview

# Dependencies installieren
npm install

# Dependencies aktualisieren
npm update
```

## 📦 Projekt Setup

```bash
# Quick Setup mit Script
./setup.sh

# Manuell
git clone https://github.com/DEIN-USERNAME/holgers-email-generator.git
cd holgers-email-generator
npm install
npm run dev
```

## 🌐 Deployment

### Netlify (schnellste Methode)
```bash
# Mit Netlify CLI
npm install -g netlify-cli
netlify login
netlify init
npm run build
netlify deploy --prod
```

### Vercel
```bash
# Mit Vercel CLI
npm install -g vercel
vercel
```

### Manueller Build
```bash
npm run build
# Upload dist/ Ordner zu deinem Server
```

## 🔧 Entwicklung

### Neue Feature erstellen
```bash
git checkout -b feature/mein-feature
# ... Code ändern ...
git add .
git commit -m "feat: neue Feature-Beschreibung"
git push origin feature/mein-feature
# Pull Request auf GitHub erstellen
```

### Bug fixen
```bash
git checkout -b fix/bug-name
# ... Bug fixen ...
git add .
git commit -m "fix: Bug-Beschreibung"
git push origin fix/bug-name
```

## 📝 Commit Messages

**Format**: `type: description`

**Types**:
- `feat`: Neues Feature
- `fix`: Bug Fix
- `docs`: Dokumentation
- `style`: Formatierung (kein Code-Change)
- `refactor`: Code-Refactoring
- `test`: Tests
- `chore`: Build/Config

**Beispiele**:
```bash
git commit -m "feat: add email template system"
git commit -m "fix: resolve API key validation error"
git commit -m "docs: update README with new features"
```

## 🐛 Troubleshooting

### Problem: Build schlägt fehl
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Problem: Port 5173 bereits belegt
```bash
# In vite.config.js
export default defineConfig({
  server: {
    port: 3000 // Ändere Port
  }
})
```

### Problem: API Fehler
1. Überprüfe API Key
2. Check Browser Console
3. Teste mit curl:
```bash
curl -X POST https://api.anthropic.com/v1/messages \
  -H "x-api-key: $DEIN_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{"model":"claude-sonnet-4-20250514","max_tokens":100,"messages":[{"role":"user","content":"Test"}]}'
```

## 🔄 Updates & Maintenance

### Dependencies aktualisieren
```bash
# Check veraltete Packages
npm outdated

# Update alle Dependencies
npm update

# Specific Package updaten
npm install package-name@latest
```

### Security Audit
```bash
npm audit
npm audit fix
```

## 📊 Code Quality

### Build analysieren
```bash
npm run build
# Check dist/ Ordner Größe
du -sh dist/
```

### Code linting (wenn configured)
```bash
npm run lint
npm run lint:fix
```

## 🗂️ Dateien & Ordner

```
holgers-email-generator/
├── src/               # Source Code
│   ├── App.jsx       # Haupt-Komponente
│   ├── main.jsx      # Entry Point
│   └── styles.css    # Styling
├── public/           # Statische Assets
├── dist/             # Build Output
├── .github/          # GitHub Templates
├── package.json      # Dependencies
├── vite.config.js    # Vite Config
├── netlify.toml      # Netlify Config
└── README.md         # Dokumentation
```

## 🔐 Environment Variables

Für lokale Entwicklung:
```bash
# .env erstellen
cp .env.example .env

# In Code verwenden
const apiKey = import.meta.env.VITE_API_KEY
```

## 📱 Browser DevTools

### Nützliche Shortcuts
- `F12` - DevTools öffnen
- `Ctrl+Shift+C` - Element Inspector
- `Ctrl+Shift+I` - Console
- `Ctrl+Shift+M` - Device Toolbar (Mobile View)

### Performance Check
1. DevTools → Lighthouse
2. "Generate Report"
3. Optimierungen durchführen

## 🎨 UI Anpassungen

### Farben ändern
In `src/styles.css`:
```css
/* Haupt-Gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Button Farbe */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Font ändern
In `src/styles.css`:
```css
font-family: 'Deine-Font', -apple-system, ...
```

## 🔗 Nützliche Links

- [Vite Docs](https://vitejs.dev/)
- [React Docs](https://react.dev/)
- [Anthropic API Docs](https://docs.anthropic.com/)
- [Netlify Docs](https://docs.netlify.com/)

---

**Pro-Tip**: Bookmark diese Datei für schnellen Zugriff! 🚀
