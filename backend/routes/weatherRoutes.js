const express = require("express");
const router = express.Router();
const Weather = require("../models/Weather");

// CREATE: Save weather data
router.post("/", async (req, res) => {
    try {
        const newWeather = new Weather(req.body);
        await newWeather.save();
        res.status(201).json(newWeather);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// READ: Get all weather data
router.get("/", async (req, res) => {
    try {
        const weatherData = await Weather.find();
        res.json(weatherData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// UPDATE: Modify a record
router.put("/:id", async (req, res) => {
    try {
        const updatedWeather = await Weather.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedWeather);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE: Remove a record
router.delete("/:id", async (req, res) => {
    try {
        await Weather.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

router.get("/export/json", async (req, res) => {
    try {
        const data = await Weather.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

router.get("/youtube/:location", async (req, res) => {
    try {
        const location = req.params.location;
        const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${location}+weather&type=video&key=${YOUTUBE_API_KEY}&maxResults=5`
        );
        res.json(response.data.items);
    } catch (error) {
        res.status(500).json({ message: "Error fetching YouTube data" });
    }
});
