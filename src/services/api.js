const API_KEY = "c3a9778fd76de9f436a3474588f41575";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.results;
};

export const getMoviesByGenre = async (genreId) => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
  );
  if (!response.ok) throw new Error("Failed to fetch movies by genre");
  const data = await response.json();
  return data.results;
};

export const getPopularTVShows = async () => {
  const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
  if (!response.ok) throw new Error("Failed to fetch TV shows");
  const data = await response.json();
  return data.results;
};

export const getTVShowsByGenre = async (genreId) => {
  const response = await fetch(
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=${genreId}`
  );
  if (!response.ok) throw new Error("Failed to fetch movies by genre");
  const data = await response.json();
  return data.results;
};

export const searchTVShows = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.results;
};
