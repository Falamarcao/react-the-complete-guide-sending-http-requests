import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  const handleFetchMovies = () => {
    fetch("https://swapi.dev/api/films/")
      .then((response) =>
        response.json().then((json) =>
          json.results.map((results) => ({
            id: results.episode_id,
            title: results.title,
            openingText: results.opening_crawl,
            releaseDate: results.release_date,
          }))
        )
      )
      .then((data) => setMovies(data));
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
