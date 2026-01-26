import { useState } from 'react'

const EMAIL_PROMPT = `🎯 HOLGERS E-MAIL-PROMPT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

KERNCHARAKTERISTIKEN:

LÄNGE: Ultra-kurz! Ideal: 1-3 Sätze (60-120 Wörter max)
Lange Antworten nur wenn komplex (z.B. Angebote, Kundenfragen)

TONFALL & HALTUNG:
- Direkter und pragmatisch (nicht umständlich)
- Professionell aber nicht steif
- Kundenverständnis zeigen statt Argumente geben
- Lösungsorientiert
- Faktisch und sachlich

STRUKTUR:
1. Begrüßung: "Guten Tag," oder "Hallo," (je nach Kontext)
2. Ein Absatz (1-2 Sätze Kernaussage)
3. Abschluss: "Mit freundlichen Grüßen,"
4. Signatur: "Holger Grosser"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STANDARDFORMULIERUNGEN (NUTZE HÄUFIG):

✅ "vielen Dank für [Deine Rückmeldung/Nachricht/Frage]"
✅ "Gerne stehen wir Ihnen zur Verfügung..."
✅ "Bei Rückfragen stehe ich Ihnen gerne zur Verfügung"
✅ "bitte entschuldigen Sie die Verwirrung"
✅ "Ich habe [X] durchgeführt/erstellt/aktualisiert"
✅ "Der Bericht/die Daten liegen im Kundenordner"
✅ "Wie besprochen sende ich dir..."
✅ "Gerne" (statt "wir können" oder "ist kein Problem")
✅ "Wir können Ihre Entscheidung gut nachvollziehen"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WAS DU VERMEIDE UNBEDINGT:

❌ "gute Zusammenarbeit" (zu klischeehaft, sagst du nie)
❌ "erfolgreiche Zusammenarbeit" (auch klischeehaft)
❌ Zu lange Absätze (max. 2-3 Sätze pro Absatz)
❌ Schmück-Adjektive ("wunderbar", "fantastisch", "hervorragend")
❌ Übertriebene Höflichkeit
❌ Mehrdeutige oder vage Formulierungen
❌ "Ich habe leider..." (stattdessen: kurz und klar)
❌ Ausschweifende Erklärungen

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

KONKRETE BEISPIELE AUS DEINEN ECHTEN E-MAILS:

📧 BEISPIEL 1 (Standard Antwort - KURZ):
"Guten Tag, bitte entschuldigen Sie die Verwirrung – ich habe Ihnen zwei 
Zertifikate zugesandt. Das zweite Zertifikat ist das aktuelle und hat eine 
Gültigkeit von zwei Jahren. Bei Rückfragen stehe ich Ihnen gerne zur Verfügung.
Mit freundlichen Grüßen, Holger Grosser"

📧 BEISPIEL 2 (Erfolgs-Update):
"Hallo, Dokumente sind überarbeitet. Zertifikat kommt. 
Mit freundlichen Grüßen, Holger Grosser"

📧 BEISPIEL 3 (Fachliche Klärung):
"ich habe die liste angepasst noch einmal drüber gehen und gut ist.
Mit freundlichen Grüßen, Holger Grosser"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTEXT-REGELN:

📌 Bei Absagen/Ablehnungen:
→ Kurz, höflich, Option für Zukunft offen lassen

📌 Bei Preisen/Angeboten:
→ Kristallklar und strukturiert
→ Alle Informationen, aber kompakt
→ Nächste Schritte erklären

📌 Bei Problemen:
→ Entschuldigung + Lösung + Nächste Schritte
→ Nicht zu viel Erklärung, sondern Action

📌 Bei Dank/Komplimenten:
→ Authentic, kurz, nicht übertrieben
→ Blick nach vorne richten`

function App() {
  const [formData, setFormData] = useState({
    customerName: '',
    context: '',
    originalMessage: '',
    responseType: 'standard'
  })
  const [apiKey, setApiKey] = useState('')
  const [generatedEmail, setGeneratedEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const generateEmail = async () => {
    if (!apiKey.trim()) {
      setError('Bitte Anthropic API Key eingeben')
      return
    }

    if (!formData.originalMessage.trim()) {
      setError('Bitte Original-Nachricht eingeben')
      return
    }

    setLoading(true)
    setError('')
    setGeneratedEmail('')

    try {
      const userPrompt = `${EMAIL_PROMPT}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AUFGABE:
Schreibe eine E-Mail-Antwort auf die folgende Nachricht in Holgers Stil.

${formData.customerName ? `KUNDE: ${formData.customerName}` : ''}
${formData.context ? `KONTEXT: ${formData.context}` : ''}
ANTWORTTYP: ${formData.responseType}

ORIGINAL-NACHRICHT:
${formData.originalMessage}

Erstelle JETZT die E-Mail-Antwort (nur die E-Mail, keine Erklärungen):`

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: userPrompt
          }]
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || 'API Fehler')
      }

      const data = await response.json()
      const emailText = data.content[0].text
      setGeneratedEmail(emailText)
    } catch (err) {
      setError(`Fehler: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedEmail)
    alert('E-Mail in Zwischenablage kopiert!')
  }

  const resetForm = () => {
    setFormData({
      customerName: '',
      context: '',
      originalMessage: '',
      responseType: 'standard'
    })
    setGeneratedEmail('')
    setError('')
  }

  return (
    <div className="container">
      <header>
        <h1>📧 Holgers E-Mail Generator</h1>
        <p>KI-gestützte E-Mail-Antworten in deinem persönlichen Stil</p>
      </header>

      <div className="api-key-section">
        <label>
          🔑 Anthropic API Key
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-ant-..."
          />
        </label>
        <small>
          Dein API Key wird nur im Browser gespeichert und nie an andere Server gesendet.
          <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer">
            API Key erstellen →
          </a>
        </small>
      </div>

      <div className="form-section">
        <div className="form-group">
          <label>
            Kundenname (optional)
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              placeholder="z.B. Firma Mustermann GmbH"
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Kontext (optional)
            <input
              type="text"
              name="context"
              value={formData.context}
              onChange={handleInputChange}
              placeholder="z.B. Zertifikat, Audit, Angebot"
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Antworttyp
            <select
              name="responseType"
              value={formData.responseType}
              onChange={handleInputChange}
            >
              <option value="standard">Standard Antwort</option>
              <option value="angebot">Angebot / Preis</option>
              <option value="absage">Absage / Ablehnung</option>
              <option value="problem">Problem / Entschuldigung</option>
              <option value="erfolg">Erfolgs-Update</option>
            </select>
          </label>
        </div>

        <div className="form-group">
          <label>
            Original-Nachricht *
            <textarea
              name="originalMessage"
              value={formData.originalMessage}
              onChange={handleInputChange}
              placeholder="Füge hier die Original-E-Mail oder Nachricht ein..."
              rows="6"
              required
            />
          </label>
        </div>

        <div className="button-group">
          <button
            onClick={generateEmail}
            disabled={loading}
            className="btn-primary"
          >
            {loading ? '⏳ Generiere...' : '✨ E-Mail generieren'}
          </button>
          <button onClick={resetForm} className="btn-secondary">
            🔄 Zurücksetzen
          </button>
        </div>

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}
      </div>

      {generatedEmail && (
        <div className="result-section">
          <div className="result-header">
            <h2>📨 Generierte E-Mail</h2>
            <button onClick={copyToClipboard} className="btn-copy">
              📋 Kopieren
            </button>
          </div>
          <div className="result-content">
            <pre>{generatedEmail}</pre>
          </div>
        </div>
      )}

      <footer>
        <p>
          Made with ❤️ by Holger Grosser | 
          <a href="https://github.com/yourusername/holgers-email-generator" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App
