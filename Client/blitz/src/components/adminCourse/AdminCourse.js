import React from 'react'
import CourseCard from './CourseCard'
import {Grid} from '@material-ui/core';
import useStyles from '../courses/styles';

const AdminCourse = ({courseData}) => {
    const classes = useStyles();
    const displayCourses = courseData.map((course) => {
        return(
                  
        <Grid style={{paddingLeft:"30px"}}>
            <CourseCard course={course}  />
        </Grid>
    )})
    return (
        <div>
            <Grid className={classes.container} style={{paddingBottom:"50px"}} container  spacing={3}  >
            {displayCourses} </Grid>
        </div>
    )
}

export default AdminCourse
