#!/bin/bash

# 🚀 Holgers E-Mail Generator - Quick Setup Script
# Dieses Script installiert und startet das Projekt automatisch

echo "📧 Holgers E-Mail Generator - Setup"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js ist nicht installiert!"
    echo "Bitte installiere Node.js von: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js gefunden: $(node --version)"
echo ""

# Install dependencies
echo "📦 Installiere Dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Installation fehlgeschlagen!"
    exit 1
fi

echo ""
echo "✅ Dependencies installiert!"
echo ""

# Ask if user wants to start dev server
read -p "🚀 Development Server starten? (j/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Jj]$ ]]; then
    echo "Starting development server..."
    echo "Öffne http://localhost:5173 im Browser"
    echo ""
    npm run dev
else
    echo ""
    echo "✅ Setup abgeschlossen!"
    echo ""
    echo "Nächste Schritte:"
    echo "  npm run dev     - Development Server starten"
    echo "  npm run build   - Produktions-Build erstellen"
    echo "  npm run preview - Build-Preview starten"
    echo ""
    echo "📖 Mehr Infos in der README.md"
fi
