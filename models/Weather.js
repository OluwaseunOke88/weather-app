const mongoose = require('mongoose');

const WeatherSchema = new mongoose.Schema({
  location: String,
  date: String,
  weatherData: Object,
});

module.exports = mongoose.model('Weather', WeatherSchema);
