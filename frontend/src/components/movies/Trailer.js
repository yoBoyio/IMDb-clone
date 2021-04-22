import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../../layout/Spinner';
import { fetchTrailer, setLoading } from '../../redux/actions/movieActions';
import ReactPlayer from "react-player";

export class Trailer extends Component {
  // componentDidMount() {
  //   this.props.fetchTrailer(this.props.match.params.id);
  //   this.props.setLoading();
  //   console.log(this.props.match.params.id);
  // }
  render() {
    const { loading, trailer } = this.props;
    const {classes} = this.props;


    let movieInfo = trailer.slice(0,1).map(video => (
      <div>
           <ReactPlayer
            url={"https://www.youtube.com/watch?v=" + video.key}
            width="1200px"
            height="500px"
            controls={true}
          ></ReactPlayer>
      </div>
    ));

    let content = loading ? <Spinner /> : movieInfo;
    return <div>{content}</div>
              
  }
}

const mapStateToProps = state => ({
  loading: state.movie.loading,
  trailer: state.movie.trailer
});

export default connect(
  mapStateToProps,
  { fetchTrailer, setLoading }
)(Trailer);
