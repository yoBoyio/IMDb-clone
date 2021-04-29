import React, { Component, } from 'react';
import "../styles/Row.css";

import { Skeleton } from '@material-ui/lab';
import { Box } from '@material-ui/core'


const SkeletonCard = ({ isLargeRow }) => {


    return (
        <div
            className='row_posters'>
            <Skeleton animation="wave" className='isLargeRow' variant="rect" width={150} height={250} />
        </div>
    )
}





export default SkeletonCard;