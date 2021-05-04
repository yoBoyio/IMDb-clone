import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../../layout/Spinner';
import { FetchComments, CommentLoading } from '../../redux/actions/authActions';

export class ShowComments extends Component {

  render() {
    const { loading, showComments } = this.props;
    const {classes} = this.props;
    console.log(showComments);

    // let commentInfo = showComments.map(comment => (
    //   <div>
    //        <h1>{comment.commentContent}</h1>
    //   </div>
    // ));

    let commentInfo = (
      <div>
           <h1>{showComments.likes}</h1>
      </div>
    );

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
  { FetchComments, CommentLoading }
)(ShowComments);
