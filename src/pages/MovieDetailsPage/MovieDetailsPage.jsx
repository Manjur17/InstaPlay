import { useParams } from "react-router-dom";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import NavBar from "../../components/NavBar/NavBar";
import MovieDetail from "../../components/MovieDetails/MovieDetail";


const MovieDetailsPage = () => {
    const { id } = useParams();

    return (
        <div className="app-container">
            <NavBar displaySearchBar={false} />
            <MovieDetail id={id}/>
            {/* <MovieDetails id={id} /> */}
        </div>
    )
}

export default MovieDetailsPage;