const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const { connectToDb } = require("./db");
const recipeRoutes = require("./routes/recipeRoutes");

app.use(express.json());

app.get("/health", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.status(200).json({ status: "ok" });
});

app.use("/api/recipes", recipeRoutes);

async function startServer() {
  try {
    await connectToDb();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();