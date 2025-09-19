import type { VercelRequest, VercelResponse } from '@vercel/node'

// Serverless proxy to call OpenRouter models in a prioritized order.
// Expects POST { prompt: string, modelOrder?: string[], max_tokens?: number }

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  const body = req.body || {};
  const prompt = body.prompt;
  const modelOrder: string[] = body.modelOrder || [
    'google/gemini-2.5-flash-lite',
    'openai/gpt-4.1-nano',
    'google/gemini-2.5-flash-lite-preview-06-17',
  ];
  const max_tokens = body.max_tokens || 256;

  if (!prompt || typeof prompt !== 'string') return res.status(400).json({ error: 'Missing prompt' });
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) return res.status(500).json({ error: 'OPENROUTER_API_KEY not configured' });

  // Try models in order until one succeeds
  let lastError: any = null;
  for (const model of modelOrder) {
    try {
      const resp = await fetch('https://api.openrouter.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`,
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: prompt }],
          max_tokens,
          temperature: 0.9,
        }),
      });

      if (!resp.ok) {
        const text = await resp.text();
        lastError = { model, status: resp.status, body: text };
        continue;
      }

      const data = await resp.json();
      // OpenRouter response might include choices[].message.content
      const content = data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text || (typeof data === 'string' ? data : null);
      if (!content) {
        lastError = { model, status: 'no_content', data };
        continue;
      }

      return res.status(200).json({ model, text: content });
    } catch (err) {
      lastError = { model, error: String(err) };
      continue;
    }
  }

  return res.status(502).json({ error: 'All models failed', lastError });
}
