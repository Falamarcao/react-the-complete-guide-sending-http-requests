import React, { useCallback, useEffect, useState } from "react";

import AddMovie from "./components/AddMovie";
import MoviesList from "./components/MovieList";
import "./App.css";

const FIREBASE_URL =
  "https://react-the-complete-guide-e2f80-default-rtdb.firebaseio.com/movies.json";

function App() {
  const [movies, setMovies] = useState({ hasData: false, data: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetchMovies = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(FIREBASE_URL);

      if (!response.ok) {
        throw new Error(response.status + " ERROR");
      }

      const data = await response.json().then((json) =>
        Object.keys(json).map((key) => ({
          id: key,
          title: json[key].title,
          openingText: json[key].openingText,
          releaseDate: json[key].releaseDate,
        }))
      );

      setMovies(() => ({ hasData: data.length > 0, data: data }));
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, []);

  const handleAddMovie = useCallback(
    async (movie) => {
      const response = await fetch(FIREBASE_URL, {
        method: "POST",
        body: JSON.stringify(movie),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(response.status + " ERROR");
      }

      await response.json();

      handleFetchMovies();
    },
    [handleFetchMovies]
  );

  // Executes [handleFetchMovies] when the app starts, or when the function changes,
  // but as we are using useCallback without dependencies and inputs on [handleFetchMovies],
  // this will only be executed once.
  useEffect(() => {
    handleFetchMovies();
  }, [handleFetchMovies]);

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={handleAddMovie} />
      </section>
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
