import React, { useEffect, useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Alert from '@material-ui/lab/Alert';
import "../styles/ContentModal.css";
import { Button } from "@material-ui/core";
import { StyledButton } from '../../util/MyTextfield'
import Like from '../likeDislike/Like';
import '../styles/likeDislike.css'
import { connect } from 'react-redux';
import { commentAction } from '../../redux/actions/authActions';
import { clearErrors } from '../../redux/actions/errorActions';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        width: "60%",
        height: "50%",
        backgroundColor: "#141414",
        border: "1px solid #282c34",
        borderRadius: 3,
        color: "white",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 1, 3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

}));

function CommentModal(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState();
    const [comment, setComment] = useState('');
    const [msg, setMsg] = useState(null);

    const handleChangeComment = (e) => setComment(e.target.value);

    const handleToggle = useCallback(() => {
        // Clear errors
        props.clearErrors();
    }, [props.clearErrors]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (comment === '') {
            setMsg("Cant submit a blank comment")
        } else {
            props.commentAction(comment, props.movieId, props.auth.token);

        }

        // Attempt to login
    };
    useEffect(() => {
        // Check for register error
        if (props.error.id === 'COMMENT_FAIL') {
            setMsg(props.error.msg);
            //clear errors after 5 seconds

        } else {
            setMsg(null);
        }
        if (props.Success) {
            handleToggle();
            handleClose();
        }
    }, [props.error, handleToggle, props.Success]);



    return (
        <>
            <div
                className="media"
                style={{ cursor: "pointer" }}
                color="inherit"
                onClick={handleOpen}
            >
                {props.children}
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>

                    <div className={classes.paper}>
                        <div className="commentModal">
                            {msg ? <Alert severity="error"> {msg}</Alert> : null}
                            <div className="commentModal__about">
                                <span className="commentModal__title">
                                    Leave a comment
                                </span>
                                <form className="commentModal__about" onSubmit={handleOnSubmit} noValidate>
                                    <textarea className="commentModal__textarea" aria-label="minimum height"
                                        rowsMin={5} placeholder="Write here..."
                                        onChange={handleChangeComment} autoFocus required
                                    />
                                    <div className='btn2'>
                                        <StyledButton
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                        >
                                            Submit
                                    </StyledButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </Fade>
            </Modal>
        </>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    loading: state.isLoading,
    Success: state.auth.commentSuccess,
    auth: state.auth
});

export default connect(mapStateToProps, { commentAction, clearErrors })(CommentModal);