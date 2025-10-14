const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running successfully ");
});

app.post("/chat", async (req, res) => {
  const { messages } = req.body;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: messages.map(m => ({
          role: m.role,
          content: m.text,
        })),
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ text: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Something went wrong with the AI API");
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));

