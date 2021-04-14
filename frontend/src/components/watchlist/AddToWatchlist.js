import React, { useEffect, useState } from "react";
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import '../styles/watchlist.css'
import { connect } from 'react-redux';
import AuthModal from '../auth/isAuth'

export function AddToList({ auth }) {
    const body = (
        <div className='watchlist' >
            <IconButton
                edge="end"
                aria-haspopup="true"
                color="inherit">
                <AddIcon />
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
    auth: state.auth
});

export default connect(mapStateToProps, null)(AddToList);