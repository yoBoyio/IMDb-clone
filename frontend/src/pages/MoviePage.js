import React,{ Component } from 'react'
import { fetchMovie, fetchCredits, setLoading,fetchTrailer } from '../redux/actions/movieActions';
import {FetchComments, CommentLoading} from '../redux/actions/authActions'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import Movie from '../components/movies/Movie';
import Credits from '../components/movies/Credits';
import Trailer from '../components/movies/Trailer';
import MakeComment from '../components/likeDislike/MakeComment';
import { withStyles } from '@material-ui/core/'
import ShowComments from '../components/likeDislike/ShowComments';
import NotFound from './NotFound';
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = theme =>({
rootBig:{
  background: "#141414",
    color: "#fff",
    display: "inline-block",
    // border: "none",
    // boxShadow: "none",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    height:"100%",
    width:"100%",
    maxHeight:"100%",
    maxWidth:"100%"
  },
  rootSmall :{
    background: "#141414",
    color: "#fff",
    display: "inline-block",
    // border: "none",
    // boxShadow: "none",
    alignItems: "left",
    justifyContent: "left",
    margin: "auto",
    height:"100%",
    width:"100%",
    maxHeight:"100%",
    maxWidth:"100%"
  },
  trailerSmall: {
    // border: "none",
    // boxShadow: "none",
    alignItems: "center",
    justifyContent: "center",
    textAlign : "center",
    margin:"auto",
    width:300,
  },
  trailer:{
    alignItems: "left",
    justifyContent: "left",
    textAlign : "left",
  },
  showcommentsSmall: {
    display:"block",
    alignItems: "left",
    justifyContent: "left",
    textAlign : "left",
    margin:"auto",
    maxWidth:20,
    width:20
  },
 credits:{
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
  makecomments: {
    display:"flex",
    margin:"auto",
    alignItems: "left",
    justifyContent: "left",
    textAlign : "left",
  },
  showcomments: {
    display:"flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign : "center",
    marginLeft: 250
  },
  ratingBig: {
    display:"flex",
    margin:"auto"
  },
  ratingSmall:{
    display:"inline-block",
    margin:"auto"
  }
});
class MoviePage extends Component {
  constructor(props) {
    super(props)
    this.state = { matches: window.matchMedia("(min-width: 768px)").matches };
  }
    componentDidMount() {
      const handler = e => this.setState({matches: e.matches});
      window.matchMedia("(min-width: 768px)").addListener(handler);
      // setTimeout(() => {
        this.props.fetchMovie(this.props.match.params.id);
        this.props.fetchCredits(this.props.match.params.id);
        this.props.fetchTrailer(this.props.match.params.id);
        this.props.FetchComments(this.props.match.params.id);
        this.props.setLoading();
      // },1000)
      }
    render() { 
        const { loading,movie,auth } = this.props;
        const { id } = this.props.match.params;
        const {classes} = this.props;  
        let movieInfo =  
        <div> 
                   <Movie />      
        </div>
               let content = loading ?<div className={classes.circular}> <CircularProgress size="100px" /></div> : movieInfo;
               return <div>
                 {this.state.matches && (
                           <div>
                          {id == movie.id ? ( 
                          <div className={classes.rootBig}>
                           {content}
                           <div className={classes.credits}>
                           <Credits id={id}/> 
                           </div>
                           <div className={classes.trailer}>
                           <Trailer />
                           </div>
                           <div className={classes.ratingBig}>
                           <div className={classes.showcomments}>
                           <ShowComments />
                           </div>
                           <div className={classes.makecomments}>
                           {auth && auth.isAuthenticated && 
                           <MakeComment movieId={id} /> 
                           }
                           </div>
                          </div>
                         </div>
                          ):(
                            <NotFound />
                          )
                           }
                  </div>)}

                 {!this.state.matches && (
                      <div>
                        {id == movie.id ? ( 
                          <div className={classes.rootSmall}>
                           {content}
                           <Credits id={id}/> 
                           <div className={classes.trailerSmall}>
                           <Trailer />
                           </div>
                           <div className={classes.ratingSmall}>
                           <div className={classes.showcommentsSmall}>
                           <ShowComments />
                           </div>
                           <div className={classes.showcommentsSmall}>
                           {auth && auth.isAuthenticated && 
                           <MakeComment movieId={id} /> 
                           }
                           </div>
                          </div>
                         </div>
                          ):(
                            <NotFound />
                          )
                           }</div>
                           )}
                          
                      </div>;
                        }
              }

const mapStateToProps = state => ({
    loading: state.movie.loading,
    movie: state.movie.movie,
    credits: state.movie.credits,
    trailer:state.movie.trailer,
    genres:state.movie.genres,
    auth: state.auth,
    isAuthenticated: state.auth,
    showComments: state.auth.showComments,
    CommentLoading: state.auth.CommentLoading
  });
 
export default connect( mapStateToProps,
    {fetchMovie,fetchCredits,setLoading,fetchTrailer,FetchComments,CommentLoading})(withStyles(useStyles) (MoviePage));