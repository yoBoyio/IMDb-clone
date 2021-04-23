import { Chip } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Spinner from '../../layout/Spinner';

const useStyles = makeStyles((theme) => ({
    root: {
        color: 'white',
        background: '#9d50bb',
        flexWrap: 'wrap',

    },
    genres_area: {
        position: 'relative',
        marginBottom: '30px',
        bottom: '10px'
    }
}));

const Genres = ({
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    type,
    movieIds
}) => {
    const classes = useStyles();

    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));

    };


    useEffect(() => {

console.log(movieIds);
        return () => {
            setGenres({}); // unmounting
        };
        // eslint-disable-next-line
    }, []);

    return ( false ? <Spinner /> : (
        <div className={classes.genres_area} style={{ padding: "6px 0" }}>
            {/* {selectedGenres.map((genre) => (
                <Chip
                    style={{ margin: 2 }}
                    label={genre.name}
                    key={genre.id}
                    color="primary"
                    clickable
                    size="small"

                />
            ))} */}
            {movieIds.map((genre) => (
                <Chip
                    className={classes.root}
                    style={{ margin: 2 }}
                    label={genre.name}
                    key={genre.id}
                    clickable
                    size="small"
                    onClick={() => handleAdd(genre)}
                />
            ))}
        </div>
    ));
};

export default Genres;