import React, { useEffect, useState, Component } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { InputBase } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import MicIcon from '@material-ui/icons/Mic';
import { IconButton } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';

//-----------------SPEECH RECOGNITION SETUP---------------------
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition()
recognition.continous = true
recognition.interimResults = true
recognition.lang = 'en-US'
//-----------------AXIOS----------------------------------------
const axios = require('axios');
//------------------------COMPONENT-----------------------------


const styles = {
    search: {
        position: 'relative',
        borderRadius: '4px',
        backgroundColor: '#fff',
        '&:hover': {
            backgroundColor: '#fff'
        },
        marginLeft: '10px',
        width: '20%',
        height: '35px',
        display: 'flex'
    },
    searchIcon: {
        padding: '0px 2px',
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'dark',
    },
    inputInput: {
        padding: '1px 1px 1px 0px',
        // vertical padding + font size from searchIcon
        paddingLeft: '30px',
        transition: 'width',
        width: '100%',

    }
};

class SearchBox extends Component {



    constructor() {
        super()
        this.state = {
            listening: false,
            query: ""
        }
        this.toggleListen = this.toggleListen.bind(this);
        this.handleListen = this.handleListen.bind(this);
    }

    toggleListen() {
        this.handleListen()
    }

    handleListen() {
        if (!recognition.listening) {
            recognition.start()
            recognition.onresult = event => {
                let interimTranscript = '';
                var finalTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) finalTranscript += transcript + ' ';
                    else interimTranscript += transcript;
                }
                this.setState({ query: finalTranscript });
            }
        } else {
            recognition.end()
        }
    }

    Search() {
        axios.get('api/movieshowcase/search?query=' + this.state.query)
            .then((response) => {
                console.log(response.data);
            }).catch((error) => {

            });
    }

    handleChange(event) {
        this.setState({ query: event.target.value });
    }


    render() {
        const { classes } = this.props;

        return (
            <div className={classes.search}>

                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.query}
                    onKeyPress={event => {
                        if (event.key === 'Enter')
                            this.Search()
                    }}
                />

                <IconButton onClick={this.toggleListen}>
                    <MicIcon />
                </IconButton>
            </div>



        );
    }
}


export default withStyles(styles)(SearchBox);