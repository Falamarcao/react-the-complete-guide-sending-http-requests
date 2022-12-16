import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState({ hasData: false, data: [] });
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchMovies = async () => {
    setIsLoading(true);
    const response = await fetch("https://swapi.dev/api/films/");

    if (response?.status === 200) {
      const data = await response.json().then((json) =>
        json.results.map((data) => ({
          id: data.episode_id,
          title: data.title,
          openingText: data.opening_crawl,
          releaseDate: data.release_date,
        }))
      );
      setMovies(() => ({ hasData: data.length > 0, data: data }));
    }

    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={handleFetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {movies.hasData && <MoviesList movies={movies.data} />}
        {!isLoading && !movies.hasData && (
          <p>No results, try to click "Fetch Movies"</p>
        )}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
