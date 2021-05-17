import React, { useState } from "react";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });
  export default function EventCard({events}) {
    const classes = useStyles();
    const [eventss,setEventss] = useState([{}]);

  const  join =(()=> {
      var userid = "6081ecb5beba424e903a32ec";
      setEventss(events._id);
      axios.put(`http://localhost:5000/user/modify/${userid}` , eventss);
      console.log("event sent")
  })
return(
 <Card className={classes.root} style={{minHeight:'25em',maxHeight:'25em'}}>
    <CardHeader style={{maxHeight:'8em',minHeight:'8em',color:"rgba(60,13,153)"}}
        title={events.title}
      />
      <CardActionArea style={{minHeight:'12em'}}>
        <CardContent style={{maxHeight:'10em',overflow: 'hidden'}}>
        <p>Location :  {events.timezone}</p>
        <p>This event start at  {events.start?.slice(0,10)}</p>
        <p>Categorys :  {events.category}</p>
        </CardContent>
      </CardActionArea>
      <CardActions className="card-footer" onClick={()=>join()} style={{  display: 'flex',alignItems: 'center', justify: 'space-between', marginTop: "16px"}}>
        <Button size="small" color="primary">
        Notify me
        </Button>
        
        <Link to={"/eventdetail/"+ events.id}>Learn More</Link>
      </CardActions>
    </Card> 
    );
}