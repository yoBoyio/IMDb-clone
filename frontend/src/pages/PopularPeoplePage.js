import React, { useState, useEffect } from "react";
import PopularPeople from "../components/person/PopularPeople";
import "../components/styles/PopularPeoplePage.css";
import axios from 'axios'
const PopularPeoplePage = () => {
  const [Persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get(
      `https://api.themoviedb.org/3/person/popular?api_key=2eff1592c2104c03f9098af2aee54824&language=en-US`
    )
      .then((response) => {
        setPersons(response.data.results);
      });
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}> Popular People </h1>
      <div className="persons">
        {Persons &&
          Persons.map((person, index) => (
            <PopularPeople
              image={
                person.profile_path
                  ? `http://image.tmdb.org/t/p/w200/${person.profile_path}`
                  : null
              }
              personId={person.id}
              personName={person.name}
              popularity={person.popularity}
            />
          ))}
      </div>
    </div>
  );
};

export default PopularPeoplePage;
