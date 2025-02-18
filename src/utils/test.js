require("dotenv").config();
const axios = require("axios");

async function getAccessToken() {
    try {
        const response = await axios.post(
            `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/token`,
            new URLSearchParams({
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                scope: "https://outlook.office365.com/.default",
                grant_type: "client_credentials",
            }),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        console.log("Access Token:", response.data.access_token);
        return response.data.access_token;
    } catch (error) {
        console.error("Error getting access token:", error.response?.data || error.message);
        return null;
    }
}

// Call the function
getAccessToken();