import React, { useState, useEffect } from "react";
import Carousel from 'react-elastic-carousel';
import axios from "axios";
import "../styles/Row.css";
import Youtube from "react-youtube";
import { Link } from "react-router-dom";
import { CircularProgressbar } from 'react-circular-progressbar';
import { connect } from 'react-redux';
import MovieCard from '../MovieCard'

function Row({ title, url, isLargeRow, }) {

    const [trailerUrl, setTrailerUrl] = useState("");
    const [movies, setMovies] = useState([]);
    // Options for react-youtube
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`api/movieshowcase/${url}`);
            setMovies(request.data);
            return request;
        }
        fetchData();
    }, [url]);

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 3 },
        { width: 768, itemsToShow: 5 },
        { width: 1200, itemsToShow: 10 },
    ];
    const handleClick = async (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            let trailerurl = await axios.get(
                `https://api.themoviedb.org/3/movie/${movie.Id}/videos?api_key=2eff1592c2104c03f9098af2aee54824&language=en-US`
            );
            setTrailerUrl(trailerurl.data.results[0].key);
        }
    };

    return (


        <div className="row">
            <h2>{title}</h2>
            <div className='slider'>
                <Carousel breakPoints={breakPoints} >
                    {movies.map(
                        (movie) =>
                        (
                            <MovieCard movie={movie}
                                key={movie.Id}
                                isLargeRow={isLargeRow}
                                onClick={() => handleClick(movie)}
                            />
                        )
                    )}
                </Carousel>
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
    );
}

export default Row;
