const axios = require("axios");
const mongoose = require("mongoose");
const CourseMessage = require("../models/courseMessage.js");
const Course = require("../models/course.js");
const request = require("request");
const User = require("../models-auth/User");

const getCourse = async (req, res) => {
  const options = {
    url: "https://www.udemy.com/api-2.0/courses",
    headers: {
      Authorization:
        "Basic c2Y5TXgyZWdHeDBwbHVUblBWd3paTGNlMW5XTUVCOTF0MHdDYlNJZTpoazJaaWdxbDVEZENkdkNoNjJrbFI2UGp1SkE3aThUTDF0TldCQkVQcFFIWlVCcVREajZ5dEtFTjNpSEJRYzZ4bnNxMkFPQjZZUjhHRlh0NUs0NmtlZjRIR1dCSWtsckxYbTRuZmlaRmNpQlAyM1RSNUxPUHR5Q0tVUjNNVHcyVw==",
      json: true,
    },
  };
  const x = request(options, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    const info = JSON.parse(body);
    const data = info.results;
  }).pipe(res);
};

const getCourseDb = async (req, res) => {
  try {
    const courseMessage = await CourseMessage.find();
    res.status(200).json(courseMessage);
  } catch (error) {
    res.status(404).json({ message: error.message() });
  }
};
const getCourseDbById = async (req, res) => {
  try {
    const course = await Course.findById(req.query.id).then((result) => {
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
};
const getTempCourseDb = async (req, res) => {
  try {
    let coursesTable = [];
    const user = await User.findById(req.query.id)
      .then(async (data) => {
        if (data) {
          let tmp;
          console.log("REQ TypE : ", req.query.temp);
          if (req.query.temp == "temp") {
            tmp = data.tempCourses;
            console.log("TEMP ! ");
          } else {
            tmp = data.courses;
            console.log("Course !??? ");
          }
          for (i in tmp)
            Course.findById(tmp[i], (err, data2) => {
              coursesTable.push(data2);
              console.log(data2);
            });
        }
      })
      .then(() => {
        setTimeout(() => {
          res.send(coursesTable.filter((x) => x));
        }, 2000);
      });
  } catch (error) {
    console.log(error);
  }
};

const DeleteCourseDb = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No Course Found with id : ${id} ");

  await CourseMessage.findByIdAndRemove(id);
  res.json({ message: "Post deleted successfully." });
};

const getCourseUdemy = async (req, res) => {
  try {
    const UdemyUrl = `https://www.udemy.com/api-2.0/courses`;
    axios.defaults.headers.common["Authorization"] =
      "Basic c2Y5TXgyZWdHeDBwbHVUblBWd3paTGNlMW5XTUVCOTF0MHdDYlNJZTpoazJaaWdxbDVEZENkdkNoNjJrbFI2UGp1SkE3aThUTDF0TldCQkVQcFFIWlVCcVREajZ5dEtFTjNpSEJRYzZ4bnNxMkFPQjZZUjhHRlh0NUs0NmtlZjRIR1dCSWtsckxYbTRuZmlaRmNpQlAyM1RSNUxPUHR5Q0tVUjNNVHcyVw==";
    await axios.get(UdemyUrl).then((response) => {
      res.send(response.data.results);
    });
    res.end();
  } catch (error) {
    console.log(error);
  }
};

const getCourseUdemyBySearch = (req, res) => {
  try {
    var a = "";
    a = req.params ? req.params.search : req;
    const UdemyUrl = `https://www.udemy.com/api-2.0/courses/?search=${a}`;
    axios.defaults.headers.common["Authorization"] =
      "Basic c2Y5TXgyZWdHeDBwbHVUblBWd3paTGNlMW5XTUVCOTF0MHdDYlNJZTpoazJaaWdxbDVEZENkdkNoNjJrbFI2UGp1SkE3aThUTDF0TldCQkVQcFFIWlVCcVREajZ5dEtFTjNpSEJRYzZ4bnNxMkFPQjZZUjhHRlh0NUs0NmtlZjRIR1dCSWtsckxYbTRuZmlaRmNpQlAyM1RSNUxPUHR5Q0tVUjNNVHcyVw==";
    axios.get(UdemyUrl).then((response) => {
      res.send(response.data.results);
      res.end();
    });
  } catch (error) {
    console.log(error);
  }
};
const setCourseAndDate = async (req, res) => {
  try {
    console.log("bdé user id is :", req.body.userId);
    console.log("bdé course id is :", req.body.courseId);
    User.updateOne(
      { _id: req.body.userId },
      {
        $push: {
          loginDates: {
            loginDate: Date.now(),
            courseId: req.body.courseId,
          },
        },
      }
    )
      .exec()
      .then((result) => {
        console.log("Result is :", result);
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getCourse,
  getCourseDbById,
  getCourseDb,
  getCourseUdemy,
  getCourseUdemyBySearch,
  DeleteCourseDb,
  getTempCourseDb,
  setCourseAndDate,
};
