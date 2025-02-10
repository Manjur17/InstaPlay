import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MovieDetails.css";
import play from "../../assets/play.svg";
import backIcon from "../../assets/backIcon.svg";
import { useNavigate } from "react-router-dom";

const API_KEY = "d0605f7c77a7e9ffd22f6f77c12e0f8f";
const API_URL = "https://api.themoviedb.org/3/movie";

const MovieDetail = ({ id }) => {
    const [details, setDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // fetchMovieDetails();
    }, [id]);

    // const fetchMovieDetails = async () => {
    //     try {
    //         const response = await axios.get(`${API_URL}/${id}?api_key=${API_KEY}&language=en-US`);
    //         setDetails(response.data);
    //     } catch (error) {
    //         console.error("Error fetching movie details:", error);
    //     }
    // };

    // if (!details) {
    //     return <p>Loading...</p>;
    // }

    return (

        <div className="movie-details-container">
            <h1>Welcome to movie details {id}</h1>            
        </div>

    );
};

export default MovieDetail;
