import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FileBase from "react-file-base64";
import firebase from "firebase";
import "firebase/storage";
import { keys } from "../../base";
import Button from "@material-ui/core/Button";
import { Backdrop, CircularProgress, Collapse, Icon,IconButton } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const CourseDetails = ({
  courseData,
  setCourseData,
  activeStep,
  handleNext,
  steps,
  classes,
}) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [openfile, setOpenfile] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleClosefile = () => {
    setOpenfile(false);
  };
  const handleTogglefile = () => {
    setOpenfile(!openfile);
  };
  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = keys.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
    setFileName(file.name);
    handleClosefile();
  };
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
            name="title"
            label="Course Title"
            fullWidth
            value={courseData.title}
            onChange={(e) =>
              setCourseData({ ...courseData, title: e.target.value })
            }
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="Field of Study"
            label="Course Field"
            fullWidth
            value={courseData.field}
            onChange={(e) =>
              setCourseData({ ...courseData, field: e.target.value })
            }
            autoComplete={courseData.field}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="Course Description"
            label="Course Description"
            fullWidth
            value={courseData.description}
            onChange={(e) =>
              setCourseData({ ...courseData, description: e.target.value })
            }
            autoComplete="shipping address-line2"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="Course tags"
            label="Course tags"
            fullWidth
            value={courseData.tags}
            onChange={(e) =>
              setCourseData({ ...courseData, tags: e.target.value })
            }
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <div className={classes.fileInput}>
            <FileBase
              type="File"
              multiple={false}
              onDone={({ base64 }) =>
                setCourseData({ ...courseData, selectedFile: base64 })
              }
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <IconButton variant="contained" component="label">
            <Icon>attach_file</Icon>
            <input
              type="file"
              onChange={onFileChange}
              onClick={handleTogglefile}
              hidden
            />
          </IconButton>
          <Backdrop className={classes.backdrop} open={openfile}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <div>
            <Collapse className={classes.root} in={alert}>
              <Alert
                variant="outlined"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {setAlert(false);}}>
                  </IconButton>
                }
              >
                Uploaded {fileName} Successfully
              </Alert>
            </Collapse>
          </div>
          {fileUrl && fileUrl !== '' && (
                                    <div className="relative">
                                        <a href={fileUrl}>
                                            <IconButton aria-label="more">
                                                <Icon>attach_file</Icon>
                                                {fileName}
                                            </IconButton>
                                        </a>
                                    </div>
                                )}
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          className={classes.button}
        >
          {activeStep === steps.length - 1 ? "Place order" : "Next"}
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default CourseDetails;
