import React, { useEffect,useState } from "react";
import Header from "../components/headers/light";
import axios from 'axios';
import Footer from "components/footers/SimpleFooter";
import {Grid} from '@material-ui/core/';
import EventCard from "pages/EventCard";
import { makeStyles } from '@material-ui/core/styles';
import _ from "lodash";
const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });
  const pageSize =8;
  export default function Event() {
    const classes = useStyles();
    const [events,setEvents] = useState([{}]);
    const [pagination,setPagination] = useState([{}]); 
    const [currentPage ,setcurrentPage] = useState(1);

    // const [news,setNews] = useState([]);
// useEffect(() => {
//     axios.get('http://localhost:5000/event').then(function (response) {setEvents(response.data)
// }); 
// },[])

  useEffect(() => {
    axios.get('https://api.predicthq.com/v1/events/?limit=100&state=active&category=conferences', {
      headers: { Authorization: `Bearer B5pmjnvZc_pAMp8-MFtAVKHcldB45VFhitROU_n5` }
    })
      .then(function (res) {
        setEvents(res.data.results);
        setcurrentPage(1);
        const startIndex =(1 )* pageSize;
        const pagination = _(res.data.results).slice(startIndex).take(pageSize).value();
        setPagination(pagination)
      })
      .catch(error => {
        console.log(error);
      });
  },[])
const filterindata = (events, searchTerm)=> {
  const resultat = events.filter(
    (x) =>
      x.title.toLowerCase().includes(searchTerm.toLowerCase()) 
  );
  setEvents(resultat);
  setcurrentPage(1);
  const pagination = _(resultat).slice(0).take(pageSize).value();
  setPagination(pagination)
}
const handleTextSearch = (e) => {
  const searchTerm = e.currentTarget.value;
  axios.get('https://api.predicthq.com/v1/events/?limit=100&state=active&category=conferences', {
    headers: { Authorization: `Bearer B5pmjnvZc_pAMp8-MFtAVKHcldB45VFhitROU_n5` }
  }).then((res) => {
    if (res.data.results) {
      filterindata(res.data.results, searchTerm);
    }
  });
};
const pageCount = events? Math.ceil(events.length/pageSize):0;
const pages =_.range(1,pageCount+1 )
const pagess =(pageNo)=>{
  setcurrentPage(pageNo);
  const startIndex =(pageNo - 1 )* pageSize;
  const pagination = _(events).slice(startIndex).take(pageSize).value();
  setPagination(pagination)
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
                {pagination.map((events,index) => (
                    <Grid item item xs={12} sm={6} md={3}>
                            <br/>
                        <EventCard key={index} events={events} />
                            <br/>
                    </Grid>
                ))}</Grid>
    <nav  className='d-flex justify-content-center'>
      <ul className="pagination">
        {
          pages.map((page)=> (
            <li className={
              page== currentPage ? "page-item active" : "page-item"
            }>
              <p className="page-link"
              onClick={()=> pagess(page)}>{page}</p> 
            </li>
          )) 
        }
      
      </ul>
    </nav>
    <Footer />    
      </>
    );
  }

