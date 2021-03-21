import React, { useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getMovies, deleteMovie } from '../actions/getMovies';

const MovieList = ({
    getMovies,
  movie,
  isAuthenticated,
  deleteMovie
}) => {
  useEffect(() => {
    getMovies();
  }, [getMovies]);

  const handleDelete = (id) => {
    deleteMovie(id);
  };

  const { movies } = movie;
  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {movie.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                {isAuthenticated ? (
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => handleDelete(_id)}
                  >
                    &times;
                  </Button>
                ) : null}
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  movies: state.movies,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getMovies, deleteItem })(ShoppingList);