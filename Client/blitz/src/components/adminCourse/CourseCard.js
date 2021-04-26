import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
  });
const CourseCard = ({course}) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
        
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
        
          </Card>
    )
}

export default CourseCard
