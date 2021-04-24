
import axios from "axios";

const url = "http://localhost:5000/course/udemy";
const uri = "http://localhost:5000/course";


export  const getCourses = () => async (dispatch) => {
   await axios.get(url).then(res => dispatch ({ type: 'FETCH_ALL', payload : res.data }));
    
};

export  const getCoursesById = (search) => async (dispatch) => {
   await axios.get(`${uri}/${search}`).then(res => dispatch ({ type: 'FETCH_ALL', payload : res.data }));
  
};
