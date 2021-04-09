import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';

// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Rating from '@material-ui/lab/Rating';
import movie from './Movie';
import { Link } from 'react-router-dom'




const styles = {
  card: {

    marginBottom: 20,
    width: 200,
    margin: '1rem 5px 1rem 5px',
    boxShadow: '3px 3px 5px rgba(0,0,0,0.1)',
    overflow: 'hiden',
    background: '#2B2929'
  },
  image: {
    minWidth: 200,
    maxWidth: '100%'
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
    bottom: '1px',

  }
};

class MovieCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.movie.Title,
      id: props.movie.Id,
      Vote_average: props.movie.Vote_average,
      Poster_path: props.movie.Poster_path,
    }
  }


  render() {
    const {
      title,
      id,
      Poster_path,
      Vote_average

    } = this.state;

    const { classes } = this.props;
    const { movies } = this.props;
    return (
      <Card variant="outlined" className={classes.card}>
        <Link to={'/movie/' + id}>
        <CardActionArea>
          <CardMedia
            component="img"
            title={title}
            height="200"
            image={Poster_path}
          />
        </CardActionArea>
        </Link>
        <CardContent className={classes.movieinfo}>
          <Typography component="h2">
            {title}
          </Typography>
          <Typography variant="body">{Vote_average}</Typography>

        </CardContent>
        <Rating className={classes.rating} name="half-rating" defaultValue={0} precision={0.5} />
      </Card>
    );
  }
}



export default withStyles(styles)(MovieCard);