import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./Dashboard.css";
import photo from "../../assets/banner.png";
import play from "../../assets/play.svg";
import fallback from "../../assets/fallback.png";

import { useNavigate } from "react-router-dom";
import RenderStars from "../RenderStars/RenderStars";
import { useSearch } from "../../context/SearchContext";
import MovieTitle from "../MovieTitle/MovieTitle";
import { TRENDING_URL, SEARCH_URL } from "../apis/api";
import { toast } from "react-toastify";
import { convertRating } from "../../utils/convertRating";

const Dashboard = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(() => {
        return parseInt(sessionStorage.getItem("lastPage")) || 1; // Restore last page from sessionStorage
    });
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { query } = useSearch();

    useEffect(() => {
        fetchMovies(page, query);
    }, [page, query]);

    const fetchMovies = async (page, query) => {
        try {
            setLoading(true);

            const url = query ? `${SEARCH_URL}${query}&page=${page}&include_adult=false` : `${TRENDING_URL}&page=${page}`;
            const response = await axios.get(url);

            setMovies(response.data.results);
            setTotalPages(response.data.total_pages);
        } catch (error) {
            toast.error("Error fetching movies!!");
        } finally {
            setLoading(false);
        }
    };

    const handlePageClick = (data) => {
        setPage(data.selected + 1);
    };


    const handleDetails = (movie) => {
        sessionStorage.setItem("lastPage", page); //last visited page

        navigate(`/movie/${movie.id}`, {
            state: {
                ratingOutOf5: convertRating(movie.vote_average),
            }
        });
    };

    return (
        <div className="dashboard-container">
            <div className="image-container">
                <img src={photo} alt="banner" />
            </div>

            <section className="trending-section">
                {/* Dynamic Heading */}
                <h2 className="trending">
                    {loading
                        ? "Loading..."
                        : query
                            ? movies.length > 0
                                ? `Search Results for "${query}"`
                                : `No Results found for "${query}"`
                            : "Trending"}
                </h2>

                {loading ? (
                    <div className="loader-container">
                        <div className="loader"></div>
                    </div>
                ) : (
                    <div className="movie-grid">
                        {movies.length > 0 && (
                            movies.map((movie) => (
                                <div key={movie.id} className="movie-card">
                                    {movie.poster_path ? <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={"movie-poster"}
                                        className="movie-poster-img"
                                    /> : <img
                                        src={fallback}
                                        alt={"fallback"}
                                        className="movie-poster-img" />}

                                    <div className="movie-details">
                                        <div className="movie-info">
                                            <MovieTitle title={movie.title} />
                                            <RenderStars ratingOutOf10={movie.vote_average} />
                                        </div>
                                        <div
                                            className="play-btn-container"
                                            onClick={() => handleDetails(movie)}
                                        >
                                            <img src={play} alt="play" />

                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </section>

            {totalPages > 1 && (
                <div className="pagination-div">
                    <ReactPaginate
                        previousLabel={"<"}
                        nextLabel={">"}
                        breakLabel={"..."}
                        pageCount={totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                        disabledClassName={"disabled"}
                        forcePage={page - 1}
                    />
                </div>
            )}
        </div>
    );
};

export default Dashboard;
