import React from 'react';
import "../styles/Row.css";
import { Skeleton } from '@material-ui/lab';

const SkeletonCard = () => {


    return (
        <div
            className='row_posters'>
            <Skeleton animation="wave" className='isLargeRow' variant="rect" width={150} height={250} />
        </div>
    )
}





export default SkeletonCard;