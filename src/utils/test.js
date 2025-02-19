require("dotenv").config();
const axios = require("axios");
const { ClientSecretCredential } = require("@azure/identity");

// Load env variables
const { TENANT_ID, CLIENT_ID, CLIENT_SECRET, SENDER_EMAIL } = process.env;

if (!TENANT_ID || !CLIENT_ID || !CLIENT_SECRET || !SENDER_EMAIL) {
  console.error("❌ Missing required environment variables!");
  process.exit(1);
}

// Authenticate using ClientSecretCredential
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

// Function to send an email
async function sendMail() {
  try {
    const accessToken = await getAccessToken();
    
    const emailData = {
      message: {
        subject: "Azure App Service Email Test",
        body: {
          contentType: "HTML",
          content: "<p>Hello, this email is sent via Microsoft Graph API from Azure!</p>",
        },
        toRecipients: [
          {
            emailAddress: { address: "recipient@example.com" },
          },
        ],
      },
      saveToSentItems: "true",
    };

    const graphUrl = `https://graph.microsoft.com/v1.0/users/${SENDER_EMAIL}/sendMail`;
    
    console.log("📨 Sending email...");
    
    const response = await axios.post(graphUrl, emailData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    console.log("✅ Email sent successfully:", response.status);
  } catch (error) {
    console.error("❌ Error sending email:", error.response?.data || error.message);
  }
}

// Run email function
sendMail();