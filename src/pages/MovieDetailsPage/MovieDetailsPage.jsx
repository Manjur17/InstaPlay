import { useParams } from "react-router-dom";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import NavBar from "../../components/NavBar/NavBar";


const MovieDetailsPage = () => {
    const { id } = useParams();

    return (
        <div className="app-container">
            <NavBar displaySearchBar={false} />    
            <MovieDetails id={id} />
        </div>
    )
}

export default MovieDetailsPage;