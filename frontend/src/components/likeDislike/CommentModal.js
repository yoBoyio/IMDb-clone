import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import "../styles/ContentModal.css";
import { Button } from "@material-ui/core";
import { StyledButton } from '../../util/MyTextfield'
import Like from '../likeDislike/Like';
import DisLike from '../likeDislike/Dislike';
import '../styles/likeDislike.css'
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

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

export default function CommentModal({ children }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div
                className="media"
                style={{ cursor: "pointer" }}
                color="inherit"
                onClick={handleOpen}
            >
                {children}
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

                            <div className="commentModal__about">
                                <span className="commentModal__title">
                                    Leave a comment
                                </span>
                                <form className="commentModal__about" noValidate>
                                    <TextareaAutosize className="commentModal__textarea" aria-label="minimum height" rowsMin={5} placeholder="Write here..." />

                                    <div>
                                        <Like />
                                        <DisLike />
                                    </div>

                                    <div className='btn2'>

                                        <StyledButton
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