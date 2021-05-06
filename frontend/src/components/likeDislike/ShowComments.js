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
import { pink } from "@material-ui/core/colors";
import Button from '@material-ui/core/Button';


const useStyles = theme =>({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  inline: {
    display: 'inline',
    color: "#fff",
    fontSize: '20px'
  },
  paper: {
    width: 700,
    height: 300,
    backgroundColor: "#141414",
    border: "1px solid #282c34",
    borderRadius: 3,
    color: "white",
    boxShadow: theme.shadows[5],
    marginTop:50
   },
   rating:{
    marginLeft: 20,
    marginTop:10,
    fontSize: '26px',
   },
   ratings:{
    marginLeft: 30,
    
   },
   iconCover: {
    marginLeft: 10,
    // border: "1px solid",
    // borderRadius: "40%",
    // backgroundColor: "linear-gradient(45deg, #9d50bb 30%, #6e48aa 90%)",
    // boxShadow: '0 3px 5px 2px rgba(255	, 175, 189, .2)'
  },
});
export class ShowComments extends Component {

  render() {
    const { loading, showComments } = this.props;
    const {classes} = this.props;
    console.log(showComments);

    let commentInfo = (
      showComments.map(comment => (
      <Card className={classes.paper}>
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
          <List className={classes.rating}>
                 <ListItem alignItems="flex-start">
                   <ListItemAvatar>
                     if({comment.like === true}){
                   <ThumbUpIcon       
                    fontSize="large"
                    className={classes.iconCover}
                  />}
                  else{
                    <ThumbDownIcon       
                    fontSize="large"
                    className={classes.iconCover}
                  />}
                   </ListItemAvatar>
                   <ListItemText
                     primary={comment.email}
                     secondary={ 
                     <Typography
                        className={classes.inline}
                        variant="p"
                        paragraph
                        gutterBottom
                        
                      >
                        {comment.commentContent}
                      </Typography>}
                         />
                 </ListItem>
                 <Divider variant="inset" component="li" />
           </List>
           </Card>
     
    ))
      );

    // let commentInfo = (
    //   <div>
    //        <h1>{showComments.likes}</h1>
    //   </div>
    // );

    let content = loading ? <Spinner /> : commentInfo;
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
