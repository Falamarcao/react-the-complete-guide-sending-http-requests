import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState({ hasData: false, data: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetchMovies = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://swapi.dev/api/films/");

      if (!response.ok) {
        throw new Error(response.status + " ERROR");
      }

      const data = await response.json().then((json) =>
        json.results.map((data) => ({
          id: data.episode_id,
          title: data.title,
          openingText: data.opening_crawl,
          releaseDate: data.release_date,
        }))
      );
      setMovies(() => ({ hasData: data.length > 0, data: data }));
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, []);

  // Executes [handleFetchMovies] when the app starts, or when the function changes,
  // but as we are using useCallback without dependencies and inputs on [handleFetchMovies],
  // this will only be executed once.
  useEffect(() => {
    handleFetchMovies();
  }, [handleFetchMovies]);

  return (
    <React.Fragment>
      <section>
        <button onClick={handleFetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <b>{error}</b>}
        {!isLoading && !movies.hasData && (
          <p>
            No results, {error ? "try again" : 'try to click "Fetch Movies"'}
          </p>
        )}
        {movies.hasData && <MoviesList movies={movies.data} />}
      </section>
    </React.Fragment>
  );
}

export default App;
