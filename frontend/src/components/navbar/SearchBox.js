import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { InputBase } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import MicIcon from "@material-ui/icons/Mic";
import { IconButton } from "@material-ui/core";
import { connect } from "react-redux";
import { searchMovies } from "../../redux/actions/movieActions";
import { Link, useHistory, useLocation, withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";
import SearchPage from "../../pages/SearchPage";

//-----------------SPEECH RECOGNITION SETUP---------------------
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continous = true;
recognition.interimResults = true;
recognition.lang = "en-US";
//-----------------AXIOS----------------------------------------
const axios = require("axios");
//------------------------COMPONENT-----------------------------

const styles = {
  search: {
    position: "relative",
    borderRadius: "4px",
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#fff",
    },
    marginLeft: "10px",
    width: "250px",
    height: "35px",
    display: "flex",
  },
  searchIcon: {
    color: "#B0B0B0",
    padding: "3px 3px",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "#000",
  },
  inputInput: {
    padding: "1px 1px 1px 0px",
    paddingLeft: "30px",
    transition: "width",
    width: "100%",
  },
};

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listening: false,
      query: "",
      submit: false,
      checksubmit: false,
      results: props.movies,
    };
    this.toggleListen = this.toggleListen.bind(this);
    this.handleListen = this.handleListen.bind(this);
  }

  toggleListen() {
    this.handleListen();
  }

  handleListen() {
    if (!recognition.listening) {
      recognition.start();
      recognition.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) finalTranscript += transcript + " ";
          else interimTranscript += transcript;
        }
        this.setState({ query: finalTranscript });
      };
    } else {
      recognition.end();
    }
  }

  Search(event) {
    if (event.key === "Enter") {
      this.props.searchMovies(`?query=${this.state.query}`);
    }
  }

  handleChange(event) {
    this.setState({ query: event.target.value });
  }

  resetSubmit() {
    this.setState({ submit: false });

  }

  render() {
    const { classes } = this.props;
    const { submit, query, results } = this.state;

    const test = this.resetSubmit;
    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => this.handleChange(e)}
          value={this.state.query}
          onKeyDown={(event) => this.Search(event)}
        />
        <IconButton onClick={this.toggleListen}>
          <MicIcon />
        </IconButton>
        {results.length > 0 && <Redirect to={`/search/?query=${query}`} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: state.movie.searchMovies,
});
export default withStyles(styles)(
  withRouter(connect(mapStateToProps, { searchMovies })(SearchBox))
);
