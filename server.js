const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");
require("dotenv").config();

const Weather = require("./models/Weather");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/weatherdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// OpenWeather API
const WEATHER_API_KEY = "7012a319e6b972335d8282037bd1205b";
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/";

// YouTube API
const YOUTUBE_API_KEY = "AIzaSyARigyCmy_nlpoPlcuNm3ozC4OAyuCcxHk";

// ===============================
// ✅ ROUTES
// ===============================

// Root
app.get("/", (req, res) => {
  res.send("Welcome to the Weather App Backend with MongoDB + YouTube!");
});

// 🔵 GET current weather
app.get("/weather", async (req, res) => {
  const location = req.query.location;
  if (!location) {
    return res.status(400).json({ error: "Missing 'location' parameter" });
  }

  try {
    const response = await axios.get(`${WEATHER_BASE_URL}weather`, {
      params: {
        q: location,
        appid: WEATHER_API_KEY,
        units: "metric",
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// 🔵 GET YouTube videos
app.get("/youtube", async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: "Missing 'q' search parameter" });
  }

  try {
    const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        key: YOUTUBE_API_KEY,
        q: query,
        part: "snippet",
        maxResults: 5,
        type: "video",
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch YouTube videos" });
  }
});

// 🔵 CREATE weather data (save to DB)
app.post("/api/weather", async (req, res) => {
  try {
    const { location, date, weatherData } = req.body;
    if (!location || !date || !weatherData) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const newWeather = new Weather({ location, date, weatherData });
    await newWeather.save();
    res.status(201).json(newWeather);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔵 READ all weather data
app.get("/api/weather", async (req, res) => {
  try {
    const records = await Weather.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔵 UPDATE weather data
app.put("/api/weather/:id", async (req, res) => {
  try {
    const updated = await Weather.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔵 DELETE weather data
app.delete("/api/weather/:id", async (req, res) => {
  try {
    await Weather.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔵 Export as JSON
app.get("/api/export/json", async (req, res) => {
  try {
    const data = await Weather.find();
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync("weather-export.json", jsonData);
    res.download("weather-export.json");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
