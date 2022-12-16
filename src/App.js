import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  const handleFetchMovies = async () => {
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

      setMovies(data);
    }
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={handleFetchMovies}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
