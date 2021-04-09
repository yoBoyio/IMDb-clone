import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovie, setLoading } from '../redux/actions/movieActions';
import Spinner from './layout/Spinner';

//material UI
import { withStyles } from '@material-ui/core/'
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = theme => ({
  card: {
    marginBottom: 20,
    width: 200,
    margin: '1rem 5px 1rem 5px',
    boxShadow: '3px 3px 5px rgba(0,0,0,0.1)',
    overflow: 'hiden',
    background: '#2B2929',
    display: 'flex'
  },
  Media: {
    height: "550px"
  },
  image: {
    height: 550,
    width: '100%'
  },
  content: {
    padding: 5,
    objectFit: 'cover'
  },
  movieinfo: {
    display: 'flex',
    padding: '5',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '15px',
    color: "#fff"
  },
  rating: {
    position: 'relative',
    justifyContent: 'space-between',
    bottom: '1px'
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
    const { classes } = this.props;

    let movieInfo = (

      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.Media}
            component="img"
            height="200"
            image={getImage(movie.poster_path)}
            title="Contemplative Reptile"
          />
        </CardActionArea>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Lizard
          </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
          </Typography>
          </CardContent>

          <CardActions>
            <Button size="small" color="primary">
              Share
          </Button>
            <Button size="small" color="primary">
              Learn More
          </Button>
          </CardActions>
        </CardActionArea>
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
