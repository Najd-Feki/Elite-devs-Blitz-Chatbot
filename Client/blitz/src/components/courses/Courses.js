import React, { useState, useEffect } from 'react'
import Course from './course/Course';
import {useSelector} from 'react-redux';
import useStyles from './styles.js';
import {Grid, CircularProgress} from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import {useDispatch} from 'react-redux';
import {getCoursesById} from '../../actions/courses';




const Courses = ({ setCurrentId }) => {
    
    const dispatch = useDispatch();
    const [search, setSearch] = useState(''); 
    const courses = useSelector((state) => state.courses);
    const classes = useStyles();
    const onChange = (q) =>{
        setSearch(q);
    } 
    
    useEffect(() => {
       
    
        return () => {
            dispatch(getCoursesById(search));
            console.log('hiiiiiiii');
        }
    }, [search,dispatch])

    return (
        !courses.length ? <CircularProgress className={classes.circularLoading} /> :(
            <>
            <SearchBar type="text" value={search}  onChange={e => onChange(e)}  />
            <Grid className={classes.container} container alignItems="stretch" spacing={3}  >
                {courses.map((course) => (
                    <Grid item item xs={12} sm={6} md={3}>
                        <Course course={course} setCurrentId={setCurrentId} />
                    </Grid>
                ))}</Grid></>
        )
    )
}

export default Courses;
