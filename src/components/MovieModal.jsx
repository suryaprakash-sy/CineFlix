import { useEffect, useState } from "react";
import { getMovieTrailer } from "../services/movieApi";
import "./MovieModal.css";

function MovieModal({ movie, onClose }) {
  const [trailer, setTrailer] = useState(null);
  const [trailerLoading, setTrailerLoading] = useState(false);
  const [trailerError, setTrailerError] = useState("");

  useEffect(() => {
    if (!movie) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [movie, onClose]);

  useEffect(() => {
    if (!movie) {
      setTrailer(null);
      setTrailerError("");
      setTrailerLoading(false);
      return;
    }

    let cancelled = false;

    async function loadTrailer() {
      setTrailer(null);
      setTrailerError("");
      setTrailerLoading(true);

      try {
        const result = await getMovieTrailer(movie.id);

        if (!cancelled) {
          setTrailer(result);
        }
      } catch (error) {
        console.error("Failed to load trailer:", error);

        if (!cancelled) {
          setTrailerError("Unable to load the trailer. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setTrailerLoading(false);
        }
      }
    }

    loadTrailer();

    return () => {
      cancelled = true;
    };
  }, [movie]);

  if (!movie) return null;

  const title = movie.title || movie.name || "Unknown Movie";

  const releaseDate =
    movie.release_date || movie.first_air_date || "Release date unavailable";

  const rating =
    typeof movie.vote_average === "number"
      ? movie.vote_average.toFixed(1)
      : "N/A";

  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "";

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <section
        className="movie-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="movie-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close movie details"
        >
          ✕
        </button>

        {backdrop && (
          <img className="modal-backdrop" src={backdrop} alt={title} />
        )}

        <div className="modal-content">
          <h2 id="movie-modal-title">{title}</h2>

          <div className="modal-meta">
            <span>⭐ {rating}/10</span>
            <span>{releaseDate}</span>
          </div>

          <p className="modal-overview">
            {movie.overview || "No overview is available for this title."}
          </p>

          <div className="trailer-section">
            {trailerLoading && <p>Loading trailer...</p>}

            {trailerError && <p className="trailer-error">{trailerError}</p>}

            {!trailerLoading && !trailerError && trailer && (
              <>
                <h3>🎬 Official Trailer</h3>

                <div className="trailer-player">
                  <p>
                    <a
                      href={`https://www.youtube.com/watch?v=${trailer.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch trailer directly on YouTube
                    </a>
                  </p>
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title={`${title} trailer`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </>
            )}

            {!trailerLoading && !trailerError && !trailer && (
              <p>No trailer is available for this movie.</p>
            )}
          </div>

          <button className="modal-action" onClick={onClose}>
            Close Details
          </button>
        </div>
      </section>
    </div>
  );
}

export default MovieModal;
