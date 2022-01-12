import React, { useEffect, useState } from "react";
import axios from "./axios";
import movieTrailer from "movie-trailer";
import ReactPlayer from "react-player";

import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const fetchMovies = async (fetchUrl) => {
      const moviesResponse = await axios.get(fetchUrl);

      const {
        data: { results },
      } = moviesResponse;
      setMovies(results);
    };

    fetchMovies(fetchUrl);
  }, [fetchUrl]);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.title || "")
        .then((url) => {
          // const urlParams = new URLSearchParams(new URL(url).search);

          setTrailerUrl(url);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => (
          <img
            className={`row__poster ${isLargeRow && "row__poster-large"}`}
            key={movie.id}
            onClick={() => handleClick(movie)}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && (
        <ReactPlayer
          url={trailerUrl}
          controls={true}
          muted={true}
          width="50%"
        />
      )}
    </div>
  );
};

export default Row;
