import React, { Component, useCallback, useState } from 'react';
import "../styles/Row.css";

import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import ContentModal from '../movies/ContentModal';
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from '../../util/config';

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

const MovieCard = ({ isLargeRow, movie, children }) => {
  const classes = useStyles();
  const [hovered, setHovered] = useState(false);
  const [content, setContent] = useState();

  return (
    <ContentModal id={movie.Id}>

      <div
        className='row_posters'>

        <img
          className={`row_poster ${isLargeRow && "row_posterLarge"}`}
          // src={`${img_500}/${movie.poster_path}`}
          src={movie.Poster_path}
          alt={movie.title}
          key={movie.Id}

        />

      </div>
    </ContentModal>
  )
}





export default MovieCard;