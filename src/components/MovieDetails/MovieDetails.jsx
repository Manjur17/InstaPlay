import React, { useState, useEffect } from "react";
import "./MovieDetails.css";
import play from "../../assets/play.svg";
import backIcon from "../../assets/backIcon.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchMovieDetails } from "../../apis/fetchMovieDetails";
import { fetchMovieTrailer } from "../../apis/fetchMovieTrailer";
import close from "../../assets/close.svg";

const MovieDetails = ({ id }) => {
    const [details, setDetails] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);
    const [showTrailer, setShowTrailer] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const ratingOutOf5 = location.state?.ratingOutOf5;

    useEffect(() => {
        loadMovieDetails();
    }, [id]);

    const loadMovieDetails = async () => {
        try {
            const data = await fetchMovieDetails(id);
            setDetails(data);
        } catch (error) {
            toast.error(error.message);
            navigate("/dashboard");
        }
    };

    // Extract spoken languages
    const getSpokenLanguages = (languages) => {
        if (!languages || languages.length === 0) return "Unknown"; // Fallback
        return languages.map(lang => lang.english_name).join(", ");
    };

    const handlePlayClick = async () => {
        try {
            const trailer = await fetchMovieTrailer(id);
            if (trailer) {
                setTrailerKey(trailer);
                setShowTrailer(true);
            } else {
                toast.error("Trailer not available");
            }
        } catch (error) {
            toast.error(error.message);
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
                    </div>
                    <div className="content">
                        <div className="movie-details-wrapper">
                            <h1 className="movie-title">{details.title}</h1>
                            <p className="movie-rating">Rating {ratingOutOf5}/5</p>
                            <p className="movie-overview">{details.overview}</p>

                            <div className="movie-meta">
                                <div className="release-date">
                                    <span>Release Date</span>
                                    <span>Original Language</span>

                                </div>
                                <div className="release-date">
                                    <span>{details.release_date.split("-")[0]}</span>
                                    <span>{getSpokenLanguages(details.spoken_languages)}</span>
                                </div>
                            </div>

                        </div>

                        <div className="play-button" onClick={handlePlayClick}>
                            <img src={play} alt="play" />
                        </div>

                    </div>
                </div>
            )}

            {showTrailer && trailerKey && (
                <div className="trailer-modal">
                    <div className="modal-content">
                        <img className="close-button" src={close} alt="close" onClick={() => setShowTrailer(false)} />
                        <iframe
                            width="800"
                            height="450"
                            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                            title="Movie Trailer"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </div>

    );
};

export default MovieDetails;
