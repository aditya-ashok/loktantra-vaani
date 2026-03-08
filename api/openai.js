export const config = {
  maxDuration: 60,
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not configured' });
  }

  const { url, body } = req.body;
  if (!url || !body) {
    return res.status(400).json({ error: 'Missing url or body' });
  }

  // Only allow OpenAI API endpoints
  if (!url.startsWith('https://api.openai.com/')) {
    return res.status(400).json({ error: 'Invalid API URL' });
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'OpenAI proxy request failed' });
  }
}
