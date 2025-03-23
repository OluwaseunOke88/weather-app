const express = require("express");
const router = express.Router();
const Weather = require("../models/Weather");
const { Parser } = require("json2csv");
const xml2js = require("xml2js");
const PDFDocument = require("pdfkit");

// Export as CSV
router.get("/csv", async (req, res) => {
    try {
        const weatherData = await Weather.find();
        const json2csvParser = new Parser();
        const csv = json2csvParser.parse(weatherData);
        res.setHeader("Content-Disposition", "attachment; filename=weather.csv");
        res.set("Content-Type", "text/csv");
        res.status(200).send(csv);
    } catch (error) {
        res.status(500).json({ message: "Error exporting CSV" });
    }
});

// Export as XML
router.get("/xml", async (req, res) => {
    try {
        const weatherData = await Weather.find();
        const builder = new xml2js.Builder();
        const xml = builder.buildObject(weatherData);
        res.set("Content-Type", "application/xml");
        res.status(200).send(xml);
    } catch (error) {
        res.status(500).json({ message: "Error exporting XML" });
    }
});

// Export as PDF
router.get("/pdf", async (req, res) => {
    try {
        const weatherData = await Weather.find();
        const doc = new PDFDocument();
        res.setHeader("Content-Disposition", "attachment; filename=weather.pdf");
        res.set("Content-Type", "application/pdf");

        doc.pipe(res);
        doc.fontSize(14).text("Weather Data Report", { align: "center" });
        weatherData.forEach((data) => {
            doc.text(`\nLocation: ${data.location}`);
            doc.text(`Temperature: ${data.temperature}°C`);
            doc.text(`Description: ${data.description}`);
            doc.text(`Date: ${data.date}\n`);
        });
        doc.end();
    } catch (error) {
        res.status(500).json({ message: "Error exporting PDF" });
    }
});

module.exports = router;
