import React, { useState, useEffect } from "react";
import Carousel from "react-elastic-carousel";
import axios from "axios";
import "../styles/Row.css";
import { api } from '../../util/config'
import MovieCard from "./MovieCard";
function Row({ title, url, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  //AXIOS REQUEST
  const fetchData = () => {

    axios.get(`api/movieshowcase/${url}`)
      .then(response => {
        setMovies(response.data);

      })
  }

  useEffect(() => {
    fetchData();
  }, [url]);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 3 },
    { width: 768, itemsToShow: 5 },
    { width: 1200, itemsToShow: 8 },
    { width: 1400, itemsToShow: 10 },
  ];
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="slider">
        <Carousel breakPoints={breakPoints}>
          {movies.map((movie) => (
            <MovieCard
              movie={movie}
              key={movie.id}
              isLargeRow={isLargeRow}
            ></MovieCard>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Row;
