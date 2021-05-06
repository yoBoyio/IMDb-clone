import React, { Component, useState } from 'react';
import ModalImg from './ModalImg';
import FilmTable from './FilmTable'
import './PersonInfo.css';

const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };

    return (
        <p className="text">
          {text}
          <span onClick={toggleReadMore} className="read-or-hide">
            {isReadMore ? "...read more" : " show less"}
          </span>
        </p>
      );
    };

const PersonInfo = (props) => {

   

    return (
        
        <div className="wrapper">
            
             
             <div className="profile_image"> 
                <ModalImg>  <img src={`${props.image}`} alt="enlarged pic" /> </ModalImg> 
                <span className="infoPI"> 
                <div > <p></p> <h4> Personal Info</h4> <b> Known For </b> <p> {props.personKnown} </p> </div> 
                <div > <b> Birthday </b> <p> {props.personBirthday} (Age) </p>    </div>
                <div> <b> Place of Birth </b> <p> {props.personBirthPlace} </p> </div>
                <div> 
                    <b>Also Known As</b>
                        {props.personAlias && props.personAlias.map((person, index) => ( 
                            <p> {props.personAlias[index]} </p> 
                        ))}
            </div>
            </span>
            </div>
           <div className="bio"> 
            <h2 className="namePI" >{props.personName} </h2> 
            <p> </p> 
            <h4> Biography </h4> 
            <ReadMore> <p>  {props.personBio}  
            </p> </ReadMore> 
            <p> </p>  
           </div>

            {/* <div > {props.personHomepage} </div> */}
            

        </div>
    )
}

export default PersonInfo