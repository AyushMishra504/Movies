import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import "../css/Home.css";
import { useLocation } from "react-router-dom";
import {
  searchMovies,
  getPopularMovies,
  getMoviesByGenre,
  getPopularTVShows,
  getTVShowsByGenre,
  searchTVShows,
} from "../services/api";
import filter_icon from "../assets/filter_icon.png";

function Tv_shows() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(true);
  const [genreFilter, setGenreFilter] = useState("");
  const location = useLocation();

  const handleCloseDetails = () => setExpandedMovie(null);
  const genres = [
    { id: 10759, name: "Action & Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Komödie" },
    { id: 80, name: "Krimi" },
    { id: 99, name: "Dokumentarfilm" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Familie" },
    { id: 10762, name: "Kids" },
    { id: 9648, name: "Mystery" },
    { id: 10763, name: "News" },
    { id: 10764, name: "Reality" },
    { id: 10765, name: "Sci-Fi & Fantasy" },
    { id: 10766, name: "Soap" },
    { id: 10767, name: "Talk" },
    { id: 10768, name: "War & Politics" },
    { id: 37, name: "Western" },
  ];

  //to clear search bar and reset genre when any link is pressed
  useEffect(() => {
    if (location.pathname === "/tvshows") {
      setSearchQuery("");
      setGenreFilter("");
    }

    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularTVShows();
        setMovies(popularMovies);
      } catch (e) {
        setError("Failed to load TV shows...");
        console.log(e);
      } finally {
        setloading(false);
      }
    };
    loadPopularMovies();
  }, [location]);

  //to load movies based on genre
  useEffect(() => {
    const loadMovies = async () => {
      setloading(true);
      try {
        let results;
        if (!genreFilter) {
          results = await getPopularTVShows();
        } else {
          results = await getTVShowsByGenre(genreFilter); // ✅ fetch by genre
        }
        setMovies(results);
        setError(null);
      } catch (e) {
        console.error(e);
        setError("Failed to load movies");
      } finally {
        setloading(false);
      }
    };

    loadMovies();
  }, [genreFilter]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setloading(true);
    try {
      const searchResults = await searchTVShows(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (e) {
      console.log(e);
      setError("Failed to load movies");
    } finally {
      setloading(false);
    }
  };
  const filteredMovies = movies.filter((movie) => {
    if (!genreFilter) {
      // no genre selected
      const trimmedQuery = searchQuery.trim().toLowerCase();
      return movie.name.toLowerCase().includes(trimmedQuery);
    } else {
      // genre selected
      return movie.genre_ids?.includes(Number(genreFilter));
    }
  });

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for TV Shows..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="genre-filter">
          <img src={filter_icon} />
          <select
            id="genre"
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
          >
            <option value="">All</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading... </div>
      ) : (
        <div className="movies-grid">
          {filteredMovies.map((movie) => (
            <MovieCard movie={movie} key={movie.id}></MovieCard>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tv_shows;
