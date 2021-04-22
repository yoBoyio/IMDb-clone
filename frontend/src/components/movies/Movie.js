import React, { Component } from 'react';
import { fetchMovie, setLoading } from '../../redux/actions/movieActions';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';

//material UI
import { Grid, withStyles } from '@material-ui/core/'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Chip from '@material-ui/core/Chip';
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

function time_convert(num)
 { 
  var hours = Math.floor(num / 60);  
  var minutes = num % 60;
  return hours +"h " + minutes +"m";         
}
const getImage = (path) => `https://image.tmdb.org/t/p/w300/${path}`;

const useStyles = theme =>({
  imageContainer: {
    background: '#141414',
    color:'#fff',
    display: 'flex',
    marginLeft:100,
    marginRight:100,
    // marginTop:-100,
    border: "none", 
    boxShadow: "none",
    alignItems: 'center',
    justifyContent: 'left',
    width: 700
  },
  videoContainer: {
    display: 'flex',
    border: "none", 
    boxShadow: "none",
    alignItems: 'center',
    justifyContent: 'center',
    justify: "center",
    marginLeft:150,
    width: 1200
  },
  descriptionContainer: {
    background: '#141414',
    color:'#fff',
    display: 'inline-block',
    marginLeft:100,
    marginRight:100,
    border: "none", 
    boxShadow: "none", 
    alignItems: 'center',
    justifyContent: 'center'
  },
  bold: {
    fontWeight:'Bold',
    fontSize: "32px"
  },
  cover: {
    width: 250,
    height: 300,
    borderRadius: '5%'
  },
  subs: {
    fontSize: "18px",
  },
  description: {
    fontWeight:'Bold',
    fontSize: "32px",
    marginTop: "10px"
  },
  overview: {
    fontSize: "18px",
    marginTop: "10px"
  },
  details: {
    display: 'flex',
    marginLeft:250,

  },
  content: {
    flex: '1 0 auto',
    marginTop: "20px",
    marginLeft: "10px"
  },
  chipCover: {
    background: 'linear-gradient(45deg, #E80133 40%, #fe7037 90%)',
    border: "none",
    color: 'white',
    margin: "10px 10px 0 0",
    fontSize: "18px"
  },
  barCover:{
    height: 10,
    borderRadius: 5,
    width:120,
    background:'linear-gradient(45deg, #9d50bb 30%, #6e48aa 90%)',
    // boxShadow: '0 3px 5px 2px rgba(255	, 175, 189, .2)'
  }
});


export class Movie extends Component {
  // componentDidMount() {
  //   this.props.fetchTrailer(this.props.match.params.id);
  //   this.props.setLoading();
  // }
  render() {
    const { loading, movie } = this.props;
    const {classes} = this.props;


    let movieInfo = (



    <div>   
      {/* <div className={classes.videoContainer}><Trailer /></div> */}
      <Card className={classes.imageContainer}>
        <CardMedia
        className={classes.cover}
        image={getImage(movie.poster_path)}
        title="Cover" >
          <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography className={classes.bold} variant='h1' paragraph gutterBottom>
           {movie.title}
          </Typography>
          <Typography className={classes.subs} variant="subtitle1" >
             {movie.release_date}          
          </Typography>
          <Typography className={classes.subs} variant="subtitle1" >
             {movie.original_language} | {time_convert(movie.runtime)}        
          </Typography >
          <Chip className={classes.chipCover}  label={movie.vote_count}/>
          <Chip className={classes.chipCover}  label={movie.vote_average}/> 
        </CardContent>
      </div> 
     </CardMedia>
    </Card>
    
    <Card className={classes.descriptionContainer}>
      <div >
        <CardContent className={classes.content}>
          <Typography className={classes.description} gutterBottom>
            Description
          </Typography>
          <LinearProgress className={classes.barCover} variant="determinate" classes={{
                      barColorPrimary: classes.barCover 
                      }} />
          <Typography className={classes.overview} variant="subtitle1"  gutterBottom>
             {movie.overview}
          </Typography>
        </CardContent>
      </div> 
    </Card>
  </div>
    );

    let content = loading ? <Spinner /> : movieInfo;
    return <div >{content}</div>
    
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
