const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

export async function getPopularMovies() {
  if (!API_KEY) {
    throw new Error("TMDB API key is missing. Check your .env file.");
  }

  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.results;
}

export async function getTrendingMovies() {
  if (!API_KEY) {
    throw new Error("TMDB API key is missing. Check your .env file.");
  }

  const response = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.results;
}

export function getPosterUrl(posterPath) {
  if (!posterPath) return "";

  return `https://image.tmdb.org/t/p/w500${posterPath}`;
}

export async function searchMovies(query) {
  if (!API_KEY) {
    throw new Error("TMDB API key is missing. Check your .env file.");
  }

  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error(`Movie search failed: ${response.status}`);
  }

  const data = await response.json();

  return data.results;
}

export async function getMovieTrailer(movieId) {
  if (!API_KEY) {
    throw new Error("TMDB API key is missing. Check your .env file.");
  }

  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch movie trailers: ${response.status}`);
  }

  const data = await response.json();

  return (
    data.results.find(
      (video) =>
        video.site === "YouTube" &&
        video.type === "Trailer" &&
        video.official
    ) ||
    data.results.find(
      (video) => video.site === "YouTube" && video.type === "Trailer"
    ) ||
    null
  );
}