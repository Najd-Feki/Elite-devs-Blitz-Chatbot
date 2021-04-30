import React, { useEffect,useState } from "react";
import Header from "../components/headers/light";
import axios from 'axios';
import Footer from "components/footers/SimpleFooter";
import {Grid, CircularProgress} from '@material-ui/core/';
import EventCard from "pages/EventCard";
import { makeStyles } from '@material-ui/core/styles';
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
},[])

const filterindata = (events, searchTerm)=> {
  const resultat = events.filter(
    (x) =>
      x.name.toLowerCase().includes(searchTerm) 
  );
  setEvents(resultat);
}
const handleTextSearch = (e) => {
  const searchTerm = e.currentTarget.value;
  axios.get('http://localhost:5000/event').then((res) => {
    if (res.data) {
      filterindata(res.data, searchTerm);
    }
  });
};
    return (
      <>
    <Header />
    <section className='search' >
            <form >
            <input
              className="form-control"
              type="search"
              placeholder="Search event"
              name="searchTerm"
              onChange={handleTextSearch}
              style={{marginLeft:"40%",width:"20%",marginBottom:"30px", "border-radius":"20px",backgroundColor:"rgba(60,13,153)"}}
            />
            </form>
        </section>
    <Grid style={{backgroundColor:'rgba(60,13,153)'}} className={classes.container} container alignItems="stretch" spacing={3}  >
                {events.map((events) => (
                    <Grid item item xs={12} sm={6} md={3}>
                            <br/>
                        <EventCard events={events} />
                        <br/>
                    </Grid>
                ))}</Grid>
    <Footer />    
      </>
    );
  }

