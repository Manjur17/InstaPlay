import axios from "axios";
import { API_KEY, API_URL } from "./api";

export const fetchMovieTrailer = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}/videos?api_key=${API_KEY}&language=en-US`);
        const videos = response.data.results;
        const trailer = videos.find((video) => video.type === "Trailer" && video.site === "YouTube");
        return trailer ? trailer.key : null;
    } catch (error) {
        throw new Error("Error fetching movie trailer");
    }
};
