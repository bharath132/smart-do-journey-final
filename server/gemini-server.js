import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const geminiApiKey = process.env.GEMINI_API_KEY;
  if (!geminiApiKey) {
    return res.status(401).json({ error: "API key missing" });
  }

  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "No title provided" });

  const prompt = `Given the following task title: "${title}", produce a JSON object with EXACTLY these keys:
  - description: ...
  - category: ...
  - priority: ...
  - suggestions: ...
Return ONLY the JSON.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 200 },
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: "ProviderError", provider: data });
    }

    let jsonText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!jsonText) return res.status(502).json({ error: "EmptyResponse", details: data });
    if (jsonText.startsWith("```json") && jsonText.endsWith("```")) {
      jsonText = jsonText.slice(7, -3).trim();
    }
    const parsed = JSON.parse(jsonText);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: "Google Generative AI API call failed", details: err.message });
  }
}
