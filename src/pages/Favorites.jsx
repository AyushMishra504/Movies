import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites, isFavorite } = useMovieContext();
  if (favorites) {
    return (
      <div className="movies-grid">
        <h2 className="favorites">Your Favorites</h2>
        {favorites.map((movie) => (
          <MovieCard
            movie={movie}
            key={movie.id}
            isFavorite={isFavorite(movie.id)}
          />
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
