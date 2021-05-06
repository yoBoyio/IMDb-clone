import React from 'react'
import { unavailable } from './Config';
import './PopularPeople.css'

function PopularPeople(props) {


 return (
            
                 <div className="mediaPP">
                     <a href={`/person/${props.personId}`} >
                       <img className="posterPP" 
                        src={props.image? props.image : unavailable} 
                        alt={props.personName} 
                        />
                    </a>
                    <b className="namePP"> {props.personName}</b>
                    <span className="namePP"> Popularity: {props.popularity} </span>
                      
                      
                 </div>
           
        )
//     }

}

export default PopularPeople

