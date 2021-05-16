import React, { useState, useEffect } from 'react';
import "../styles/Row.css";
import {
  img_500,
  unavailable,
} from '../../util/config';
import ContentModal from '../movies/ContentModal';
import SkeletonCard from './SkeletonMovie'

const MovieCard = ({ isLargeRow, movie }) => {

  const [loading, setLoading] = useState(false);

  // load animation 3secs
  useEffect(() => {
    setLoading(true);
    const timing = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timing)
  }, [])

  //if loading display skeleton else img
  let img = ``;
  const imgDisplay = (movie.poster_path == null ? img = unavailable : img = `${img_500}/${movie.poster_path}`)
  const display = loading ? <SkeletonCard isLargeRow={isLargeRow} /> :
    <img
      className={`row_poster ${isLargeRow && "row_posterLarge"}`}
      src={img}
      alt={movie.title}
      key={movie.id} />

  return (
    <ContentModal id={movie.id}>
      <div
        className='row_posters'>
        {display}
      </div>
    </ContentModal>
  )
}





export default MovieCard;