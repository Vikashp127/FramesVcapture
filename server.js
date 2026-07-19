require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("🚀 FramesVcapture Server Running");
});

// Booking Route
app.post("/booking", async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            package,
            event,
            date,
            message
        } = req.body;

// Generate Booking ID

const today = new Date();

const year = today.getFullYear();

const month = String(today.getMonth() + 1).padStart(2, "0");

const day = String(today.getDate()).padStart(2, "0");

const random = Math.floor(1000 + Math.random() * 9000);

const bookingId = `FVC-${year}${month}${day}-${random}`;

        const telegramMessage = `
📸 *NEW BOOKING*

🆔 *Booking ID:* ${bookingId}

━━━━━━━━━━━━━━━━━━

👤 *Name:* ${name}

📧 *Email:* ${email}

📱 *Phone:* ${phone}

📦 *Package:* ${package}

🎉 *Event:* ${event}

📅 *Event Date:* ${date}

📝 *Message:*
${message}

━━━━━━━━━━━━━━━━━━

🌐 *Booked Through:* FramesVcapture Website
`;

        await axios.post(
            `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
            {
                chat_id: process.env.CHAT_ID,
                text: telegramMessage,
                parse_mode: "Markdown"
            }
        );

        res.json({
    success: true,
    bookingId: bookingId,
    message: "Booking Sent Successfully"
});

    } catch (error) {

        console.log(error.response?.data || error.message);

        res.status(500).json({
            success: false
        });

    }

});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});