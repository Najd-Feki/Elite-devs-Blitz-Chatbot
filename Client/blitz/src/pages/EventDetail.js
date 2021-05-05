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
    axios.get('https://api.predicthq.com/v1/events/?id='+id, {
      headers: { Authorization: `Bearer B5pmjnvZc_pAMp8-MFtAVKHcldB45VFhitROU_n5` }
    })      .then(function (res) {
        setEvent(res.data.results[0]);
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
                <div className="mapouter">
                	<div className="gmap_canvas">
                    	<iframe width="600" height="500" id="gmap_canvas" src={"https://maps.google.com/maps?q="+event.timezone+"&t=&z=13&ie=UTF8&iwloc=&output=embed"} frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                    </div>
                </div>
                </div>
                <article className="tm-section-1-r tm-bg-color-8">
                    <h2 className="tm-mb-2 tm-title-color">{event.title}</h2>
                    <p></p>
                    <p style={{color:"darkblue"}}>Description : {event.description}</p>
                    <p style={{color:"darkblue"}}>Categorys :  {event.labels}</p>
                    <p style={{color:"darkblue"}}>This event start at : {event.start?.slice(0,10)}</p>
                    <p style={{color:"darkblue"}}>This event end at : {event.start?.slice(0,10)}</p>
                    <p style={{color:"darkblue"}}>Duration : {event.duration}</p>
                    <p style={{color:"darkblue"}}>Location : {event.timezone}</p>
                    <Button style={{left: "35%"}} variant="contained" color="secondary">Notify me</Button>
                </article>
            </div>
        </section>
    </div>
    <Footer />
</div>
      </>

    )
}