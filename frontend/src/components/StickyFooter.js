import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
    const classes = useStyles();

    return (
        <Typography className={classes.text} variant="body2" color="textSecondary">
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/yoBoyio/IMDb-clone">
                IeeMDB
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(1, 2),
        marginTop: 'auto',
        backgroundColor: '#2b2b2a',
    },
    text: {
        color: '#fff'

    }
}));

export default function StickyFooter() {
    const classes = useStyles();

    return (

        <footer className={classes.footer}>
            <Container className={classes.text} maxWidth="sm">
                <Copyright />
            </Container>
        </footer>

    );
}