import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCredits, setLoading } from '../../redux/actions/movieActions';
import Spinner from '../../layout/Spinner';
import png from '../../images/castMissing.png';
import Carousel from "react-elastic-carousel";
import CircularProgress from "@material-ui/core/CircularProgress";

//material UI
import { withStyles } from '@material-ui/core/'
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Grid } from '@material-ui/core/'
import LinearProgress from "@material-ui/core/LinearProgress";
import { Link } from 'react-router-dom';

const useStyles = theme =>({

  container: {
    background: '#141414',
    color:'#fff',
    display: 'flex',
    margin: '0 100px 0px 100px',
    border: "none", 
    boxShadow: "none"
  },
  item: {
    background: '#141414',
    color:'#fff',
    textAlign : "left",
    border: "none", 
    boxShadow: "none",
    height:380,
    width:200
  },
  castCharacter: {
    background: '#141414',
    color:'#fff',
    fontSize: "18px"
  },   
  image: { 
    borderRadius: '10%',
    border: '3px solid #141414',
    height: 250
  },
  cast: {
    fontWeight:'Bold',
    fontSize: "32px",
    marginTop: "10px",
    marginBottom: "10px",
    textAlign : "left",
    alignItems: "left",
    justifyContent: "left",
  },
  noimage: {
    borderRadius: '50%',
    background: 'var(--greylight)',
    color: '#fff',
    border: '3px solid #fff',
    fontSize: '100px',
    lineHeight: '117px',
    height: '125px',
    width: '125px'
  },
  barCover:{
    textAlign : "left",
    alignItems: "left",
    justifyContent: "left",
    height: 10,
    borderRadius: 5,
    width:50,
    marginBottom: "20px",
    background:'linear-gradient(45deg, #9d50bb 30%, #6e48aa 90%)'
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  overview: {
    fontSize: "22px",
    marginLeft: "25px"
  },
});

const getImage = (path) => `https://image.tmdb.org/t/p/w300/${path}`;

export class Credits extends Component {
    // componentDidMount() {
    //   this.props.fetchCredits(this.props.id);
    //   this.props.setLoading();
    // }
    render() {
        const { loading, credits } = this.props;
        //material UI
        const {classes} = this.props;  
        const breakPoints = [
          { width: 1, itemsToShow: 1 },
          { width: 550, itemsToShow: 3 },
          { width: 768, itemsToShow: 5 },
          { width: 1200, itemsToShow: 8 },
          { width: 1400, itemsToShow: 10 },
        ]; 
        

        let castList =
      credits!= "" &&
        <Carousel breakPoints={breakPoints}>
        {credits.map(castMember => (
      <Link to={`/person/${castMember.id}`}>
        <Card className={classes.item} key={castMember.name}>
              {castMember.profile_path ? (
          
          <CardActionArea >
          <CardMedia justifyContent="center"
   
          className={classes.image}
          component="img"
          height="250"
          image={getImage(castMember.profile_path)}
          alt="">

           </CardMedia>
           <CardContent >
           <Typography className={classes.castCharacter}  gutterBottom>{castMember.name}</Typography>
           <Typography className={classes.castCharacter} gutterBottom>{castMember.character}</Typography>
          </CardContent>
          </CardActionArea>
      ) : (
           <Card className={classes.item}>
           <CardMedia justifyContent="center"
   
          className={classes.image}
          component="img"
          height="250"
          image={png}
          alt="">  
             
           </CardMedia>
           <Typography className={classes.castCharacter} gutterBottom>{castMember.name}</Typography>
           <Typography gutterBottom>{castMember.character}</Typography>
           </Card>
      )}
     </Card>
     </Link>
  ))}
  </Carousel>
  let contents = loading ? <div className={classes.circular}> <CircularProgress size="100px" /></div> : castList;
  return  credits!= "" ? (
  <div>
  <Typography className={classes.cast}>Cast</Typography>
  <LinearProgress className={classes.barCover} variant="determinate" classes={{
        barColorPrimary: classes.barCover // class name, e.g. `classes-nesting-root-x`
      }} />
  <div className={classes.container}>
  {/* <GridList className={classes.gridList} cellHeight="380" > {contents}</GridList> */}
  {contents}
  </div>
  </div>
   ):(
    <div>
    <Typography className={classes.cast}>Cast</Typography>
    <LinearProgress className={classes.barCover} variant="determinate" classes={{
          barColorPrimary: classes.barCover // class name, e.g. `classes-nesting-root-x`
        }} />
    <div className={classes.container}>
    <Typography className={classes.overview}> Cast is currently unavailable</Typography>
    </div>
    </div>
   ) ; }; } 
   
         

const mapStateToProps = state => ({
    loading: state.movie.loading,
    credits: state.movie.credits
  });
  
  export default connect(
    mapStateToProps,
    { fetchCredits, setLoading }
  )(withStyles(useStyles)(Credits));