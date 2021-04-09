import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Row.css";
import Youtube from "react-youtube";
import { Link } from "react-router-dom";
import { CircularProgressbar } from 'react-circular-progressbar';
import { connect } from 'react-redux';
import { getMovies } from '../../redux/actions/movieActions';


function Row({ title, url, isLargeRow, getMovies, movie }) {

    const [trailerUrl, setTrailerUrl] = useState("");
    const { movies } = movie
    // Options for react-youtube
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    useEffect(() => {
        getMovies(url);
    }, [url]);

    const handleClick = async (movie) => {
        let trailerurl = await axios.get(
            `https://api.themoviedb.org/3/movie/${movie.Id}/videos?api_key=2eff1592c2104c03f9098af2aee54824&language=en-US`
        );
        setTrailerUrl(trailerurl.data.results[0].key);

    };

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row_posters">
                {movies.map(
                    (movie) =>
                    (
                        <div>
                            <img
                                className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                                src={movie.Poster_path}
                                alt={movie.Title}
                                key={movie.Id}
                                onClick={() => handleClick(movie)}
                            />
                            <div style={{ width: "50px" }}>
                                <CircularProgressbar value={movie.Vote_average * 10} text={movie.Vote_average}
                                    background
                                    backgroundPadding={6}
                                    styles={{
                                        background: {
                                            fill: "#9d50bb"
                                        },
                                        text: {
                                            fill: "#fff"
                                        },
                                        path: {
                                            stroke: "#fff"
                                        },
                                        trail: { stroke: "transparent" }
                                    }}
                                />
                            </div>
                        </div>
                    )
                )}
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
    );
}
const mapStateToProps = (state) => ({
    movie: state.movie,
});
export default connect(mapStateToProps, { getMovies })(Row);
