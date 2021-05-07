import React, { Component, useState, useEffect } from 'react';
import { Row } from 'antd';
import PersonInfo from '../components/person/PersonInfo';
import PopularPeople from '../components/person/PopularPeople';
import '../components/person/PopularPeoplePage.css';





const PopularPeoplePage = () => {

    const [Persons, setPersons]=useState([])

    useEffect(() => {

        fetch(`https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setPersons(res.results)
            })

    },[])

    return (
        <div>
        <h1 style={{textAlign: 'center' }}> Popular People </h1>
            <div className="persons">
                    {Persons && Persons.map((person, index) => (
                        
                            <PopularPeople
                                image={person.profile_path ?
                                    `http://image.tmdb.org/t/p/w200/${person.profile_path}`
                                    : null}
                                personId={person.id}
                                personName={person.name}
                                popularity={person.popularity}
                            />
                        
                    ))}
            </div>  

        </div>
    )
}

export default PopularPeoplePage;