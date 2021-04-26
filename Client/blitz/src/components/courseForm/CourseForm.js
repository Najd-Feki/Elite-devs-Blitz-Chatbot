import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import TutorForm from './TutorForm';
import CourseDetails from './CourseDetails';
import AddCourse from './AddCourse';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  }));
  
  const steps = ['Shipping address', 'Payment details', 'Review your order'];
  
  


export const CourseForm = () => {
    const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
    const [courseData, setCourseData] = useState({
    title : '',
    description : '',
    field : [''],
    tags : [''],
    selectedFile : [''],
    numberOfEnrolls : 0,
    tutorName : '',
    tutorDetails : [''],
    active : 1
    })
    function getStepContent(step) {
        switch (step) {
          case 0:
            return <CourseDetails courseData={courseData} setCourseData={setCourseData} activeStep={activeStep} handleNext={handleNext} steps = {steps} classes={classes} />;
          case 1:
            return <TutorForm courseData={courseData} setCourseData={setCourseData} activeStep={activeStep} handleNext={handleNext} steps = {steps} classes={classes} />;
          case 2:
            return <AddCourse courseData={courseData} />;
          default:
            throw new Error('Unknown step');
        }}
    const handleNext = () => {
        setActiveStep(activeStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep(activeStep - 1);
      };
    return (
        <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            blitz
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            CourseDetails
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Submitted.
                </Typography>
                <Typography variant="subtitle1">
                  Course will be added soon.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                 
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
    )
}
