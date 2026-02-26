const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch"); // version 2
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  console.log("Incoming request:", req.body);

  try {
    const { topic, difficulty } = req.body;

    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    const prompt = `
Generate exactly 5 multiple choice questions about "${topic}".
Difficulty level: ${difficulty}.

Each question must include:
- question
- 4 options
- 1 correct answer

Return ONLY valid JSON in this format:
[
  {
    "question": "Question text",
    "options": ["A", "B", "C", "D"],
    "answer": "Correct Option"
  }
]
`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "AI Quiz App"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();

    console.log("OpenRouter response:", data);

    if (!data.choices || !data.choices.length) {
      return res.status(500).json({
        error: "AI generation failed",
        details: data
      });
    }

    let text = data.choices[0].message.content
      .replace(/```json|```/g, "")
      .trim();

    let parsedQuestions;

    try {
      parsedQuestions = JSON.parse(text);
    } catch (err) {
      console.log("JSON Parse Error:", err);
      return res.status(500).json({
        error: "AI returned invalid JSON",
        raw: text
      });
    }

    res.json(parsedQuestions);

  } catch (error) {
    console.log("SERVER ERROR:", error);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});