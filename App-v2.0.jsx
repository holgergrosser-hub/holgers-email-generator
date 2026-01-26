import { useState } from 'react'

const SYSTEM_PROMPT = `Du bist mein E-Mail-Assistent und schreibst im Stil von Holger Grosser (QM-Guru): kurz, direkt, klare nächste Schritte.

SCHREIBREGELN (sehr wichtig)
- Deutsch.
- Keine langen Einleitungen, keine Floskeln. 1–2 Sätze pro Absatz.
- Immer genau 1 klare Frage ODER 1 klare nächste Aktion am Ende.
- Bei Kunden: höflich, „Sie"-Form, freundlich.
- Intern: kurz & knapp, gern Aufgabenliste + Links + Deadline.
- Rechtschreibung: gerne sauberer als meine Rohfassung, aber Ton bleibt direkt.
- Keine unnötigen Details erfinden. Wenn Daten fehlen: stelle MAXIMAL 2 Rückfragen, sonst mit Platzhaltern arbeiten: [DATUM], [LINK], [BETRAG], [ANHANG].
- Ausgabe immer in diesem Format:
  1) Betreff (1 Zeile)
  2) Mailtext
  3) Optional: „Kurzfassung (1–2 Sätze)"

SIGNATUR
- Extern standardmäßig: „Mit freundlichen Grüßen\\nHolger Grosser"
- Intern standardmäßig: „VG\\nHolger"
(Keine langen Telefon/Adresse-Blöcke ausgeben, außer ich sage explizit: SIGNATUR=LANG)

LINK-INTEGRATION (nutze diese Links wenn passend)
- QM-Guru Akademie (Schulungen, Kurse): https://qm-guru-akademie.netlify.app/
- Auditvorbereitung (Audit-Vorbereitung, ISO): https://vorbereitung-auf-audit.netlify.app/
- Füge Links nur ein wenn sie zum Kontext passen
- Format: "Mehr Infos: [URL]" oder "Siehe auch: [URL]"

KATEGORIEN (wähle genau eine)

A) Kunden-Follow-up / Angebot
- Nutze auf Wunsch diese Struktur:
  📋 (kurzer Titel)
  ✅ enthalten (3–6 Bulletpoints)
  💰 Preis/Spanne (1–2 Zeilen)
  🚀 Nächste Schritte (nummeriert 1–3)
- Call-to-action: Rückmeldung oder Termin

B) Reklamation / schwierige Situation
- 1 Satz Entschuldigung
- 1 Satz Klärung (Fakt/Regel)
- 1 Satz Lösung/Plan + ggf. Erwartung (z.B. Stunden, Termin, Korrektur)
- Abschlussfrage: „Passt das so?" / „Ist das für Sie in Ordnung?"

C) Terminabstimmung
- Entweder 2 Terminvorschläge ODER ein Termin-Link (wenn Link vorhanden)
- Optional: Agenda (3–6 Bulletpoints)
- Abschluss: Bestätigung/Terminwahl

D) Rechnungen / Orga
- „im Anhang … Rechnung vom [DATUM]"
- 1 Satz Hilfe/Fragen
- Optional: Bitte um Zahlung bis [DATUM] (nur wenn ich es angebe)

E) Intern kurz & knapp
- Direktive + Kontext in 1 Satz
- Liste: wer macht was (Namen), Deadline
- Links danach

F) Google-Rezension Antwort
- Danke für Bewertung (1 Satz)
- Bei positiv: Kurz freuen + optional Link zu weiteren Angeboten
- Bei negativ: Verständnis zeigen + Lösung anbieten
- Immer professionell, kurz (max. 3 Sätze)

G) LinkedIn-Kommentar
- Kurz & prägnant (1-2 Sätze)
- Wertschätzung oder Zustimmung
- Optional: Eigene Perspektive hinzufügen
- Kein Link-Spam, nur wenn wirklich relevant`

function App() {
  const [formData, setFormData] = useState({
    category: 'email', // email, google-review, linkedin
    responseType: 'A', // A-G kategorien
    recipient: '',
    duSie: 'Sie',
    context: '',
    originalMessage: '',
    goal: '',
    attachments: '',
    signature: 'KURZ',
    tone: 'Original-direkt'
  })
  
  // Load API key from localStorage on mount
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('anthropic_api_key') || ''
  })
  
  const [generatedText, setGeneratedText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Save API key to localStorage when it changes
  const handleApiKeyChange = (e) => {
    const newKey = e.target.value
    setApiKey(newKey)
    if (newKey.trim()) {
      localStorage.setItem('anthropic_api_key', newKey)
    } else {
      localStorage.removeItem('anthropic_api_key')
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const generateEmail = async () => {
    // Validierung
    if (!apiKey.trim()) {
      setError('Bitte Anthropic API Key eingeben')
      return
    }

    if (!apiKey.startsWith('sk-ant-')) {
      setError('API Key muss mit "sk-ant-" beginnen. Bitte überprüfe deinen Key.')
      return
    }

    if (!formData.originalMessage.trim()) {
      setError('Bitte Original-Nachricht / Kontext eingeben')
      return
    }

    setLoading(true)
    setError('')
    setGeneratedText('')

    try {
      // Build user prompt based on category
      let userPrompt = `${SYSTEM_PROMPT}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INPUT:
`
      
      if (formData.category === 'email') {
        userPrompt += `Kategorie: ${formData.responseType}
Empfänger: ${formData.recipient || '[Nicht angegeben]'}
Du/Sie: ${formData.duSie}
Kontext: ${formData.context || '[Siehe Original-Nachricht]'}
Ziel/CTA: ${formData.goal || '[Antwort generieren]'}
Anhänge/Links: ${formData.attachments || '[Keine]'}
SIGNATUR: ${formData.signature}
Ton: ${formData.tone}

ORIGINAL-NACHRICHT:
${formData.originalMessage}

Erstelle JETZT die E-Mail-Antwort basierend auf diesen Angaben.`
      } else if (formData.category === 'google-review') {
        userPrompt += `TYP: Google-Rezension Antwort (Kategorie F)

REZENSION:
${formData.originalMessage}

Erstelle JETZT eine professionelle Antwort auf diese Google-Rezension. Kurz, wertschätzend, max. 3 Sätze. Füge passende Links ein wenn relevant.`
      } else if (formData.category === 'linkedin') {
        userPrompt += `TYP: LinkedIn-Kommentar (Kategorie G)

POST/KOMMENTAR:
${formData.originalMessage}

Erstelle JETZT einen professionellen LinkedIn-Kommentar. Kurz & prägnant, 1-2 Sätze. Nur relevante Links einbauen.`
      }

      console.log('Sending request to Anthropic API...')
      
      // Nutze Netlify Function als Proxy (umgeht CORS)
      const response = await fetch('/.netlify/functions/generate-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          apiKey: apiKey,
          prompt: userPrompt
        })
      })

      console.log('Response status:', response.status)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('API Error:', errorData)
        
        if (response.status === 401) {
          throw new Error('Ungültiger API Key. Bitte überprüfe deinen Key.')
        } else if (response.status === 429) {
          throw new Error('Zu viele Anfragen. Bitte warte einen Moment und versuche es erneut.')
        } else if (response.status === 500) {
          throw new Error('Server-Fehler bei Anthropic. Bitte versuche es später erneut.')
        } else {
          throw new Error(errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`)
        }
      }

      const data = await response.json()
      console.log('API Response:', data)
      
      if (!data.content || !data.content[0] || !data.content[0].text) {
        throw new Error('Ungültige API-Antwort erhalten')
      }
      
      const text = data.content[0].text
      setGeneratedText(text)
    } catch (err) {
      console.error('Error generating text:', err)
      
      if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        setError('Netzwerkfehler: Bitte überprüfe deine Internetverbindung.')
      } else {
        setError(err.message || 'Ein unbekannter Fehler ist aufgetreten')
      }
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText)
    alert('Text in Zwischenablage kopiert!')
  }

  const resetForm = () => {
    setFormData({
      category: 'email',
      responseType: 'A',
      recipient: '',
      duSie: 'Sie',
      context: '',
      originalMessage: '',
      goal: '',
      attachments: '',
      signature: 'KURZ',
      tone: 'Original-direkt'
    })
    setGeneratedText('')
    setError('')
  }

  return (
    <div className="container">
      <header>
        <h1>🤖 Holgers AI-Assistent</h1>
        <p>E-Mails • Google-Rezensionen • LinkedIn-Kommentare</p>
      </header>

      <div className="api-key-section">
        <label>
          🔑 Anthropic API Key
          <input
            type="password"
            value={apiKey}
            onChange={handleApiKeyChange}
            placeholder="sk-ant-..."
          />
        </label>
        <small>
          Dein API Key wird lokal im Browser gespeichert und nie an andere Server gesendet.
          <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer">
            API Key erstellen →
          </a>
        </small>
      </div>

      <div className="form-section">
        {/* Category Selection */}
        <div className="form-group">
          <label>
            📝 Typ
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="email">E-Mail</option>
              <option value="google-review">Google-Rezension Antwort</option>
              <option value="linkedin">LinkedIn-Kommentar</option>
            </select>
          </label>
        </div>

        {/* Email-specific fields */}
        {formData.category === 'email' && (
          <>
            <div className="form-group">
              <label>
                Kategorie
                <select
                  name="responseType"
                  value={formData.responseType}
                  onChange={handleInputChange}
                >
                  <option value="A">A - Kunden-Follow-up / Angebot</option>
                  <option value="B">B - Reklamation / schwierige Situation</option>
                  <option value="C">C - Terminabstimmung</option>
                  <option value="D">D - Rechnungen / Orga</option>
                  <option value="E">E - Intern kurz & knapp</option>
                </select>
              </label>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>
                  Empfänger (optional)
                  <input
                    type="text"
                    name="recipient"
                    value={formData.recipient}
                    onChange={handleInputChange}
                    placeholder="z.B. Firma Mustermann GmbH"
                  />
                </label>
              </div>

              <div className="form-group">
                <label>
                  Anrede
                  <select
                    name="duSie"
                    value={formData.duSie}
                    onChange={handleInputChange}
                  >
                    <option value="Sie">Sie (formell)</option>
                    <option value="Du">Du (informell)</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>
                Kontext (optional)
                <input
                  type="text"
                  name="context"
                  value={formData.context}
                  onChange={handleInputChange}
                  placeholder="z.B. ISO 9001 Zertifizierung, Audit, Angebot"
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                Ziel / Call-to-Action (optional)
                <input
                  type="text"
                  name="goal"
                  value={formData.goal}
                  onChange={handleInputChange}
                  placeholder="z.B. Termin vereinbaren, Rückmeldung erhalten"
                />
              </label>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>
                  Signatur
                  <select
                    name="signature"
                    value={formData.signature}
                    onChange={handleInputChange}
                  >
                    <option value="KURZ">Kurz (Standard)</option>
                    <option value="LANG">Lang (mit Kontakt)</option>
                    <option value="NONE">Keine</option>
                  </select>
                </label>
              </div>

              <div className="form-group">
                <label>
                  Ton
                  <select
                    name="tone"
                    value={formData.tone}
                    onChange={handleInputChange}
                  >
                    <option value="Original-direkt">Original-direkt</option>
                    <option value="Polished-direkt">Polished-direkt</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>
                Anhänge / Links (optional)
                <input
                  type="text"
                  name="attachments"
                  value={formData.attachments}
                  onChange={handleInputChange}
                  placeholder="z.B. Rechnung.pdf, Vertrag.docx"
                />
              </label>
            </div>
          </>
        )}

        {/* Original Message - for all types */}
        <div className="form-group">
          <label>
            {formData.category === 'email' && 'Original-Nachricht *'}
            {formData.category === 'google-review' && 'Google-Rezension *'}
            {formData.category === 'linkedin' && 'LinkedIn-Post / Kommentar *'}
            <textarea
              name="originalMessage"
              value={formData.originalMessage}
              onChange={handleInputChange}
              placeholder={
                formData.category === 'email' 
                  ? "Füge hier die Original-E-Mail oder Nachricht ein..."
                  : formData.category === 'google-review'
                  ? "Füge hier die Google-Rezension ein..."
                  : "Füge hier den LinkedIn-Post oder Kommentar ein..."
              }
              rows="8"
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
            {loading ? '⏳ Generiere...' : '✨ Text generieren'}
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

      {generatedText && (
        <div className="result-section">
          <div className="result-header">
            <h2>📨 Generierter Text</h2>
            <button onClick={copyToClipboard} className="btn-copy">
              📋 Kopieren
            </button>
          </div>
          <div className="result-content">
            <pre>{generatedText}</pre>
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
