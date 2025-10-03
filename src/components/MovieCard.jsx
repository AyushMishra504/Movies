import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";
import noImage from "../assets/no_image_found.svg";

function MovieCard({ movie, onClick }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);
  var description = movie.overview;
  if (!movie.overview) description = "No description available.";

  function onFavoriteClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  return (
    <div className="movie-card" onClick={() => onClick(movie.id)}>
      <div className="movie-poster">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : noImage
          }
          alt={movie.title}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}
          >
            ♥
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3> {movie.title}</h3>
        <p>{movie.release_date?.split("-")[0]}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default MovieCard;
