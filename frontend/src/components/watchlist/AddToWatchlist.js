import React, { useEffect, useState } from "react";
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import '../styles/watchlist.css'
import { connect } from 'react-redux';
import AuthModal from '../auth/isAuth'
import { addWatchlist, deleteWatchlist } from '../../redux/actions/movieActions'
import Axios from 'axios';

export function AddToList({ auth, movieId, watchlist, addWatchlist }) {
    const [added, addToWatchlist] = useState(null)
    const [watchlistAction, setWatchlistAction] = useState(null)

    const tokenConfig = () => {
        // Get token from localstorage
        const token = 'bearer ' + auth.token;
        // Headers
        const config = {
            headers: {
                'Content-type': 'application/json'
            },
            params: { 'movieId': movieId }
        };

        // If token, add to headers
        if (token) {
            config.headers['Authorization'] = token;
        }

        return config;
    };
    useEffect(() => {
        //check if movie is on watchlist
        if (watchlist) {
            watchlist.map(movie => {
                if (movieId === movie.id) {
                    addToWatchlist(true);
                }
            })
        }
    })

    const onClick = () => {
        const body = JSON.stringify({ movieId: movieId });
        //axios request
        if (added === null) {
            addWatchlist(movieId);
            addToWatchlist(true);
            // Axios.post('/api/users/watchlist/Add', body, tokenConfig())
            //     .then(response => {
            //         if (response.status === 200) {

            //             addToWatchlist(true)
            //         } else {
            //             alert('Failed to add movie on watchlist')
            //         }
            //     })
        } else {

            // Axios.post('/api/rating/delete', body, tokenConfig())
            //     .then(response => {
            //         if (response.status === 200) {

            //             setLikes(Likes - 1)
            //             setLikeAction(null)

            //         } else {
            //             alert('Failed to decrease the like')
            //         }
            //     })

        }

    }

    const icon = (added ? (<RemoveIcon />) : (<AddIcon />))

    const body = (
        <div className='watchlist' >
            <IconButton
                edge="end"
                aria-haspopup="true"
                color="inherit"
                onClick={onClick}>
                {icon}
            </IconButton>
        </div>
    )
    const status = (auth && auth.isAuthenticated ? (
        body
    ) : (
        <AuthModal > {body} </AuthModal>
    ))
    return (
        <div>
            {status}
        </div>
    )
}
const mapStateToProps = state => ({
    auth: state.auth,
    watchlist: state.movie.watchlist
});

export default connect(mapStateToProps, { addWatchlist, deleteWatchlist })(AddToList);