import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTrailer, setLoading } from '../../redux/actions/movieActions';
import ReactPlayer from "react-player";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/'
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from '@material-ui/core/Grid';


const useStyles = theme => ({
  trailer: {
    fontWeight: 'Bold',
    fontSize: "32px",
    marginTop: "30px",
    marginBottom: "10px",
    textAlign: "left",
    marginLeft: 120
  },
  barCover: {
    height: 10,
    borderRadius: 5,
    width: 50,
    marginLeft: 125,
    marginBottom: "20px",
    background: 'linear-gradient(45deg, #9d50bb 30%, #6e48aa 90%)'
  },
  videoContainer: {
    display: 'flex',
    border: "none",
    boxShadow: "none",
    alignItems: 'center',
    justifyContent: 'center',
    justify: "center",
    marginLeft: 160,
    marginBottom: 30,
    width: 1200
  },
});

export class Trailer extends Component {


  render() {
    const { loading, trailer } = this.props;
    const { classes } = this.props;

    let movieInfo =
      <div>
        {trailer.slice(0, 1).map(video => (
          //epeidh emfanizw mono ena trailer mporw na topothetisw mesa sto map 
          // ta typography kai linearProgress
          <div>
            <Typography className={classes.trailer}>Trailer</Typography>
            <LinearProgress className={classes.barCover} variant="determinate" classes={{
              barColorPrimary: classes.barCover
            }} />
            <div className={classes.root}>
              <Grid container className={classes.paper} spacing={2}>
                <div className={classes.videoContainer}>
                  <ReactPlayer
                    url={"https://www.youtube.com/watch?v=" + video.key}
                    width="1100px"
                    height="500px"
                    controls={true}
                  ></ReactPlayer>
                </div>
              </Grid>
            </div>
          </div>
        ))}
      </div>

    let content = loading ? <div className={classes.circular}> <CircularProgress size="100px" /></div> : movieInfo;
    return <div>{content}</div>

  }
}

const mapStateToProps = state => ({
  loading: state.movie.loading,
  trailer: state.movie.trailer
});

export default connect(
  mapStateToProps,
  { fetchTrailer, setLoading }
)(withStyles(useStyles)(Trailer));
