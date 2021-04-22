import React,{ Component } from 'react'
import { fetchMovie, fetchCredits, setLoading,fetchTrailer } from '../redux/actions/movieActions';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import Movie from '../components/movies/Movie';
import Credits from '../components/movies/Credits';
import Trailer from '../components/movies/Trailer';
import Card from "@material-ui/core/Card";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/'

const useStyles = theme =>({

  trailer: {
    fontWeight:'Bold',
    fontSize: "32px",
    marginTop: "30px",
    marginBottom: "10px",
    textAlign : "left",
    marginLeft:125
  },
  barCover:{
    height: 10,
    borderRadius: 5,
    width:50,
    marginLeft:125,
    marginBottom: "20px",
    background:'linear-gradient(45deg, #9d50bb 30%, #6e48aa 90%)'
  },
  videoContainer: {
    display: 'flex',
    border: "none", 
    boxShadow: "none",
    alignItems: 'center',
    justifyContent: 'center',
    justify: "center",
    marginLeft:160,
    width: 1200
  }
});
class MoviePage extends Component {
    componentDidMount() {
        this.props.fetchMovie(this.props.match.params.id);
        this.props.fetchCredits(this.props.match.params.id);
        this.props.fetchTrailer(this.props.match.params.id);
        this.props.setLoading();
      }
    render() { 
        const { loading, movie , credits } = this.props;
        const { id } = this.props.match.params;
        const {classes} = this.props;  
        let movieInfo =  
        <div> 
                   <Movie />      
        </div>
               let content = loading ? <Spinner /> : movieInfo;
               return <div>{content}
                           <Credits id={id}/>
                           <Typography className={classes.trailer}>Trailer</Typography>
                           <LinearProgress className={classes.barCover} variant="determinate" classes={{
                            barColorPrimary: classes.barCover 
                            }} /> 
                           <div className={classes.videoContainer}>
                           <Trailer /></div>  
                      </div>;
                        }
              }

const mapStateToProps = state => ({
    loading: state.movie.loading,
    movie: state.movie.movie,
    credits: state.movie.credits,
    trailer:state.movie.trailer
  });
 
export default connect( mapStateToProps,
    {fetchMovie,fetchCredits,setLoading,fetchTrailer})(withStyles(useStyles) (MoviePage));