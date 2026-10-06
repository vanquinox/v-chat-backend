const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API Key SimSimi milik Anda
const SIMI_API_KEY = "NPYmaZlrabKsWxDiv4qhiPXDaBh7-nLOjoDfE3eA";

app.post('/api/simsimi', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: "Pesan kosong" });

        // Tembak langsung dari server Node.js ke SimSimi
        const response = await fetch("https://wsapi.simsimi.com/190410/talk", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": SIMI_API_KEY
            },
            body: JSON.stringify({
                utext: message,
                lang: "id"
            })
        });

        const data = await response.json();
        res.json({ reply: data.atext || "Simi bingung mau jawab apa..." });
    } catch (error) {
        res.status(500).json({ error: "Gagal terhubung ke SimSimi" });
    }
});

app.listen(PORT, () => console.log(`Server aktif pada port ${PORT}`));
