import React,{useState,useEffect} from 'react'
import {Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import { DragHandle } from '@material-ui/icons';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
  });
const AdminCourse = ({setId, courseData}) => {
    const classes = useStyles();
  
    const action =(a)=>{ 
        setId(a);
        console.log("ide fel 2 : "+ a);
    }
    const displayCourses = courseData
    .map((course) => {
      return (
        <Grid style={{ paddingLeft: "30px" }}>
           <Card className={classes.root}>
          <CardActionArea  onClick={()=>action(course._id)} >
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="100"
            image={course.selectedFile}
            title={course.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {course.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {course.description}
            </Typography>
          </CardContent>
          </CardActionArea>
          </Card>
        </Grid>
      );
    });
     return (
       
            <Grid className={classes.container} style={{paddingBottom:"50px"}} container  spacing={3}  >
           {displayCourses}
             </Grid>
        
    );

}

export default AdminCourse
