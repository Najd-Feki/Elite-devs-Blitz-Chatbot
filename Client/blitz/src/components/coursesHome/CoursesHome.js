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
import "antd/dist/antd.css";
function CoursesHome() {
  const [setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const [adminCourse, setAdminCourse] = useState([]);
  const courses = useSelector(selectcourses);
  const [id, setId] = useState();
  const [data, setData] = useState();
  const [state, setState] = useState({ visible: false, childrenDrawer: false });
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

  return (
    <>
      <Header />
      <Button type="primary" onClick={showDrawer}>
        Open drawer
      </Button>
      <Drawer title="Multi-level drawer" width={520} closable={false} onClose={onClose} visible={state.visible}></Drawer>
      <Grow in>
        <Grid style={{ backgroundColor: "rgb(214, 214, 214)", paddingLeft: "200px", paddingRight: "200px" }}>
          <Courses courses={courses} setCurrentId={setCurrentId} />
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
