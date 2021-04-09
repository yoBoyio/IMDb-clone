import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMovie, setLoading } from '../redux/actions/movieActions';
import Spinner from './layout/Spinner';

//material UI
import Container from '@material-ui/core/Container'
import { withStyles, withWidth } from '@material-ui/core/'
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Autorenew } from '@material-ui/icons';

import Divider from "@material-ui/core/Divider";

const useStyles = theme =>({
  root: {
    maxWidth: 500,
    width: "800px",
    padding: "40px",
    textalign: "center",
    margin: "auto",
    margintop: "5%",
    fontsize: "17px",
    borderradius: "10px 10px 10px 10px",
    transition: "0.3s"

  }
});

const getImage = (path) => `https://image.tmdb.org/t/p/w300/${path}`;

export class Movie extends Component {
  
  componentDidMount() {
    this.props.fetchMovie(this.props.match.params.id);
    this.props.setLoading();
  }
 
  render() {
    const { loading, movie } = this.props;
    
    //material UI
    const {classes} = this.props;
    
    let movieInfo = (
      <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt=""
          height="400"
          width="300"
          image={getImage(movie.poster_path)}
          title={movie.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {movie.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" >
            {movie.overview}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
    );

    let content = loading ? <Spinner /> : movieInfo;
    return <div>{content}</div>;
  }
}

const mapStateToProps = state => ({
  loading: state.movie.loading,
  movie: state.movie.movie
});

export default connect(
  mapStateToProps,
  { fetchMovie, setLoading }
)(withStyles(useStyles)(Movie));
