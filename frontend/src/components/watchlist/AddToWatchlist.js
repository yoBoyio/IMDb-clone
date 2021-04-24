import React, { useEffect, useState } from "react";
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import '../styles/watchlist.css'
import { connect } from 'react-redux';
import AuthModal from '../auth/isAuth'
import { addWatchlist, deleteWatchlist } from '../../redux/actions/authActions'
import Axios from 'axios';

export function AddToList({ auth, movieId, watchlist, addWatchlist, deleteWatchlist, succes }) {
    const [added, setAdded] = useState(false)
    const [watchlistAction, setWatchlistAction] = useState(null)
    const [watchAction, setWactchAction] = useState(false);

    useEffect(() => {
        //check if movie is on watchlist
        if (watchlist) {

            watchlist.map(movie => {
                if (movieId === movie.id && !watchAction) {
                    setAdded(true);
                }
            })
        }
        // //if watchlist req status=200 and 
        // if(succes){
        //     //if movie was in watchlist delete it
        //     if(added){
        //         setAdded(false);
        //     }else{
        //         setAdded(false);

        //     }
        // }

    })

    const onClick = () => {
        //authenticated user 

        if (auth.isAuthenticated) {
            //doesnt exists on watchlist
            if (!added) {
                addWatchlist(auth.token, movieId);
                setAdded(true);

            } else if (added) {
                deleteWatchlist(auth.token, movieId);
                setAdded(false);
                setWactchAction(true);

            }
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
    watchlist: state.movie.watchlist,
    success: state.movie.watchlistSucces,
});

export default connect(mapStateToProps, { addWatchlist, deleteWatchlist })(AddToList);