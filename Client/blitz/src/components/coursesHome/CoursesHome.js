import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grow, Grid } from "@material-ui/core";
import { selectcourses, getCourses } from "store/CoursesSlice";
import Courses from "components/courses/Courses";
import Header from "components/headers/light";
import Footer from "components/footers/SimpleFooter";
import axios from 'axios';
import AdminCourse from 'components/adminCourse/AdminCourse';
function CoursesHome (){
   
    const [ setCurrentId] = useState(null); 
    const dispatch = useDispatch();
    const [adminCourse, setAdminCourse] = useState([]);

    const courses= useSelector(selectcourses);
	useEffect(() => {
		dispatch(getCourses());
	}, [dispatch]);
    useEffect(() => {
        axios.get('http://localhost:5000/allcourses').then(function (response) {setAdminCourse(response.data);
        console.log(adminCourse);
    }); 
    },[])
    return (
        <>
        <Header />
        <Grow in>
                <Grid style={{backgroundColor:"rgb(214, 214, 214)" , paddingLeft:"200px",paddingRight:"200px"}}>
                    <Courses courses={courses} setCurrentId={setCurrentId}/>
                    <AdminCourse courseData={adminCourse} />
                </Grid>
    </Grow>
    <Footer />
    </>

  );
}

export default CoursesHome;
