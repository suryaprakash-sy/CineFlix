import { useEffect, useState } from "react";
import "./App.css";
import {
  getPopularMovies,
  getTrendingMovies,
  getPosterUrl,
  searchMovies,
} from "./services/movieApi";
import MovieModal from "./components/MovieModal";

function App() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [myList, setMyList] = useState(() => {
    try {
      const savedList = JSON.parse(localStorage.getItem("cineflix-my-list"));

      return Array.isArray(savedList) ? savedList : [];
    } catch (error) {
      console.error("Failed to load My List:", error);
      return [];
    }
  });

  const [showMyList, setShowMyList] = useState(false);

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);
        setError("");

        const [popular, trending] = await Promise.all([
          getPopularMovies(),
          getTrendingMovies(),
        ]);

        setPopularMovies(popular);
        setTrendingMovies(trending);
      } catch (err) {
        console.error("Failed to load movies:", err);
        setError(err.message || "Unable to load movies.");
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  useEffect(() => {
    localStorage.setItem("cineflix-my-list", JSON.stringify(myList));
  }, [myList]);

  async function handleSearch(event) {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) {
      setSearchResults([]);
      setIsSearching(false);
      setSearchError("");
      return;
    }

    try {
      setIsSearching(true);
      setSearchError("");

      const results = await searchMovies(query);
      setSearchResults(results);
    } catch (error) {
      console.error("Movie search error:", error);
      setSearchError("Unable to search movies. Please try again.");
      setSearchResults([]);
    }
  }

  function toggleMyList(movie) {
    setMyList((currentList) => {
      const alreadySaved = currentList.some((item) => item.id === movie.id);

      if (alreadySaved) {
        return currentList.filter((item) => item.id !== movie.id);
      }

      return [...currentList, movie];
    });
  }

  function isMovieSaved(movieId) {
    return myList.some((movie) => movie.id === movieId);
  }

  function MovieRow({ title, movies }) {
    return (
      <section className="movie-section">
        <h2>{title}</h2>

        <div className="movie-row">
          {movies.map((movie) => (
            <article
              className="movie-card"
              key={movie.id}
              onClick={() => setSelectedMovie(movie)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelectedMovie(movie);
                }
              }}
            >
              {movie.poster_path ? (
                <img
                  className="movie-poster"
                  src={getPosterUrl(movie.poster_path)}
                  alt={`${movie.title} poster`}
                  loading="lazy"
                />
              ) : (
                <div className="poster-placeholder">No poster available</div>
              )}

              <div className="movie-info">
                <h3>{movie.title}</h3>

                <button
                  className="my-list-button"
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleMyList(movie);
                  }}
                  onKeyDown={(event) => {
                    event.stopPropagation();
                  }}
                >
                  {isMovieSaved(movie.id)
                    ? "❤️ Remove from My List"
                    : "🤍 Add to My List"}
                </button>

                <p>⭐ {Number(movie.vote_average).toFixed(1)} / 10</p>
                <p>
                  {movie.release_date
                    ? movie.release_date.slice(0, 4)
                    : "Release date unavailable"}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <div className="app">
      <header className="navbar">
        <a href="#home" className="logo">
          CINEFLIX
        </a>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#popular">Movies</a>
          <a href="#trending">Trending</a>
          <a
            href="#my-list"
            onClick={(event) => {
              event.preventDefault();
              setShowMyList((current) => !current);
              setIsSearching(false);
            }}
          >
            My List ({myList.length})
          </a>
        </nav>

        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            aria-label="Search movies"
          />

          <button type="submit">🔍</button>
        </form>

        <button
          className="sign-in"
          onClick={() => alert("Login functionality is coming soon!")}
        >
          Sign In
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">YOUR NEXT FAVORITE STORY</p>

            <h1>
              Unlimited Stories.
              <br />
              Unforgettable Movies.
            </h1>

            <p className="hero-description">
              Discover incredible movies, explore new worlds, and find your next
              favorite story.
            </p>

            <div className="hero-actions">
              <button
                className="play-button"
                onClick={() =>
                  document
                    .getElementById("popular")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                ▶ Explore Movies
              </button>

              <button
                className="info-button"
                onClick={() =>
                  alert("Discover your next favorite movie on CineFlix!")
                }
              >
                More Info
              </button>
            </div>
          </div>
        </section>

        {showMyList && (
          <section className="movie-section" id="my-list">
            <div className="my-list-header">
              <h2>❤️ My List ({myList.length})</h2>

              <button
                className="close-my-list"
                onClick={() => setShowMyList(false)}
              >
                ✕ Back to Movies
              </button>
            </div>

            {myList.length === 0 ? (
              <p>Your list is empty. Add your favorite movies!</p>
            ) : (
              <div className="movie-row">
                {myList.map((movie) => (
                  <article className="movie-card" key={movie.id}>
                    {movie.poster_path ? (
                      <img
                        className="movie-poster"
                        src={getPosterUrl(movie.poster_path)}
                        alt={`${movie.title || movie.name} poster`}
                        loading="lazy"
                      />
                    ) : (
                      <div className="poster-placeholder">
                        No poster available
                      </div>
                    )}

                    <div className="movie-info">
                      <h3>{movie.title || movie.name}</h3>

                      <button
                        className="my-list-button"
                        onClick={() => setSelectedMovie(movie)}
                      >
                        View Details
                      </button>

                      <button
                        className="my-list-button"
                        onClick={() => toggleMyList(movie)}
                      >
                        🗑️ Remove
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {isSearching && (
          <section className="movie-section">
            <h2>Search Results: {searchQuery}</h2>

            {searchError && <p className="error-message">{searchError}</p>}

            {!searchError && searchResults.length === 0 && (
              <p>No movies found. Try another title.</p>
            )}

            <div className="movie-row">
              {searchResults.map((movie) => (
                <article
                  className="movie-card"
                  key={movie.id}
                  onClick={() => setSelectedMovie(movie)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedMovie(movie);
                    }
                  }}
                >
                  {movie.poster_path ? (
                    <img
                      className="movie-poster"
                      src={getPosterUrl(movie.poster_path)}
                      alt={`${movie.title} poster`}
                      loading="lazy"
                    />
                  ) : (
                    <div className="poster-placeholder">
                      No poster available
                    </div>
                  )}

                  <div className="movie-info">
                    <h3>{movie.title}</h3>

                    <p>⭐ {Number(movie.vote_average).toFixed(1)} / 10</p>

                    <p>
                      {movie.release_date
                        ? movie.release_date.slice(0, 4)
                        : "Release date unavailable"}
                    </p>

                    <button
                      className="my-list-button"
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleMyList(movie);
                      }}
                      onKeyDown={(event) => {
                        event.stopPropagation();
                      }}
                    >
                      {isMovieSaved(movie.id)
                        ? "❤️ Remove from My List"
                        : "🤍 Add to My List"}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {loading && <div className="status-message">Loading movies...</div>}

        {error && (
          <div className="status-message error-message">
            <p>Could not load movies.</p>
            <p>{error}</p>
            <p>Check your API key, internet connection, and browser console.</p>
          </div>
        )}

        {!loading && !error && !isSearching && !showMyList && (
          <>
            <div id="popular">
              <MovieRow title="Popular on CineFlix" movies={popularMovies} />
            </div>

            <div id="trending">
              <MovieRow title="Trending This Week" movies={trendingMovies} />
            </div>
          </>
        )}

        <footer className="footer">
          <p>© 2026 CineFlix. Discover your next favorite story.</p>
          <p className="attribution">
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </p>
        </footer>
      </main>

      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
}

export default App;
