import React, { Component, useCallback, useState, useEffect } from 'react';
import "../styles/Row.css";

import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from '../../util/config';
import ContentModal from '../movies/ContentModal';
import SkeletonCard from './SkeletonMovie'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

const MovieCard = ({ isLargeRow, movie }) => {
  const classes = useStyles();
  const [hovered, setHovered] = useState(false);
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(false);

  // load animation 1sec
  useEffect(() => {
    setLoading(true);
    const timing = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timing)
  }, [])

  //if loading display skeleton else img
  const display = loading ? <SkeletonCard isLargeRow={isLargeRow} /> :
    <img
      className={`row_poster ${isLargeRow && "row_posterLarge"}`}
      src={`${img_500}/${movie.poster_path}`}
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