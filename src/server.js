const express = require("express");
const path = require("path");
const apiRoutes = require("./api"); // Ensure this exports a router

const app = express();
const port = 3000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../build")));

// API routes should come before serving the React app
app.use("/api", apiRoutes);

// Serve the React app for any other route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

// Middleware for JSON
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
