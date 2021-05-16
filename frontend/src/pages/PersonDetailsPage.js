import axios from "axios";
import React, { useEffect, useState } from "react";
import PersonInfo from "../components/person/PersonInfo";
import "../components/styles/PersonInfo.css";

const PersonDetailsPage = (props) => {
  const [Person, setPerson] = useState([]);
  const [Credits, setCredits] = useState([]);

  useEffect(() => {
    const personId = props.match.params.personId;

    axios.get(
      `https://api.themoviedb.org/3/person/${personId}?api_key=2eff1592c2104c03f9098af2aee54824&language=en-US`
    )
      .then((response) => {
        setPerson(response.data);
      });

    axios.get(
      `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=2eff1592c2104c03f9098af2aee54824`
    )
      .then((response) => {
        setCredits(response.data.cast);
      });
  }, []);

  return (
    <div>
      <PersonInfo
        image={
          Person.profile_path
            ? `http://image.tmdb.org/t/p/w300/${Person.profile_path}`
            : null
        }
        personName={Person.name}
        personAlias={Person.also_known_as}
        personGender={Person.gender}
        personKnown={Person.known_for_department}
        personBirthday={Person.birthday}
        personBirthPlace={Person.place_of_birth}
        personBio={Person.biography}
        personHomepage={Person.homepage}
        credits={Credits}
      />
    </div>
  );
};

export default PersonDetailsPage;
