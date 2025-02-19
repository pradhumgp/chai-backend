require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { ClientSecretCredential } = require("@azure/identity");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for frontend requests

// Load environment variables
const { TENANT_ID, CLIENT_ID, CLIENT_SECRET, SENDER_EMAIL } = process.env;

// Debugging environment variables
console.log("🔍 Debugging Environment Variables:");
console.log("TENANT_ID:", TENANT_ID ? "✅ Set" : "❌ Missing");
console.log("CLIENT_ID:", CLIENT_ID ? "✅ Set" : "❌ Missing");
console.log("CLIENT_SECRET:", CLIENT_SECRET ? "✅ Set" : "❌ Missing");
console.log("SENDER_EMAIL:", SENDER_EMAIL ? "✅ Set" : "❌ Missing");

// Microsoft Identity Client
const credential = new ClientSecretCredential(TENANT_ID, CLIENT_ID, CLIENT_SECRET);

// Function to get an access token
async function getAccessToken() {
  try {
    const tokenResponse = await credential.getToken("https://graph.microsoft.com/.default");
    if (!tokenResponse || !tokenResponse.token) {
      throw new Error("No token received!");
    }
    console.log("✅ Access token acquired successfully");
    return tokenResponse.token;
  } catch (error) {
    console.error("❌ Error acquiring token:", error);
    throw error;
  }
}

// API route to send an email
app.post("/send-email", async (req, res) => {
  try {
    const { recipient, subject, body } = req.body;

    if (!recipient || !subject || !body) {
      return res.status(400).json({ error: "Missing required fields (recipient, subject, body)" });
    }

    const accessToken = await getAccessToken();

    const emailData = {
      message: {
        subject: subject,
        body: {
          contentType: "HTML",
          content: body,
        },
        toRecipients: [
          {
            emailAddress: { address: recipient },
          },
        ],
      },
      saveToSentItems: "true",
    };

    const graphUrl = `https://graph.microsoft.com/v1.0/users/${SENDER_EMAIL}/sendMail`;

    console.log("📨 Sending email to:", recipient);

    const response = await axios.post(graphUrl, emailData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    console.log("✅ Email sent successfully:", response.status);
    res.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending email:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to send email", details: error.response?.data || error.message });
  }
});

// Health Check Route
app.get("/", (req, res) => {
  res.send("✅ Microsoft Graph Email API is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});