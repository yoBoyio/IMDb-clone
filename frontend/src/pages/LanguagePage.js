import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const axios = require("axios");
const useStyles = makeStyles((theme) => ({
  root: {
    color: "white",
    background: "#9d50bb",
    flexWrap: "wrap",
    position: "auto",
    display: "auto",
    fontSize: "150%",
  },
  displayMovies: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: "30px",
    marginRight: "30px",
    padding: "100px",
    width: "100",
    justifyContent: "center",
    alignItems: "center",
    maxHeight: "",
  },
  button: {
    marginTop: "5px",
    padding: "0",
    maxWidth: "100%",
    width: "200%",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "50px",
  },
}));

function LanguagePage() {
  const [anchorEl, setAnchorEl] = useState(null);
  function GenresPage() {
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const [content, setContent] = useState();
    const [pageText, setPageText] = useState();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalresults, setTotalResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalpages, settotalPages] = useState(1);
    const [currentMovie, setCurrentMovie] = useState(null);
    const [genreId, setGenreId] = useState(0);

    const classes = useStyles();

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    //fetchData
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/configuration/languages?api_key=2eff1592c2104c03f9098af2aee54824`
      );

      setContent(data);
    };

    const fetchMovies = (e, id) => {
      setLoading(true);
      setGenreId(id);
      setMovies([]);
      axios
        .get(
          `https://api.themoviedb.org/3/movie/76341?api_key=2eff1592c2104c03f9098af2aee54824&language=${id}`
        )
        .then((response) => {
          setLoading(false);
          setMovies(response.data.results);
          setTotalResults(response.data.total_results);
          settotalPages(response.data.total_pages);
          console.log(response.data.results);
        })
        .catch((error) => {
          setLoading(false);
        });
    };

    return (
      <div>
        test
        <Button
          aria-controls="simple-menu2"
          aria-haspopup="true"
          onClick={handleClick}
        >
          SelectLanguage
        </Button>
        <Menu
          id="simple-menu2"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}
export default LanguagePage;
