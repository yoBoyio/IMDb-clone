
import React, { useState } from "react";
import Alert from '@material-ui/lab/Alert';
import "../styles/ContentModal.css";
import { StyledButton } from '../../util/MyTextfield'
import '../styles/likeDislike.css'
import { connect } from 'react-redux';
import { commentAction } from '../../redux/actions/authActions';
import { clearErrors } from '../../redux/actions/errorActions';
//material UI
import { makeStyles } from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
    modal: {
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        width: 500,
        height: 300,
        backgroundColor: "#141414",
        border: "1px solid #282c34",
        borderRadius: 3,
        color: "white",
        boxShadow: theme.shadows[5],
        marginLeft: 40,
        marginTop: 120,
        maxWidth: 600
    },
    comment: {
        fontWeight: "Bold",
        fontSize: "32px",
        marginTop: "10px",
    },
    barCover: {
        height: 10,
        borderRadius: 5,
        width: 80,
        background: "linear-gradient(45deg, #9d50bb 30%, #6e48aa 90%)",
    },


}));

function MakeComment(props) {
    const classes = useStyles();
    const [comment, setComment] = useState('');
    const [msg, setMsg] = useState(null);



    const handleChangeComment = (e) => setComment(e.target.value);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (comment === '') {
            setMsg("Cant submit a blank comment")
        } else {
            props.commentAction(comment, props.movieId, props.like);
            setMsg(`Comment submited by ${props.auth.user.UserName}`)
            setComment('');
        }

    };



    return (
        <>
            <div className={classes.modal}>

                <div className={classes.paper}>
                    <div className="commentModal">
                        {msg ? <Alert severity="info"> {msg}</Alert> : null}
                        <div className="commentModal__about">
                            <h3>
                                Leave a comment
                                </h3>
                            <form className="commentModal__about" onSubmit={handleOnSubmit} noValidate>
                                <textarea className="commentModal__textarea" aria-label="minimum height"
                                    rowsMin={3} placeholder="Write here..."
                                    value={comment}
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
            </div>
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

export default connect(mapStateToProps, { commentAction, clearErrors })(MakeComment);