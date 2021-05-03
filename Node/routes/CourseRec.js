module.exports = (app) => {
  const axios = require("axios");
  const User = require("../models-auth/User");
  const Course = require("../models/course");

  app.get("/courserec", async (req, res) => {
    const UdemyUrl = `https://www.udemy.com/api-2.0/courses/?fields[course]=@default,primary_subcategory,avg_rating&subcategory=`;
    axios.defaults.headers.common["Authorization"] =
      "Basic c2Y5TXgyZWdHeDBwbHVUblBWd3paTGNlMW5XTUVCOTF0MHdDYlNJZTpoazJaaWdxbDVEZENkdkNoNjJrbFI2UGp1SkE3aThUTDF0TldCQkVQcFFIWlVCcVREajZ5dEtFTjNpSEJRYzZ4bnNxMkFPQjZZUjhHRlh0NUs0NmtlZjRIR1dCSWtsckxYbTRuZmlaRmNpQlAyM1RSNUxPUHR5Q0tVUjNNVHcyVw==";
    const userId = req.query.id;
    const user = await User.findById(userId).exec();
    const userCourses = await user.courses;
    let coursesArray = [];
    let categoriesArray = [];
    let course;
    await userCourses.forEach(async (element) => {
      course = await Course.findById(element);
      if (course && categoriesArray.includes(course.category) == false) {
        console.log("DONE");
        categoriesArray.push(course.category);
        try {
          await axios.get(UdemyUrl + course.category).then((response) => {
            coursesArray.push(response.data.results.slice(0, 8));
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
    setTimeout(() => {
      res.send(coursesArray);
    }, 5000);
  });
};
