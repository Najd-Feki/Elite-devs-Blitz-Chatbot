import React from "react";

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
    <CardHeader
        title={events.name}
        subheader={events.date?.slice(0,10)}
      />
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={events.photo}
        />

        <CardContent style={{maxHeight:'5em',overflow: 'hidden'}}>
          <Typography variant="body2" color="textSecondary" component="p"  >
            {events.subject}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          join
        </Button>
        
        <Link to={"/eventdetail/"+ events._id}>Learn More</Link>
      </CardActions>
    </Card>
    );
}