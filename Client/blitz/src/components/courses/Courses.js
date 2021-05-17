import React, { useState, useEffect } from "react";
import Course from "./course/Course";
import useStyles from "./styles.js";
import { Grid, CircularProgress } from "@material-ui/core";
import SearchBar from "material-ui-search-bar";
import { useDispatch } from "react-redux";
import { getCoursesById } from "store/CoursesSlice";
import axios from "axios";
import Pagination from "react-paginate";
import "./style.css";
import { Button } from "antd";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
//import { createScrollMotionValues } from "framer-motion/types/value/scroll/utils";

toast.configure()
const Courses = ({ courses, setUdemy, setCurrentId, auth }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const classes = useStyles();
  const [pageNumber, setPageNumber] = useState(0);
  const coursesPerPage = 3;
  const pagesVisited = pageNumber * coursesPerPage;
  const onChange = (q) => {
    setSearch(q);
  };
  let a = [];
  const [crs, setCrs] = useState([]);

  useEffect(() => {
    async function ll() {
      if (auth.user) {
        let id = auth.user._id;
        await axios.get("http://localhost:5000/course/temp", { params: { id: id, temp: "temp" } }).then((res) => {
          setCrs(res.data);
        });
      }
    }
    setTimeout(() => {
      ll();
    }, 0);
  }, [auth]);
  const handle = (udemy) => {
    axios.put(`http://localhost:5000/enroll/${auth.user._id}`, { udemy: udemy }).then((result) => console.log("Udemy : ", udemy));
    toast.success('You are now enrolled in course : '+udemy.title);
  
  };
  if (search) a = courses;
  else a = crs;
  const displayCourses = a.slice(pagesVisited, pagesVisited + coursesPerPage).map((a) => {
    return (
      <>
        <Grid lg={4} spacing={5} wrap={"nowrap"} style={{ padding: "30px" }}>
          <Course course={a} setCurrentId={setCurrentId} />
          <Button onClick={() => handle(a)} style={{width: "21.4rem",marginTop: "-20px"}}>enroll</Button>
         
        </Grid>
      </>
    );
  });
  useEffect(() => {
    //lena fergha bech ma ya3malch recherche ki tebda input fergha
    return () => {
      dispatch(getCoursesById(search));
    };
  }, [search, dispatch]);

  const pageCount = Math.ceil(courses.length / coursesPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return a.length === 0 ? (
    <>
      <SearchBar type="text"  onClick={(e) => onChange(e)} />
      
      <br />
      <div style={{ position: "absolute", left: "0px", right: "0px", marginLeft: "auto", marginRight: "auto", width: "100px" }}>
        <CircularProgress className={classes.circularLoading} />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <p style={{ textAlign: "center" }}> ask Blitz for a course or type in the search bar </p>
    </>
  ) : (
    <div style={{ paddingTop: "50px", paddingBottom: "10px" }}>
      <SearchBar type="text"  onChange={(e) => onChange(e)} />
      <br></br>
      <br></br>
      <br></br>
      <Grid className={classes.container} style={{ paddingBottom: "50px" }} container spacing={3}>
        {displayCourses}{" "}
      </Grid>

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
  );
};

export default Courses;
