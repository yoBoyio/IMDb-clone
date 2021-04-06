import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const MyTextField = withStyles({
    root: {
        // backgroundColor: '#fff',

        "& .MuiFormLabel-root": {
            color: 'white'
        },
        "& .MuiInputBase-root": {
            color: 'white',

        },
        '& input:valid + fieldset': {
            borderColor: 'white',
            borderWidth: 2,
        },
        '& input:invalid + fieldset': {
            borderColor: 'white',
            borderWidth: 2,

        },
        '& input:valid:focus + fieldset': {

            padding: '4px !important',
            borderColor: 'white',

        }, '& input:hover fieldset': {

            borderColor: 'white',

        },

    },
})(TextField);

export const StyledButton = withStyles({
    root: {
        background: 'linear-gradient(45deg, #9d50bb 30%, #6e48aa 90%)',
        boxShadow: '0 3px 5px 2px rgba(255	, 175, 189, .3)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);


export const StyledLink = styled(Link)`
    text-decoration: none;
    color: #9d50bb;
    &:focus, &:visited, &:link, &:active {
        text-decoration: none;
    } &:hover{
        color: #9d50bb;

    }
`;
export default (props) => <StyledLink {...props} />;
