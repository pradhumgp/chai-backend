const mongoose = require("mongoose");

// Replace with your Cosmos DB MongoDB API connection string
const mongoURI =
  "mongodb://your-username:your-password@your-cosmosdb.mongo.cosmos.azure.com:10255/myDatabase?ssl=true&retrywrites=false";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: "admin", // Required for Cosmos DB
  })
  .then(() => console.log("Connected to Azure Cosmos DB via MongoDB API"))
  .catch((err) => console.error("Connection error:", err));