const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { messages } = req.body;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: messages.map(m => ({ role: m.role, content: m.text })),
      },
      {
        headers: {
          "Authorization": `Bearer YOUR_OPENAI_API_KEY`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ text: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
