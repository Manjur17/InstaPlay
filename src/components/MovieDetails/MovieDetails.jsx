import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MovieDetails.css";
import play from "../../assets/play.svg";
import backIcon from "../../assets/backIcon.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { API_KEY, API_URL } from "../apis/api";
import { toast } from "react-toastify";

const MovieDetails = ({ id }) => {
    const [details, setDetails] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const ratingOutOf5 = location.state?.ratingOutOf5;

    useEffect(() => {
        fetchMovieDetails();
    }, [id]);

    const fetchMovieDetails = async () => {
        try {
            const response = await axios.get(`${API_URL}/${id}?api_key=${API_KEY}&language=en-US`);
            setDetails(response.data);
        } catch (error) {
            toast.error("Error fetching movie details:", error);
        }
    };


    return (

        <div className="movie-details-container">

            {!details ? (
                <div className="loader-container">
                    <div className="loader"></div>
                </div>
            ) : (
                <div className="movie-wrapper">
                    <div className="backdrop-container">
                        <img
                            className="backdrop-image"
                            src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
                            alt={details.title}
                        />
                        <div className="overlay"></div>
                    </div>
                    <div className="back-button" onClick={() => navigate("/dashboard")}>
                        <img src={backIcon} alt="Back" />
                    </div>vote_average
                    <div className="content">
                        <div className="movie-details-wrapper">
                            <h1 className="movie-title">{details.title}</h1>
                            <p className="movie-rating">Rating: {ratingOutOf5}/5</p>
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
            )}
        </div>

    );
};

export default MovieDetails;
