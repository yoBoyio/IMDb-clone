import React, { useState, useEffect } from "react";
import Carousel from "react-elastic-carousel";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MovieCard from "./MovieCard";
import './Hero.css'
import {
    img_500,
  } from '../../util/config';
  import ReactPlayer from "react-player";
  import LinearProgress from "@material-ui/core/LinearProgress";
  import Typography from "@material-ui/core/Typography";
  import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    trailer: {
      fontWeight:'Bold',
      fontSize: "32px",
      marginTop: "30px",
      marginBottom: "10px",
      textAlign : "left",
      marginLeft:125
    },
    barCover:{
      height: 10,
      borderRadius: 5,
      width:100,
      marginLeft:125,
      marginBottom: "20px",
      background:'linear-gradient(45deg, #9d50bb 30%, #6e48aa 90%)'
    }
  }));
function Hero({ }) {
  const classes = useStyles();
  const [movies, setMovies] = useState([]);
  //AXIOS REQUEST
  const fetchData = () => {
    axios.get(`https://api.themoviedb.org/3/movie/460465/videos?api_key=2eff1592c2104c03f9098af2aee54824&&language=en-US`)
      .then(response => {
        setMovies(response.data.results);
        console.log(response.data.results);

      })
  }

  useEffect(() => {
    fetchData();
  }, []);

//   const breakPoints = [
//     { width: 1, itemsToShow: 1 },
//     { width: 550, itemsToShow: 3 },
//     { width: 768, itemsToShow: 5 },
//     { width: 1200, itemsToShow: 8 },
//     { width: 1400, itemsToShow: 10 },
//   ];
  return (
    <div >
     <Typography className={classes.trailer}>Up Next</Typography>
          <LinearProgress className={classes.barCover} variant="determinate" classes={{
                            barColorPrimary: classes.barCover 
                            }} /> 
        <Carousel >
          {movies.slice(0,3).map((movie) => (
            <ReactPlayer
            url={"https://www.youtube.com/watch?v=" + movie.key}
            width="1200px"
            height="500px"
            controls={true}
            ></ReactPlayer>
            ))}
        </Carousel>
      {/* </div> */}
         
    </div>
  );
}

export default Hero;
