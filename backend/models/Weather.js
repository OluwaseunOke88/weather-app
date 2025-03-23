const mongoose = require("mongoose");

const WeatherSchema = new mongoose.Schema({
    location: String,
    temperature: Number,
    description: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Weather", WeatherSchema);
