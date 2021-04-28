import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grow, Grid } from "@material-ui/core";
import { selectcourses, getCourses } from "store/CoursesSlice";
import Courses from "components/courses/Courses";
import Header from "components/headers/light";
import Footer from "components/footers/SimpleFooter";
import axios from "axios";
import AdminCourse from "components/adminCourse/AdminCourse";
import { Drawer, Button } from "antd";
import { connect } from "react-redux";
//import "antd/dist/antd.css";
function CoursesHome({ auth }) {
  const [setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const [adminCourse, setAdminCourse] = useState([]);
  const courses = useSelector(selectcourses);
  const [id, setId] = useState();
  const [data, setData] = useState([]);
  const [courseEnrolled, setcourseEnrolled] = useState();
  const [state, setState] = useState({ visible: false, childrenDrawer: false });
  const [flag,setFlag] = useState(false);
  const showDrawer = () => {
    setState({
      visible: true,
    });
  };

  const onClose = () => {
    setState({
      visible: false,
    });
  };

  useEffect(() => {
    dispatch(getCourses());
    require("antd/dist/antd.css");
    return () => {
      window.location.reload();
    };
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/allcourses").then(function (response) {
      setAdminCourse(response.data);
    });
  }, []);

  useEffect(() => {
    console.log("id in 1 : " + id);
    axios.get(`http://localhost:5000/blitzcourse/${id}`).then(function (response) {
      setData(response.data);
    });
    showDrawer();
  }, [id]);
const Actionenroll =(data) =>{
 setcourseEnrolled(data);
 console.log(data);
 setFlag(true);
}
useEffect(() => {
  if(flag){
    console.log("id course: "+courseEnrolled._id);
    console.log("id user : "+ auth.user._id);
    axios.put(`http://localhost:5000/enroll/${auth.user._id }/${courseEnrolled._id}`); } 
    console.log(courseEnrolled);  
},[flag])
  return (
    <>
      <Header />
     
      <Drawer  
      width={520} 
      closable={false} 
      onClose={onClose} 
      visible={state.visible}
      >
          <h1>{data.title}</h1>
          <h2>description</h2>
          <p>{data.description}</p>
          <Button onClick={() =>Actionenroll(data)} >Enroll</Button>
      </Drawer>
      <Grow in>
        <Grid style={{ backgroundColor: "rgb(214, 214, 214)", paddingLeft: "200px", paddingRight: "200px" }}>
          <br></br>
          <Courses courses={courses} setCurrentId={setCurrentId} auth={auth} />
          <AdminCourse setId={setId} courseData={adminCourse} />
        </Grid>
      </Grow>
      <Footer />
    </>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(CoursesHome);