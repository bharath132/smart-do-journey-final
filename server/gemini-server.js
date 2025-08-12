require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// Remove Google Auth dependency - switching to Generative AI API with API key

const app = express();
app.use(cors({
  origin: "*", // Or your frontend domain
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(bodyParser.json());
app.options("*", cors());
// Switch to Google Generative AI API (simpler than Vertex AI)
const geminiApiKey = process.env.GEMINI_API_KEY;
const port = process.env.PORT || 3001;

// Use Google Generative AI API instead of Vertex AI
const modelName = "gemini-1.5-flash";
const endpoint = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent`;

console.log("Using Generative AI endpoint:", endpoint);

app.post("/api/gemini-suggest", async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "No title provided" });

  const prompt = `Given the following task title: "${title}", produce a JSON object with EXACTLY these keys:
  - description: a concise task description (string)
  - category: one of [work, personal, shopping, other]
  - priority: one of [high, medium, low]
  - suggestions: an array of exactly 3 short actionable suggestions (strings)
Return ONLY the JSON.`;

  try {
    console.log("Calling Google Generative AI API...");

    if (!geminiApiKey) {
      return res.status(500).json({
        error:
          "Gemini API key not configured. Please set GEMINI_API_KEY in your .env file",
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

    console.log("Generative AI API response status:", response.status);
    const data = await response.json();
    console.log("Generative AI API response data:", data);
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
      // Handle markdown-wrapped JSON responses from Gemini
      let jsonText = text.trim();

      // Remove markdown code block wrapper if present
      if (jsonText.startsWith("```json") && jsonText.endsWith("```")) {
        jsonText = jsonText.slice(7, -3).trim();
      } else if (jsonText.startsWith("```") && jsonText.endsWith("```")) {
        jsonText = jsonText.slice(3, -3).trim();
      }

      parsed = JSON.parse(jsonText);
    } catch (e) {
      console.log("Failed to parse Generative AI response as JSON:", text);
      return res
        .status(500)
        .json({ error: "Generative AI response not JSON", details: text });
    }

    console.log("Final result to send:", parsed);
    res.json(parsed);
  } catch (err) {
    console.error("Google Generative AI API call failed:", err);
    res.status(500).json({
      error: "Google Generative AI API call failed",
      details: err.message,
    });
  }
});

app.listen(port, () => {
  console.log(
    `Google Generative AI server running on http://localhost:${port}`
  );
  console.log(`Using model: ${modelName} via Generative AI API`);
});
