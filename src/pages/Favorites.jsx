import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useMovieContext();
  if (favorites) {
    return (
      <div className="movies-grid">
        <h2 className="favorites">Your Favorites</h2>
        {favorites.map((movie) => (
          <MovieCard movie={movie} key={movie.id}></MovieCard>
        ))}
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <h2>No favorites yet!</h2>
      <p>Start adding movies</p>
    </div>
  );
}
export default Favorites;
