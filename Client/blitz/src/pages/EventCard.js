import React, { useEffect } from "react";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import EventDetail from 'pages/EventDetail'
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
return(
 <Card className={classes.root} style={{minHeight:'25em',maxHeight:'25em'}}>
    <CardHeader style={{maxHeight:'8em',minHeight:'8em',color:"rgba(60,13,153)"}}
        title={events.title}
      />
      <CardActionArea style={{minHeight:'12em'}}>
        <CardContent style={{maxHeight:'10em',overflow: 'hidden'}}>
        <p>Location :  {events.timezone}</p>
        <p>This event start at  {events.start?.slice(0,10)}</p>
        <p>Categorys :  {events.labels}</p>
        </CardContent>
      </CardActionArea>
      <CardActions className="card-footer" style={{  display: 'flex',alignItems: 'center', justify: 'space-between', marginTop: "16px"}}>
        <Button size="small" color="primary">
        Notify me
        </Button>
        
        <Link to={"/eventdetail/"+ events.id}>Learn More</Link>
      </CardActions>
    </Card> 
    );
}