import React from "react";
import { connect } from "react-redux";

function SearchPage(props) {
  return (
    <div>
      <p>Kazakopolos</p>
    </div>
  );
}

const mapStateToProps = (state) => ({
  movies: state.movie.searchMovies,
});
export default connect(mapStateToProps)(SearchPage);
