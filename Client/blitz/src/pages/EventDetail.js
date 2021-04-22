import React,{useState,useEffect} from "react";
import {useParams} from "react-router"
import Header from "../components/headers/light";
import Footer from "components/footers/SimpleFooter";
import axios from 'axios';
import Button from '@material-ui/core/Button';

import '../assets/eventcss/event.css'
export default function EventDetail() {
const [event,setEvent] = useState({}); 

const {id}=useParams()
useEffect(() => {
axios.get('http://localhost:5000/event/'+id).then(Response =>{
setEvent(Response.data);
})
},[])

    return (
      <>
    <Header />
<div style={{background: "rgba(60,13,153)"}}>
    <br/>
    <div className="container-fluid">
        <section className="tm-mb-1" id="about">
            <div className="tm-row tm-about-row">
                <div className="tm-section-1-l">
                <img src={event.photo} alt="About image" class="tm-img-responsive"/>

                </div>
                <article className="tm-section-1-r tm-bg-color-8">
                    <h2 className="tm-mb-2 tm-title-color">{event.name}</h2>
                    <p>{event.subject}</p> 
                    <p style={{color:"darkblue"}}>Join us at {event.date?.slice(0,10)} in {event.location}</p>       
                    <Button style={{left: "35%"}} variant="contained" color="secondary"> Join event</Button>
                </article>
            </div>
        </section>
    </div>    
    <Footer />    
</div>

      </>
    );
}

