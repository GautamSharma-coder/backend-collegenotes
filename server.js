// server.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your real Gemini API key
const GEMINI_API_KEY = "AIzaSyACRjJ6x0jIShFFjEZxP7VpU11TAl5Rxg4";

app.use(cors());
app.use(express.json());

app.post("/ask-gemini", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );

    const answer = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    res.json({ answer });
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch response from Gemini" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});