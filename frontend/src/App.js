import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import About from "./About";
import axios from "axios";
import "./App.css"; // Import CSS for styling

function App() {
    const [searchLocation, setSearchLocation] = useState("");
    const [videos, setVideos] = useState([]);
    const [mapUrl, setMapUrl] = useState("");

    const GOOGLE_MAPS_API_KEY = "AIzaSyAT8F7OoK_aCCcLOb12AnOTifvjP7FMlSw";

    const getYouTubeVideos = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/youtube/${searchLocation}`);
            setVideos(response.data);
        } catch (error) {
            console.error("Error fetching YouTube videos", error);
        }
    };

    const getGoogleMap = () => {
        if (!searchLocation) return;
        const encodedLocation = encodeURIComponent(searchLocation);
        const url = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodedLocation}`;
        setMapUrl(url);
    };

    return (
        <Router>
            <div className="container">
                <header>
                    <h1 className="title">Weather App</h1>
                    <nav>
                        <Link to="/">Home</Link> | <Link to="/about">About</Link>
                    </nav>
                </header>

                <Routes>
                    <Route path="/about" element={<About />} />
                </Routes>

                <div className="search-container">
                    <input
                        type="text"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        placeholder="Enter a city name"
                        className="search-input"
                    />
                    <button className="search-button" onClick={() => { getYouTubeVideos(); getGoogleMap(); }}>
                        Search
                    </button>
                </div>

                <div className="content">
                    {videos.length > 0 && (
                        <div className="video-container">
                            <h2>Weather Forecast Videos for {searchLocation}</h2>
                            {videos.map((video) => (
                                <div key={video.id.videoId} className="video-card">
                                    <h3>{video.snippet.title}</h3>
                                    <iframe
                                        width="400"
                                        height="250"
                                        src={`https://www.youtube.com/embed/${video.id.videoId}`}
                                        frameBorder="0"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            ))}
                        </div>
                    )}

                    {mapUrl && (
                        <div className="map-container">
                            <h2>Map of {searchLocation}</h2>
                            <iframe
                                width="600"
                                height="400"
                                style={{ border: 0 }}
                                loading="lazy"
                                allowFullScreen
                                src={mapUrl}
                            ></iframe>
                        </div>
                    )}
                </div>
            </div>
        </Router>
    );
}

export default App;
