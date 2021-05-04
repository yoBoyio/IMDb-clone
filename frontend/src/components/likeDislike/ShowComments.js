import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../../layout/Spinner';
import { FetchComments, CommentLoading } from '../../redux/actions/authActions';

export class ShowComments extends Component {
  // componentDidMount() {
  //   this.props.fetchTrailer(this.props.match.params.id);
  //   this.props.setLoading();
  //   console.log(this.props.match.params.id);
  // }
  render() {
    const { loading, showComments } = this.props;
    const {classes} = this.props;


    let commentInfo = showComments.map(comment => (
      <div>
           <p>{comment.like}</p>
      </div>
    ));

    let content = loading ? <Spinner /> : commentInfo;
    return <div>{content}</div>
              
  }
}

const mapStateToProps = state => ({
  loading: state.movie.loading,
  showComments: state.movie.showComments
});

export default connect(
  mapStateToProps,
  { FetchComments, CommentLoading }
)(ShowComments);
