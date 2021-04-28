import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
//import { createScrollMotionValues } from "framer-motion/types/value/scroll/utils";
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});
const Course = ({ course }) => {
  const classes = useStyles();
  console.log("course in course : ", course);
  const openInNewTab = (c) => {
    const newWindow = window.open("https://www.udemy.com" + c, "_blank", "noopener,noreferrer");
    console.log(c.url);
    if (newWindow) newWindow.opener = null;
  };
  
  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => openInNewTab(`${course?.url}`)}>
        <CardMedia component="img" alt="Contemplative Reptile" height="100" image={course?.image_480x270} title={course?.title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {course?.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {course?.headline}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Course;
