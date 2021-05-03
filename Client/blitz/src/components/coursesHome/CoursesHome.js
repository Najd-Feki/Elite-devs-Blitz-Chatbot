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
import { FacebookShareButton, FacebookIcon, LinkedinShareButton,LinkedinIcon } from "react-share"
import CourseRec from "components/recommandation/CourseRec";
//import "antd/dist/antd.css";
function CoursesHome({ auth }) {
  const [setCurrentId] = useState(null);
  const [TriField, setTriField] = useState({
    name: "default",
  });
  const dispatch = useDispatch();
  const [adminCourse, setAdminCourse] = useState([]);
  const courses = useSelector(selectcourses);
  const [id, setId] = useState("id");
  const [data, setData] = useState([]);
  const [courseEnrolled, setcourseEnrolled] = useState();
  const [state, setState] = useState({ visible: false, childrenDrawer: false });
  const [flag, setFlag] = useState(false);
  const [Udemyflag, setUdemyflag] = useState(false);
  const [udemy, setUdemy] = useState();
  const [recSeach,setrecSeach]= useState("");
  const [recData,setrecData]= useState([]);
  const [flagrec,setflagrec]= useState(false);
  const showDrawer = () => {
    setState({
      visible: true,
    });
  };
useEffect(() => {
  start();
}, [auth])
function start() {
  if (auth.user != null) {
    let a =" ";
    console.log(auth);
    axios.get(`http://localhost:5000/userCourses/${auth.user._id}`).then(function (response) {
      setrecSeach(response.data)
      a=a+response.data;
      setflagrec(true)
    });
    
  }}
  useEffect(() => {
   if(flagrec){
    console.log("data lbara : ",recSeach);
    axios.get(`http://localhost:5000/recommandation/${recSeach}`).then(function (response) {
      setrecData(response.data)
    });
   }
  }, [flagrec])
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
    if (TriField.name === "Front End") {
          setAdminCourse(adminCourse.filter(c=>c.field === "Front End"));
    } 
    if (TriField.name === "Back End") {
      setAdminCourse(adminCourse.filter(c => c.field === "Back End"));
    } 
    if (TriField.name === "Soft Skills") {
      setAdminCourse(adminCourse.filter(c => c.field === "Soft Skills"));
    } 
    if (TriField.name === "Hard Skills") {
      setAdminCourse(adminCourse.filter(c => c.field === "Hard Skills"));
    } 
    if(TriField.name === "default"){
    axios.get("http://localhost:5000/allcourses").then(function (response) {
      setAdminCourse(response.data);
      
    });}
    else{console.log("value in tri : ",TriField.name);}
    
  }, [TriField]);

  useEffect(() => {
    if (id !== "id" && id !== undefined) {
      console.log("id in 1 : " + id);
      axios.get(`http://localhost:5000/blitzcourse/${id}`).then(function (response) {
        setData(response.data);
      });
      showDrawer();
    }
  }, [id]);
  const Actionenroll = (data) => {
    setcourseEnrolled(data);
    console.log(data);
    setFlag(true);
  };

  useEffect(() => {
    if (flag) {
      console.log("id course: " + courseEnrolled._id);
      console.log("id user : " + auth.user._id);
      axios.put(`http://localhost:5000/enrollCourse/${auth.user._id}/${courseEnrolled._id}`);
      axios.post("http://localhost:5000/addUdemy", courseEnrolled);
    }
  }, [flag,courseEnrolled]);

  useEffect(() => {
    //
    console.log(udemy);
    setUdemyflag(true);
  }, [udemy]);

  
  // useEffect(() => {
  //   if (Udemyflag) {
  //     axios.put(`http://localhost:5000/enroll/${auth.user._id}`, { udemy: udemy }).then((result) => console.log("UDEMyyyy : ", udemy));
  //   }
  // }, [udemy]);
  return (
    <>
      <Header />

      <Drawer width={800} closable={false} onClose={onClose} visible={state.visible}>
        <h1 style={{ textAlign: "center" }}>{data.title}</h1>
        <br />
        <h2>Course Description</h2>
        <p style={{ marginLeft: "30px" }}>{data.description}</p>
        <h2>Course Field</h2>
        <p style={{ marginLeft: "30px" }}>{data.field}</p>
        <Button onClick={() => Actionenroll(data)} style={{ width: "200px", textAlign: "center", marginLeft: "250px" }}>
          Enroll
        </Button>
        
        <FacebookShareButton
        style={{marginLeft: "70px"}}
         url="blitz.com"
         quote={data.title + data.description}
         hashtag="#blitz #onlineCourses">
         <FacebookIcon logoFillColor="white" />
        </FacebookShareButton>
        <LinkedinShareButton
         url="blitz.com"
         title="mehdi hrairi"
         summary={data.title}>
         <LinkedinIcon logoFillColor="white" />
        </LinkedinShareButton>
      </Drawer>
      <Grow in>
        <Grid
          style={{
            backgroundColor: "rgb(214, 214, 214)",
            paddingLeft: "200px",
            paddingRight: "200px",
          }}
        >
          <br></br>
          <CourseRec recData={recData} />
          <Courses setUdemy={setUdemy} courses={courses} setCurrentId={setCurrentId} auth={auth} />
          <AdminCourse settrifield={setTriField} setcourseEnrolled={setcourseEnrolled} setId={setId} courseData={adminCourse} />
          <br />
          <br />
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
