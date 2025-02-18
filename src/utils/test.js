require('dotenv').config();
const { ClientSecretCredential } = require("@azure/identity");
const { Client } = require("@microsoft/microsoft-graph-client");

// Set up authentication credentials
const credential = new ClientSecretCredential(
  process.env.TENANT_ID,
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);

// Create a Microsoft Graph client
const client = Client.initWithMiddleware({
  authProvider: {
    getAccessToken: async () => {
      const tokenResponse = await credential.getToken("https://graph.microsoft.com/.default");
      return tokenResponse.token;
    }
  }
});

// Function to send an email
async function sendEmail() {
  try {
    const response = await client.api('/users/' + process.env.USER_EMAIL + '/sendMail')
      .post({
        message: {
          subject: "Test Email from Node.js",
          body: {
            contentType: "HTML",
            content: "<h3>Hello, this is a test email sent via Microsoft Graph API.</h3>"
          },
          toRecipients: [
            {
              emailAddress: { address: "recipient@example.com" }
            }
          ]
        }
      });

    console.log("Email sent successfully!", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

sendEmail();