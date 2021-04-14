import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { StyledButton } from '../../util/MyTextfield'
import { Link } from 'react-router-dom';
import '../styles/isAuth.css'
const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        width: "30%",
        height: "20%",
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

export default function AuthModal({ children, id }) {
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
                        <div className="AuthModal">
                            <h4 className="txt">
                                You are not logged
                            </h4>
                            <div className='btn1'>
                                <StyledButton
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    component={Link} to="/login"
                                >
                                    Login
                             </StyledButton>
                            </div>
                        </div>

                    </div>
                </Fade>
            </Modal>
        </>
    );
}