// Netlify Function: API Proxy für Anthropic
// Umgeht CORS-Probleme

exports.handler = async (event, context) => {
  // Nur POST erlauben
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const { apiKey, prompt } = JSON.parse(event.body)

    // Validierung
    if (!apiKey || !apiKey.startsWith('sk-ant-')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Ungültiger API Key' })
      }
    }

    if (!prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Prompt fehlt' })
      }
    }

    // Request an Anthropic API
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
          content: prompt
        }]
      })
    })

    const data = await response.json()

    // Fehlerbehandlung
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: data.error?.message || 'API Fehler',
          details: data
        })
      }
    }

    // Erfolgreiche Antwort
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    }

  } catch (error) {
    console.error('Function error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Server-Fehler',
        message: error.message
      })
    }
  }
}
