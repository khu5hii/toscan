import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/analyze", async (req, res) => {
  const { text } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: `
Analyze this Terms of Service text.
Return JSON with keys:
- explanation: summary in simple language
- score: number from 0 (safe) to 100 (dangerous)
- vibe: one of Friendly, Meh, Suspicious, Dangerous
- keywords: list of risky terms or concepts found

Text:
${text}
          `,
        },
      ],
    });

    const parsed = JSON.parse(completion.choices[0].message.content);
    res.json(parsed);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ explanation: "AI error", score: 0, vibe: "Unknown", keywords: [] });
  }
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log("TOS AI Analyzer running on http://localhost:5000")
);
