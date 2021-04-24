import React, { useState, useEffect } from "react";
import Carousel from 'react-elastic-carousel';
import axios from "axios";
import "../styles/Row.css";
import Youtube from "react-youtube";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import MovieCard from './MovieCard'
import { api } from '../../util/config'


function Row({ title, url, isLargeRow, }) {

    const [trailerUrl, setTrailerUrl] = useState("");
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await api.get(`api/movieshowcase/${url}`);
            setMovies(request.data);
            return request;
        }
        fetchData();
    }, [url]);

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 3 },
        { width: 768, itemsToShow: 5 },
        { width: 1000, itemsToShow: 6 },
        { width: 1400, itemsToShow: 10 },
    ];
    return (


        <div className="row">
            <h2>{title}</h2>
            <div className='slider'>
                <Carousel breakPoints={breakPoints} >

                    {movies.map(

                        (movie) =>
                        (
                            <MovieCard movie={movie}
                                key={movie.id}
                                isLargeRow={isLargeRow}
                            >
                            </MovieCard>
                        )
                    )}
                </Carousel>
            </div>
        </div>
    );
}

export default Row;
