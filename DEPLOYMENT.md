# 🚀 Deployment Guide

Dieser Guide zeigt dir verschiedene Wege, wie du die App deployen kannst.

## 📋 Inhaltsverzeichnis

1. [Netlify (Empfohlen)](#netlify-empfohlen)
2. [Vercel](#vercel)
3. [GitHub Pages](#github-pages)
4. [Eigener Server](#eigener-server)

---

## Netlify (Empfohlen)

### Warum Netlify?
- ✅ Kostenloses Hosting
- ✅ Automatisches Deployment bei Git Push
- ✅ SSL-Zertifikat inklusive
- ✅ CDN weltweit
- ✅ Einfache Custom Domain Integration

### Setup mit GitHub (Automatisch)

1. **Repository zu GitHub pushen**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/DEIN-USERNAME/holgers-email-generator.git
   git push -u origin main
   ```

2. **Netlify Account erstellen**
   - Gehe zu [netlify.com](https://netlify.com)
   - "Sign up" mit GitHub Account

3. **Neues Projekt erstellen**
   - Klicke "Add new site" → "Import an existing project"
   - Wähle "GitHub"
   - Autorisiere Netlify
   - Wähle dein Repository

4. **Build Settings** (sollten automatisch erkannt werden)
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`
   - Diese Werte stehen bereits in `netlify.toml`

5. **Deploy!**
   - Klicke "Deploy site"
   - Warte 1-2 Minuten
   - Deine App ist live! 🎉

6. **Custom Domain** (optional)
   - Site settings → Domain management
   - "Add custom domain"
   - Folge den Anweisungen

### Setup mit Netlify CLI (Manuell)

```bash
# Netlify CLI installieren
npm install -g netlify-cli

# Login
netlify login

# Im Projektordner
cd holgers-email-generator

# Initialisieren
netlify init

# Build
npm run build

# Deploy
netlify deploy --prod
```

### Automatisches Deployment

Nach dem ersten Setup:
1. Mache Änderungen in deinem Code
2. Committe und pushe zu GitHub
3. Netlify deployed automatisch! ✨

```bash
git add .
git commit -m "Update feature"
git push
```

---

## Vercel

### Setup mit GitHub

1. **Gehe zu [vercel.com](https://vercel.com)**
2. "Sign up" mit GitHub
3. "Add New Project"
4. Wähle dein Repository
5. Framework Preset: Vite
6. Build Command: `npm run build`
7. Output Directory: `dist`
8. "Deploy"

### Mit Vercel CLI

```bash
# Vercel CLI installieren
npm install -g vercel

# Deploy
vercel
```

---

## GitHub Pages

**Hinweis**: GitHub Pages ist für statische Sites gedacht. Die API-Calls funktionieren, aber du brauchst einen Custom Workflow.

1. **GitHub Actions Workflow erstellen**

Erstelle `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm install
    
    - name: Build
      run: npm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

2. **GitHub Pages aktivieren**
   - Repository Settings
   - Pages
   - Source: gh-pages branch
   - Save

3. **Base Path konfigurieren**

In `vite.config.js`:
```javascript
export default defineConfig({
  base: '/holgers-email-generator/', // Dein Repo-Name
  // ... rest
})
```

---

## Eigener Server

### Voraussetzungen
- Linux Server (Ubuntu empfohlen)
- Node.js installiert
- Nginx oder Apache
- SSL-Zertifikat (Let's Encrypt)

### Setup

1. **App auf Server uploaden**
```bash
# Auf deinem lokalen Rechner
npm run build

# Upload mit SCP
scp -r dist/* user@your-server:/var/www/email-generator/
```

2. **Nginx konfigurieren**

`/etc/nginx/sites-available/email-generator`:
```nginx
server {
    listen 80;
    server_name deine-domain.de;

    root /var/www/email-generator;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

3. **SSL mit Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d deine-domain.de
```

4. **Nginx neu starten**
```bash
sudo systemctl restart nginx
```

---

## 🔐 Environment Variables

Die App nutzt **keine** Server-Side Environment Variables, da der API Key im Browser eingegeben wird.

Wenn du die App erweitern möchtest und Environment Variables brauchst:

### Netlify
- Site settings → Build & deploy → Environment
- Variable hinzufügen

### Vercel
- Project Settings → Environment Variables
- Variable hinzufügen

### Lokale Entwicklung
- `.env` Datei erstellen (basierend auf `.env.example`)
- In Code verwenden: `import.meta.env.VITE_VARIABLE_NAME`

---

## 🧪 Testing vor Deployment

```bash
# Build erstellen
npm run build

# Build lokal testen
npm run preview

# Im Browser öffnen
http://localhost:4173
```

---

## 🐛 Troubleshooting

### Build schlägt fehl

```bash
# Cache löschen
rm -rf node_modules package-lock.json
npm install

# Neu bauen
npm run build
```

### "vite not found"

Stelle sicher dass in `netlify.toml` steht:
```toml
[build]
  command = "npm install && npm run build"
```

### API Calls funktionieren nicht

- Überprüfe CORS Settings
- Stelle sicher dass API Key korrekt ist
- Prüfe Browser Console auf Fehler

### Custom Domain funktioniert nicht

**Netlify:**
1. Füge Custom Domain hinzu
2. Setze DNS Records:
   - A Record: 75.2.60.5
   - CNAME: your-site.netlify.app

**Vercel:**
1. Project Settings → Domains
2. Folge den DNS-Anweisungen

---

## 📊 Performance Optimierung

Nach Deployment:

1. **Lighthouse Audit**
   - Browser DevTools → Lighthouse
   - Run Audit
   - Optimiere basierend auf Empfehlungen

2. **Bundle Size analysieren**
```bash
npm run build
# Check dist/ Ordner Größe
```

3. **CDN nutzen**
   - Netlify und Vercel nutzen automatisch CDN
   - Für eigenen Server: Cloudflare

---

## 🔄 CI/CD Pipeline

Für automatisches Testing vor Deployment:

`.github/workflows/test.yml`:
```yaml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run build
```

---

## 📱 Progressive Web App (PWA)

Um die App als PWA zu machen:

1. **Vite PWA Plugin**
```bash
npm install vite-plugin-pwa -D
```

2. **vite.config.js erweitern**
```javascript
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Holgers E-Mail Generator',
        short_name: 'E-Mail Gen',
        theme_color: '#667eea'
      }
    })
  ]
})
```

---

Bei Fragen öffne ein Issue auf GitHub! 🚀
