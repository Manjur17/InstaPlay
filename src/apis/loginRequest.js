import axios from "axios";
const API_KEY = "019085ae8fd360fcd800ae1d44592de2";
const API_URL = `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${API_KEY}`;

export const loginRequest = async (username, password) => {
    try {
        const response = await axios.post(
            API_URL,
            {
                request_token: "13ba8a472d61e38aac8378a0fff22940e77831ad",
                username: "deepakhegde",
                password: "6318",
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
