import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";
import noImage from "../assets/no_image_found.svg";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);
  var description = movie.overview;
  if (!movie.overview) description = "No description available.";
  const wordsArray = description.split(" ");
  if (wordsArray.length > 50) {
    description = wordsArray.slice(0, 40).join(" ") + "…";
  }
  const title = movie.title || movie.name;
  const releaseYear =
    (movie.release_date || movie.first_air_date)?.split("-")[0] || "N/A";

  function onFavoriteClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : noImage
          }
          alt={title}
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
        <h3> {title}</h3>
        <p>{releaseYear}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default MovieCard;
