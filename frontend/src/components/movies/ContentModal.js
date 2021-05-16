import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import { img_500, unavailable, unavailableLandscape } from "../../util/config";
import "../styles/ContentModal.css";
import { StyledButton } from "../../util/MyTextfield";
import Like from "../likeDislike/Like";
import WatchlistBtn from "../watchlist/AddToWatchlist";
import { connect } from "react-redux";
import AuthModal from "../auth/isAuth";
import Genres from "../genres/genres";
import useGenre from "../../util/useGenre";
import { CircularProgress } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#141414",
    border: "1px solid #282c34",
    borderRadius: 3,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function ContentModal({ children, id, auth }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [animateMeter, setanimateMeter] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenre(selectedGenres);

  const handleOpen = () => {
    fetchData();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=2eff1592c2104c03f9098af2aee54824&&language=en-US`
    );
    setLoading(true);
    setContent(data);

  };

  useEffect(() => {
    setTimeout(() => {
      setanimateMeter(true);
    }, 100);

  }, []);
  const strokeDash = 339.292;
  return (
    <>
      <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && loading ? (
            <div className={classes.paper}>
              <div className="ContentModal">
                <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />
                {/* ===============Genres============= */}
                <div className="ContentModal__about">
                  <Genres
                    movieIds={content.genres}
                    selectedGenres={selectedGenres}
                    setSelectedGenres={setSelectedGenres}
                    genres={genres}
                    setGenres={setGenres}
                  />
                  <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  <span className="ContentModal__description">
                    {content.overview}
                  </span>
                  {/*==============LIKES & WATCHLIST ====================*/}
                  <div className="actions">
                    {auth && auth.isAuthenticated ? (
                      <Like movieId={id} auth={true} />
                    ) : (
                      <AuthModal>
                        <Like movieId={id} auth={false} />{" "}
                      </AuthModal>
                    )}
                    <WatchlistBtn movieId={id} />
                  </div>

                  <div className="score">
                    <span>{content.vote_average}</span>
                    <svg className="scoreMeter">
                      <circle className="scoreMeterCircle" />
                      <circle
                        className="scoreMeterValue"
                        style={{
                          strokeDasharray: strokeDash.toString(),
                          strokeDashoffset:
                            strokeDash -
                            strokeDash *
                            (animateMeter ? content.vote_average / 10 : 0),
                        }}
                      />
                    </svg>
                  </div>

                  <div className="btn">
                    <StyledButton
                      component={Link}
                      to={`/movie/${id}`}
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Show More
                    </StyledButton>
                  </div>
                </div>
              </div>
            </div>
          ) :
            <CircularProgress />
          }
        </Fade>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(ContentModal);
