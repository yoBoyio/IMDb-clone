import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import '../styles/likeDislike.css'
import AuthModal from '../auth/isAuth'
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Axios from 'axios';
import CommentModal from './CommentModal'

export function Like({ auth, like_dislike, movieId }) {
    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DislikeAction, setDislikeAction] = useState(null)

    const config = {
        headers: {
            'Content-type': 'application/json'
        },
        params: { 'movieId': movieId }
    };
    const tokenConfig = () => {
        // Get token from localstorage
        const token = 'bearer ' + auth.token;
        // Headers

        // If token, add to headers
        if (token) {
            config.headers['Authorization'] = token;
        }

        return config;
    };

    useEffect(() => {
        const body = JSON.stringify({ movieId: movieId });

        //How many likes does this movie have 

        Axios.get('/api/rating/get/stats', config)
            .then(response => {
                if (response.status === 200) {
                    let sumLikes = response.data.likes;
                    let sumDislikes = response.data.dislikes;
                    setLikes(sumLikes)
                    setDislikes(sumDislikes)
                } else {
                    alert('Failed to get likes and dislikes')
                }
            })

        // if movie liked by current user and user is logged
        if (auth.isAuthenticated) {
            Axios.get('/api/rating/get/userRating', tokenConfig())
                .then(response => {
                    if (response.status === 200) {
                        if (response.data.like) {
                            setLikeAction('liked')
                        }
                        if (!response.data.like) {
                            setDislikeAction('disliked')
                        }
                    } else {
                        alert('Failed to get likes and dislikes')
                    }
                })
        }

    }, [])

    const onLike = () => {
        const body = JSON.stringify({ movieId: movieId, commentContent: '', like: true });

        if (LikeAction === null) {

            Axios.post('/api/rating/insert', body, tokenConfig())
                .then(response => {
                    if (response.status === 200) {

                        setLikes(Likes + 1)
                        setLikeAction('liked')
                        //If dislike button is already clicked
                        if (DislikeAction !== null) {
                            setDislikeAction(null)
                            setDislikes(Dislikes - 1)
                        }


                    } else {
                        alert('Failed to increase the like')
                    }
                })


        } else {

            Axios.post('/api/rating/delete', body, tokenConfig())
                .then(response => {
                    if (response.status === 200) {

                        setLikes(Likes - 1)
                        setLikeAction(null)

                    } else {
                        alert('Failed to decrease the like')
                    }
                })

        }

    }

    const onDisLike = () => {
        const body = JSON.stringify({ movieId: movieId, commentContent: '', like: false });

        if (DislikeAction !== null) {

            Axios.post('/api/rating/delete', body, tokenConfig())
                .then(response => {
                    if (response.status === 200) {

                        setDislikes(Dislikes - 1)
                        setDislikeAction(null)

                    } else {
                        alert('Failed to decrease dislike')
                    }
                })

        } else {

            Axios.post('/api/rating/insert', body, tokenConfig())
                .then(response => {
                    if (response.status === 200) {

                        setDislikes(Dislikes + 1)
                        setDislikeAction('disliked')

                        //If dislike button is already clicked
                        if (LikeAction !== null) {
                            setLikeAction(null)
                            setLikes(Likes - 1)
                        }

                    } else {
                        alert('Failed to increase dislike')
                    }
                })


        }
    }


    return (

        <div>
            <div className={LikeAction === 'liked' ? 'like_filled' : 'like'} >
                <IconButton
                    onClick={onLike}
                    edge="end"
                    aria-haspopup="true"
                    color="inherit">
                    <ThumbUpAltIcon />
                </IconButton>
                <span style={{ paddingTop: '5px', paddingLeft: '16px', cursor: 'auto' }}>{Likes}</span>
            </div>

            <div className={DislikeAction === 'disliked' ? 'dislike_filled' : 'dislike'} >
                <IconButton
                    edge="end"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={onDisLike}>
                    <ThumbDownIcon />
                </IconButton>
                <span style={{ paddingTop: '5px', paddingLeft: '16px', cursor: 'auto' }}>{Dislikes}</span>
            </div>
        </div>

    )
}
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(Like);