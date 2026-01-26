# Changelog

Alle wichtigen Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/),
und dieses Projekt folgt [Semantic Versioning](https://semver.org/lang/de/).

## [2.0.0] - 2025-01-27

### Hinzugefügt
- **Google-Rezensionen Antworten**: Professionelle Antworten auf Google-Bewertungen (Kategorie F)
- **LinkedIn-Kommentare**: LinkedIn-Posts und Kommentare beantworten (Kategorie G)
- **Automatische Link-Integration**: Links zu QM-Guru Akademie und Auditvorbereitung werden automatisch eingefügt
- **Erweitertes Kategorien-System**: 7 Kategorien (A-G) für verschiedene Kommunikationstypen
- **Neue E-Mail-Felder**: Empfänger, Du/Sie, Ziel/CTA, Anhänge, Signatur-Optionen, Ton
- **Typ-Auswahl**: Wähle zwischen E-Mail, Google-Rezension, LinkedIn
- **Betreff-Generierung**: Automatische Betreff-Erstellung bei E-Mails
- **Flexible Signaturen**: Kurz/Lang/Keine Signatur wählbar

### Geändert
- **Neues Prompt-System**: Umfassendes System mit strukturierten Kategorien
- **UI überarbeitet**: Mehr Felder, bessere Organisation mit form-row
- **Header aktualisiert**: "AI-Assistent" statt nur "E-Mail Generator"
- **Generischer**: "Text generieren" statt "E-Mail generieren"

### Verbessert
- Präzisere Ergebnisse durch mehr Kontext-Felder
- Bessere Link-Integration basierend auf Kontext
- Professionellere Antworten durch Kategorien-System

## [1.1.0] - 2025-01-26

### Hinzugefügt
- Netlify Functions Backend (CORS-Fix)
- Bessere Fehlerbehandlung und Validierung
- localStorage für API Key
- TROUBLESHOOTING.md Guide
- Console Logging für Debugging

### Geändert
- API Calls nutzen jetzt Netlify Function als Proxy
- Verbesserte Fehlermeldungen

### Behoben
- CORS-Fehler komplett gelöst
- API Key Validierung

## [1.0.0] - 2025-01-26

### Hinzugefügt
- Initiales Release
- E-Mail-Generator mit Anthropic Claude API
- Persönlicher Schreibstil basierend auf Holgers E-Mail-Prompt
- 5 verschiedene Antworttypen (Standard, Angebot, Absage, Problem, Erfolg)
- Copy-to-Clipboard Funktion
- Responsive Design für Desktop & Mobile
- Netlify Deployment Support
- Umfangreiche Dokumentation (README, DEPLOYMENT, CONTRIBUTING)
- GitHub Templates (Issues, PR)

### Features
- React 18 mit Vite 5
- Modernes UI mit Gradient-Design
- API Key wird lokal im Browser gespeichert
- Ultra-kurze E-Mail-Generierung (60-120 Wörter)
- Kundenkontext-Integration
- Fehlerbehandlung und Validierung

---

## Geplante Features für zukünftige Versionen

### [2.1.0] - Geplant
- [ ] E-Mail-Historie speichern
- [ ] Template-System für häufige Antworten
- [ ] Dark Mode
- [ ] Keyboard Shortcuts

### [2.2.0] - Geplant
- [ ] Multi-Language Support (EN, ES)
- [ ] Browser Extension für Gmail
- [ ] Outlook Add-In

### [3.0.0] - Vision
- [ ] Datenbank-Integration
- [ ] Benutzer-Accounts
- [ ] Team-Funktionen
- [ ] A/B Testing von Formulierungen
- [ ] Analytics Dashboard
