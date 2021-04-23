import React, { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux';
import {getCourses} from '../../actions/courses'
import {Container, Grow, Grid, Typography} from '@material-ui/core';
import Courses from '../courses/Courses';
import Search from '../courses/Search';

function CoursesHome (){
    const [currentId, setCurrentId] = useState(null); 
    const [query, setQuery] = useState(''); 
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCourses());
        return () => {
            console.log(dispatch(getCourses()));
        }
    }, [dispatch])
    return (
        <Grow in>
                <Grid >
                   <Courses setCurrentId={setCurrentId} /> 
                </Grid>
    </Grow>
    )
}

export default CoursesHome
