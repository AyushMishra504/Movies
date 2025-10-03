import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import "../css/Home.css";
import { useLocation } from "react-router-dom";
import {
  searchMovies,
  getPopularMovies,
  getMoviesByGenre,
} from "../services/api";
import filter_icon from "../assets/filter_icon.png";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(true);
  const [genreFilter, setGenreFilter] = useState("");
  const location = useLocation();
  const handleMovieClick = async (id) => {
    try {
      const details = await getMovieDetails(id);
      setExpandedMovie(details);
    } catch (e) {
      console.error("Failed to fetch movie details", e);
    }
  };

  const handleCloseDetails = () => setExpandedMovie(null);
  const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Abenteuer" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Komödie" },
    { id: 80, name: "Krimi" },
    { id: 99, name: "Dokumentarfilm" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Familie" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "Historie" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Musik" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Liebesfilm" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV-Film" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "Kriegsfilm" },
    { id: 37, name: "Western" },
  ];

  //to clear search bar and reset genre when any link is pressed
  useEffect(() => {
    if (location.pathname === "/") {
      setSearchQuery("");
      setGenreFilter("");
    }

    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (e) {
        setError("Failed to load movies...");
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
          results = await getPopularMovies();
        } else {
          results = await getMoviesByGenre(genreFilter); // ✅ fetch by genre
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
      const searchResults = await searchMovies(searchQuery);
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
      return movie.title.toLowerCase().includes(trimmedQuery);
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
          placeholder="Search for movies..."
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

export default Home;
