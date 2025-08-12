import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "No title provided" });

  const geminiApiKey = process.env.GEMINI_API_KEY;
  const modelName = "gemini-1.5-flash";
  const endpoint = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent`;

  const prompt = `Given the following task title: "${title}", produce a JSON object with EXACTLY these keys:\n  - description: a concise task description (string)\n  - category: one of [work, personal, shopping, other]\n  - priority: one of [high, medium, low]\n  - suggestions: an array of exactly 3 short actionable suggestions (strings)\nReturn ONLY the JSON.`;

  try {
    if (!geminiApiKey) {
      return res.status(500).json({
        error:
          "Gemini API key not configured. Please set GEMINI_API_KEY in your environment",
      });
    }

    const response = await fetch(`${endpoint}?key=${geminiApiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 200,
        },
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "ProviderError", provider: data });
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      return res.status(502).json({ error: "EmptyResponse", details: data });
    }

    let parsed;
    try {
      let jsonText = text.trim();
      if (jsonText.startsWith("```json") && jsonText.endsWith("```")) {
        jsonText = jsonText.slice(7, -3).trim();
      } else if (jsonText.startsWith("```") && jsonText.endsWith("```")) {
        jsonText = jsonText.slice(3, -3).trim();
      }
      parsed = JSON.parse(jsonText);
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Generative AI response not JSON", details: text });
    }

    res.json(parsed);
  } catch (err) {
    res.status(500).json({
      error: "Google Generative AI API call failed",
      details: err.message,
    });
  }
}
