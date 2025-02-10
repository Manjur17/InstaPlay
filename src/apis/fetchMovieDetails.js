import axios from "axios";
import { API_KEY, API_URL } from "./api";

export const fetchMovieDetails = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}?api_key=${API_KEY}&language=en-US`);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching movie details");
    }
};


