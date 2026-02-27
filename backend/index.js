const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const options = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};
app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

// Routes
const routes = require("./routes");
const connectDB = require("./db");
app.use("/api/v1", routes);

connectDB()
  .then(() => {
    app.get("/", (req, res) => {
      res.send("Hello World!");
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
