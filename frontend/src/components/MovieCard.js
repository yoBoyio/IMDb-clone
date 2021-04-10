import React, { Component } from 'react';
import "./styles/Row.css";

class MovieCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: props.movie

    }
  }


  render() {
    const { movie, isLargeRow } = this.props;
    return (

      <div className={`row_poster ${isLargeRow && "row_posterLarge"}`}
        style={{
          position: 'relative'
        }}>
        <img
          className={`img_poster ${isLargeRow && "img_posterLarge"}`}
          src={movie.Poster_path}
          alt={movie.Title}
          key={movie.Id}

        />

      </div>
    )
  }
}



export default MovieCard;