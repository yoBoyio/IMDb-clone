import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import '../styles/likeDislike.css'
import AuthModal from '../auth/isAuth'

export function Like({ auth }) {

    return (

        <div className='like' >
            <IconButton
                edge="end"
                aria-haspopup="true"
                color="inherit">
                <ThumbUpAltIcon />
            </IconButton>
        </div>

    )
}
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(Like);