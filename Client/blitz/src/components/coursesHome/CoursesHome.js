import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grow, Grid } from "@material-ui/core";
import { selectcourses, getCourses } from "store/CoursesSlice";
import Courses from "components/courses/Courses";
import Header from "components/headers/light";
import Footer from "components/footers/SimpleFooter";

import { connect } from "react-redux";
function CoursesHome({ auth }) {
  const [setCurrentId] = useState(null);
  const dispatch = useDispatch();

  const courses = useSelector(selectcourses);
  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);
  return (
    <>
      <Header />
      <Grow in>
        <Grid style={{ backgroundColor: "rgb(214, 214, 214)", paddingLeft: "200px", paddingRight: "200px" }}>
          <Courses courses={courses} setCurrentId={setCurrentId} auth={auth} />
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
