import React, { useState, useEffect } from 'react'
import Course from './course/Course';
import useStyles from './styles.js';
import {Grid, CircularProgress} from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import {useDispatch} from 'react-redux';
import { getCoursesById } from 'store/CoursesSlice';

import Pagination from 'react-paginate'
import './style.css';


const Courses = ({ courses, setCurrentId }) => {
    
    const dispatch = useDispatch();
    const [search, setSearch] = useState(''); 
    const classes = useStyles();
    const [pageNumber, setPageNumber] = useState(0);
    const coursesPerPage = 3;
    const pagesVisited = pageNumber * coursesPerPage;
    const onChange = (q) =>{
        setSearch(q);
    } 
    const displayCourses = courses.slice(pagesVisited, pagesVisited + coursesPerPage).map((course) => {
        return(
                  
        <Grid style={{paddingLeft:"30px"}}>
            <Course course={course} setCurrentId={setCurrentId} />
        </Grid>
    )})
    useEffect(() => {
        //lena fergha bech ma ya3malch recherche ki tebda input fergha
        return () => {
            dispatch(getCoursesById(search));
        }
    }, [search,dispatch])
    const pageCount = Math.ceil(courses.length /coursesPerPage)
    const changePage = ({selected}) => {
        setPageNumber(selected)
    }
    return (
        !courses ? <CircularProgress className={classes.circularLoading} /> :(
            <div style={{paddingTop:"50px",paddingBottom:"10px"}}>
            <SearchBar  type="text" value={search}  onChange={e => onChange(e)}  />
            <br></br> 
            <br></br> 
            <br></br> 
            <Grid className={classes.container} style={{paddingBottom:"50px"}} container  spacing={3}  >
            {displayCourses} </Grid>
            
            <Pagination 
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                />
           
            
            </div>
            )
    )
}

export default Courses;
