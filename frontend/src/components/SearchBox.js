import React, { useEffect, useState, Component } from 'react';
import SearchIcon from '@material-ui/icons/Search';


//-----------------SPEECH RECOGNITION SETUP---------------------
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition()
recognition.continous = true
recognition.interimResults = true
recognition.lang = 'en-US'
//-----------------AXIOS----------------------------------------
const axios = require('axios');
//------------------------COMPONENT-----------------------------


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
        return (
            <div>
                <input type="text" id="searchinput" onChange={(e) => this.handleChange(e)} value={this.state.query} />

                <button onClick={this.toggleListen}>Voice</button>
      &nbsp;
                <button type="submit" onClick={() => { this.Search() }} >Search</button>
            </div>



        );
    }
}


export default SearchBox;