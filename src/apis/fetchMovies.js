import axios from "axios";
import { TRENDING_URL, SEARCH_URL } from "./api";

export const fetchMovies = async (page, query) => {
    try {
        const url = query
            ? `${SEARCH_URL}${query}&page=${page}&include_adult=false`
            : `${TRENDING_URL}&page=${page}`;

        const response = await axios.get(url);
        return {
            movies: response.data.results,
            totalPages: response.data.total_pages,
        };
    } catch (error) {
        throw new Error("Error fetching movies!!");
    }
};
