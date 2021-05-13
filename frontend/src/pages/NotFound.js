import { Link } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Spinner from "../layout/Spinner";

const useStyles = makeStyles({
    root: {
        background: "#141414",
        margin: "auto",
        height: "600px",
        width: "600px",
        position: "relative",
        borderRadius: "10%",
        padding: 20
    },
    button: {
        background: 'linear-gradient(45deg, #9d50bb 30%, #6e48aa 90%)',
        fontSize: 20,
        height: 50,
        color: '#fff',
        borderRadius: "5px 5px 5px 5px",
        border: "none",
        boxShadow: "none"
    },
    msg: {
        textAlign: "center",
        fontSize: "1.6rem",
        position: "absolute",
        left: "16%",
        top: "45%",
        width: "75%",
        fontFamily: 'Nunito Sans'
    },
    err: {
        textAlign: "center",
        fontSize: "11rem",
        fontFamily: 'Nunito Sans',
        left: "20%",
        top: "8%"

    },
    error: {
        textAlign: "center",
        fontSize: "10rem",
        fontFamily: 'Nunito Sans',
        marginBottom: 30
    },

});
export default function NotFound(loading) {
    const classes = useStyles();
    return (
        loading ? <Spinner/> :
                   <div className={classes.root}>
                   <Typography className={classes.err} >4
                   <HelpOutlineIcon className={classes.error} />4</Typography>
                   <Typography className={classes.msg} >
                      Maybe this page moved? Got deleted? 
                      Is hiding out in quarantine? Never existed in the first place?
                      Let's go 
                          <Link className={classes.button}
                          component="button"
                          to="/">Back to the Homepage</Link> and try from there.
                   </Typography>
                   </div>
                
    );
}