import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";
const url = "http://localhost:5000/courses";

export const getCourses = createAsyncThunk("courses", async () => {
  const { data } = await axios.get(url);

  return data;
});
export const getCoursesById = createAsyncThunk("search", async (_data, { dispatch, getState }) => {
  const { data } = await axios.get(`http://localhost:5000/courses/${_data}`);
  return data;
});

export const getCourseById = createAsyncThunk("search", async (_data, { dispatch, getState }) => {
  const { data } = await axios.get(`http://localhost:5000/blitzcourse/${_data}`);
  return data;
});
export const sortbyfield = createAsyncThunk('Course/sortbyfield', async () => {
  const { data } = await axios.get('http://localhost:5000/blitzcourse/field');

  return data;
});

const coursesAdapter = createEntityAdapter({
  selectId: (courses) => courses.id,
});

const coursesSlice = createSlice({
  name: "Courses",
  initialState: coursesAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [getCourses.fulfilled]: coursesAdapter.setAll,
    [getCoursesById.fulfilled]: coursesAdapter.setAll,
    [sortbyfield.fulfilled]: coursesAdapter.setAll,

  },
});

export const { selectAll: selectcourses } = coursesAdapter.getSelectors((state) => state.courses);

export default coursesSlice.reducer;
