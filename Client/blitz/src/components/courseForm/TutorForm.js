import React from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const TutorForm = ({courseData, setCourseData,activeStep, handleNext,steps,classes}) => {
    return (
        <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Course Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="tutor Name"
              label="tutor Name"
              fullWidth
              value={courseData.tutorName}
              onChange={(e) => setCourseData({...courseData, tutorName : e.target.value})}
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="lastName"
              name="tutor Details"
              label="tutor Details"
              fullWidth
              value={courseData.tutorDetails}
              onChange={(e) => setCourseData({...courseData, tutorDetails : e.target.value})}
              autoComplete={courseData.tutorDetails}
            />
          </Grid>
          <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
        </Grid>
      </React.Fragment>
    )
}

export default TutorForm
