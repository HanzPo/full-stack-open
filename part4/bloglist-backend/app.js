const express = require("express");
const config = require("./utils/config");
const logger = require("./utils/logger");
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const app = express();
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Could not connect to MongoDB", error.message);
  });

app.use(cors());
app.use(express.json());
app.use("/api/blogs/", blogsRouter);

module.exports = app;
