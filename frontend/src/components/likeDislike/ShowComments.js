import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../../layout/Spinner';
import { FetchComments, CommentLoading } from '../../redux/actions/authActions';

//material UI
import { withStyles,makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import LinearProgress from "@material-ui/core/LinearProgress";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import CircularProgress from "@material-ui/core/CircularProgress";


const useStyles = theme =>({
  root: {
    display: 'block',
    color: "#fff",
    backgroundColor: "#141414",
    marginTop:50,
    alignItems: 'left',
    justifyContent: 'left',
    justify: "left",
    margin:"auto",
    width:30,
    maxWidth:350,
  },
  rootComments: {
    display: 'inline-block',
    color: "#fff",
    backgroundColor: "#141414",
    border: "1px solid #282c34",
    borderRadius: 3,
    alignItems: 'left',
    justifyContent: 'left',
    justify: "left",
    margin:"auto",
    maxWidth:350,
    width:350,
    height:250,
    marginTop:30,
  },
  inline: {
    color: "#fff",
    fontSize: '18px',
    marginTop:5,
    marginLeft:5
  },
   rating:{
    width:400,
    marginTop:10,
    fontSize: '26px',
    border: "none",
    margin:"auto"

   },
   iconCover: {
    marginLeft: 10,
    // border: "1px solid",
    // borderRadius: "40%",
    // backgroundColor: "linear-gradient(45deg, #9d50bb 30%, #6e48aa 90%)",
    // boxShadow: '0 3px 5px 2px rgba(255	, 175, 189, .2)'
  },
  divider:{
    border: "1px solid #282c34",
    backgroundColor: "#282c34",
  },
  email:{
    color:"#b3b3cb"
  },
  comment: {
    fontWeight: "Bold",
    fontSize: "32px",
  },
barCover: {
    height: 10,
    borderRadius: 5,
    width: 80,
    background: "linear-gradient(45deg, #9d50bb 30%, #6e48aa 90%)",
    // boxShadow: '0 3px 5px 2px rgba(255	, 175, 189, .2)'
  },
});
export class ShowComments extends Component {
  // handleClick = () => {
  //   console.log(this.props.pageNumber);
  // }
  render() {
    const { loading, showComments,pageNumber } = this.props;
    const {classes} = this.props;
    let commentInfo = (
      <div className={classes.root}>
      <Typography className={classes.comment} gutterBottom>
       Ratings
     </Typography>
     <LinearProgress
       className={classes.barCover}
       variant="determinate"
       classes={{
         barColorPrimary: classes.barCover,
       }} />

      <div className={classes.rootComments}>
      <Typography 
      variant="h4"
      className={classes.rating}>
         Comments
        
         <ThumbsUpDownIcon       
                    fontSize="large"
                    variant="outlined"
                    className={classes.iconCover}
                  />       
      </Typography>

      {showComments.map(comment => (
          <List >
                 <ListItem alignItems="flex-start">
                   <ListItemAvatar>
              {comment.Like === true ? <ThumbUpIcon       
                                         fontSize="large"
                                         className={classes.iconCover}
                                       />
                                     : <ThumbDownIcon       
                                       fontSize="large"
                                       className={classes.iconCover}
                                     />}
                   </ListItemAvatar>
                   <ListItemText className={classes.email}
                     primary={comment.UserEmail}
                     secondary={ 
                     <Typography
                        className={classes.inline}
                      >
                        {comment.CommentContent}
                         {/* Testing Comments - Real Comments Unavailable for now! */}
                      </Typography>}
                         />
                 </ListItem>
                 <Divider className={classes.divider} variant="middle" />
           </List>
           ))}
           </div>
           </div>

      );

    let content = loading ? <div className={classes.circular}> <CircularProgress size="100px" /></div> : commentInfo;
    return <div>{content}</div>
              
  }
}

const mapStateToProps = state => ({
  CommentLoading: state.movie.CommentLoading,
  showComments: state.auth.showComments
});

export default connect(
  mapStateToProps,
  { FetchComments, CommentLoading })(withStyles(useStyles)(ShowComments));
