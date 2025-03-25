const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

// OpenWeather API Key and Base URL
const API_KEY = "b1e8e7d632306ab7fd85da153b4fd4cb";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

// Endpoint to get current weather data
app.get("/weather", async (req, res) => {
    const location = req.query.location;
    try {
        const response = await axios.get(`${BASE_URL}weather`, {
            params: {
                q: location,
                appid: API_KEY,
                units: "metric" // Adjust units to metric for Celsius
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Could not fetch weather data" });
    }
});

// Endpoint to get 5-day forecast (every 3 hours)
app.get("/forecast", async (req, res) => {
    const location = req.query.location;
    try {
        const response = await axios.get(`${BASE_URL}forecast`, {
            params: {
                q: location,
                appid: API_KEY,
                units: "metric" // Adjust units to metric for Celsius
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Could not fetch forecast data" });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
