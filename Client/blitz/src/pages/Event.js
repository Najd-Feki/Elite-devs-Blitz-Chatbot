import React, { useEffect,useState } from "react";
import Header from "../components/headers/light";
import axios from 'axios';
import {Grid, CircularProgress} from '@material-ui/core/';
import EventCard from "pages/EventCard";
import { makeStyles } from '@material-ui/core/styles';
import styled from "styled-components";
const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });
  export default function Event() {
    const classes = useStyles();
    const [events,setEvents] = useState([]); 
useEffect(() => {
    axios.get('http://localhost:5000/event').then(function (response) {setEvents(response.data)
}); 
},[events])


    return (
      <>
    <Header />
    <Grid style={{backgroundColor:'rgba(60,13,153)'}} className={classes.container} container alignItems="stretch" spacing={3}  >
                {events.map((events) => (
                    <Grid item item xs={12} sm={6} md={3}>
                        <EventCard events={events} />
                    </Grid>
                ))}</Grid>
      </>
    );
  }

