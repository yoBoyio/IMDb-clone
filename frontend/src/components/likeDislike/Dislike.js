import React, { useEffect, useState } from "react";
import IconButton from '@material-ui/core/IconButton';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import '../styles/likeDislike.css'

export default function DisLike() {

    return (
        <div className='dislike'>
            <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls='primary-search-account-menu'
                aria-haspopup="true"
                color="inherit">
                <ThumbDownIcon />
            </IconButton>
        </div>
    )
}
