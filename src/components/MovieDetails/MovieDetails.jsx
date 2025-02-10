import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MovieDetails.css";
import play from "../../assets/play.svg";
import backIcon from "../../assets/backIcon.svg";
import { useNavigate } from "react-router-dom";

const API_KEY = "d0605f7c77a7e9ffd22f6f77c12e0f8f";
const API_URL = "https://api.themoviedb.org/3/movie";

const MovieDetails = ({ id }) => {
    const [details, setDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMovieDetails();
    }, [id]);

    const fetchMovieDetails = async () => {
        try {
            const response = await axios.get(`${API_URL}/${id}?api_key=${API_KEY}&language=en-US`);
            setDetails(response.data);
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    };

    if (!details) {
        return <p>Loading...</p>;
    }

    return (

        <div className="movie-details-container">
            <div className="movie-wrapper">
                <div className="backdrop-container">
                    <img
                        className="backdrop-image"
                        src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
                        alt={details.title}
                    />
                    <div className="overlay"></div>
                </div>
                <div className="back-button" onClick={() => navigate(-1)}>
                    <img src={backIcon} alt="Back" />
                </div>
                <div className="content">
                    <div className="movie-details-wrapper">
                        <h1 className="movie-title">{details.title}</h1>
                        <p className="movie-rating">Rating: {details.vote_average}/5</p>
                        <p className="movie-overview">{details.overview}</p>
                        <div className="movie-meta">
                            <p><strong>Release Date:</strong> {details.release_date}</p>
                            <p><strong>Original Language:</strong> {details.original_language.toUpperCase()}</p>
                        </div>

                    </div>
                    <div className="play-button">
                        <img src={play} alt="play" />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default MovieDetails;
