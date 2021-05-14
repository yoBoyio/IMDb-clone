import React, { useState } from "react";
import { fetchMovie, setLoading } from "../../redux/actions/movieActions";
import { connect } from "react-redux";
import Spinner from "../../layout/Spinner";
import Genres from "../genres/genres";
import AuthModal from "../auth/isAuth";
import WatchlistBtn from "../watchlist/AddToWatchlist";
import Like from "../likeDislike/Like";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from '../../util/config';

//material UI
import { withStyles,makeStyles } from "@material-ui/core/";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CircularProgress from "@material-ui/core/CircularProgress";

function time_convert(num) {
  var hours = Math.floor(num / 60);
  var minutes = num % 60;
  return hours + "h " + minutes + "m";
}
const getImage = (path) => `https://image.tmdb.org/t/p/w300/${path}`;

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    background: "#141414",
    color: "#fff",
    display: "flex",
    marginLeft: 100,
    marginRight: 100,
    // marginTop:-100,
    border: "none",
    boxShadow: "none",
    alignItems: "center",
    justifyContent: "left",
    width: 1000,
  },
  videoContainer: {
    display: "flex",
    border: "none",
    boxShadow: "none",
    alignItems: "center",
    justifyContent: "center",
    justify: "center",
    marginLeft: 150,
    width: 1200,
  },
  descriptionContainer: {
    background: "#141414",
    color: "#fff",
    display: "inline-block",
    marginLeft: 100,
    marginRight: 100,
    // border: "none",
    // boxShadow: "none",
    alignItems: "center",
    justifyContent: "center",
  },
  bold: {
    fontWeight: "Bold",
    fontSize: "38px",
  },
  cover: {
    width: 250,
    height: 300,
    borderRadius: "5%",
  },
  subs: {
    fontSize: "18px",
    marginBottom: "5px",
  },
  description: {
    fontWeight: "Bold",
    fontSize: "32px",
    marginTop: "10px",
  },
  overview: {
    fontSize: "22px",
    marginTop: "10px",
  },
  details: {
    display: "flex",
    marginLeft: 250,
  },
  content: {
    flex: "1 0 auto",
    marginTop: "20px",
    marginLeft: "10px",
  },
  barCover: {
    height: 10,
    borderRadius: 5,
    width: 120,
    background: "linear-gradient(45deg, #9d50bb 30%, #6e48aa 90%)",
    // boxShadow: '0 3px 5px 2px rgba(255	, 175, 189, .2)'
  },
  heart: {
    display: "flex",
    marginRight: 4,
    marginBottom: 5
  }
}));

function Movie({loading, movie, auth}) {
    // const { loading, movie, auth, selectedGenres,setSelectedGenres,setGenres,genres,movieIds } = this.props;
    const  classes = useStyles();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    console.log(movie.genres);

    let movieInfo = (
      <div>
        <Card className={classes.imageContainer}>
          {movie.poster_path ? (
  
           <CardMedia
            className={classes.cover}
            image={getImage(movie.poster_path)}
            title={movie.title}
          >
        
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography
                  className={classes.bold}
                  variant="h1"
                  paragraph
                  gutterBottom
                >
                  {movie.title}
                </Typography>
                <Typography
                  className={classes.subs}
                  variant="subtitle1"
                  gutterBottom
                >
                  {movie.release_date &&
                    movie.release_date
                      .substring(5)
                      .split("-")
                      .concat(movie.release_date.substring(0, 4))
                      .join("/")}
                </Typography>
                <Typography
                  className={classes.subs}
                  variant="subtitle1"
                  gutterBottom
                >
                  {movie.original_language} | {time_convert(movie.runtime)}
                </Typography>
                <div className={classes.heart}>
                  <FavoriteIcon
                    className={classes.heart}
                    fontSize="medium"
                    color="secondary"
                  />
                  <Typography className={classes.subs}>
                    {" "}
                    {movie.vote_average * 10 + "%"}{" "}
                  </Typography>
                </div>
               {movie.genres && <Genres
                    movieIds={movie.genres}
                    selectedGenres={selectedGenres}
                    setSelectedGenres={setSelectedGenres}
                    genres={genres}
                    setGenres={setGenres}
                />}
                <div className={classes.rating}>
                  {auth && auth.isAuthenticated ? (
                      <Like movieId={movie.id} auth={true} />
                  ) : (
                    <AuthModal>
                      {" "}
                      <Like movieId={movie.id} auth={false} />{" "}
                    </AuthModal>
                  )}
                  <WatchlistBtn movieId={movie.id} />
                </div>
              </CardContent>
            </div>
          </CardMedia>
          ):(
            <CardMedia
            className={classes.cover}
            image= {unavailable}
            title="Cover"
          >
        
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography
                  className={classes.bold}
                  variant="h1"
                  paragraph
                  gutterBottom
                >
                  {movie.title}
                </Typography>
                <Typography
                  className={classes.subs}
                  variant="subtitle1"
                  gutterBottom
                >
                  {movie.release_date &&
                    movie.release_date
                      .substring(5)
                      .split("-")
                      .concat(movie.release_date.substring(0, 4))
                      .join("/")}
                </Typography>
                <Typography
                  className={classes.subs}
                  variant="subtitle1"
                  gutterBottom
                >
                  {movie.original_language} | {time_convert(movie.runtime)}
                </Typography>
                <div className={classes.heart}>
                  <FavoriteIcon
                    className={classes.heart}
                    fontSize="medium"
                    color="secondary"
                  />
                  <Typography className={classes.subs}>
                    {" "}
                    {movie.vote_average * 10 + "%"}{" "}
                  </Typography>
                </div>
               {movie.genres && <Genres
                    movieIds={movie.genres}
                    selectedGenres={selectedGenres}
                    setSelectedGenres={setSelectedGenres}
                    genres={genres}
                    setGenres={setGenres}
                />}
                <div className={classes.rating}>
                  {auth && auth.isAuthenticated ? (
                      <Like movieId={movie.id} auth={true} />
                  ) : (
                    <AuthModal>
                      {" "}
                      <Like movieId={movie.id} auth={false} />{" "}
                    </AuthModal>
                  )}
                  <WatchlistBtn movieId={movie.id} />
                </div>
              </CardContent>
            </div>
          </CardMedia>
          )}
        </Card>
       
       {movie.overview &&
        <Card className={classes.descriptionContainer}>
          <div>
            <CardContent className={classes.content}>
              <Typography className={classes.description} gutterBottom>
                Description
              </Typography>
              <LinearProgress
                className={classes.barCover}
                variant="determinate"
                classes={{
                  barColorPrimary: classes.barCover,
                }}
              />
              <Typography
                className={classes.overview}
                variant="subtitle1"
                gutterBottom
              >
                {movie.overview}
              </Typography>
            </CardContent>
          </div>
        </Card>}
      </div>
    );

    let content = loading ? <div className={classes.circular}> <CircularProgress size="100px" /></div> : movieInfo;
    return <div> {content} </div>;
  }


const mapStateToProps = (state) => ({
  loading: state.movie.loading,
  movie: state.movie.movie,
  auth: state.auth,
});

export default connect(mapStateToProps, { fetchMovie, setLoading })(
  withStyles(useStyles)(Movie)
);
