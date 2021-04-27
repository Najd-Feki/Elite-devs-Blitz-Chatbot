"use strict";
const dialogflow = require("dialogflow");
const config = require("../config/keys");

const sessionCLient = new dialogflow.SessionsClient();
const sessionPath = sessionCLient.sessionPath(config.googleProjectID, config.dialogFlowSessionID);
const Profile = require("../models/profile");
const User = require("../models-auth/User");
const parser = require("./resumeParser");
const courseController = require("../controllers/course");
const Course = require("../models/course");
const axios = require("axios");
// user attributes list///
var profilePreparation = {
  userId: String,
  fullName: String,
  age: Number,
  phone: String,
  email: String,
  address: String,
  degree: String,
  degreeDomain: String,
  job: String,
  workPlace: String,
  duration: String,
  typeOfExperience: String,
  projectDescription: String,
  urlGithub: String,
  urlLinkedIn: String,
  hardSkills: [""],
  softSkills: [""],
  field: String,
  hobbies: [""],
  languages: [""],
  courses: [""],
};

module.exports = {
  textQuery: async (userid, text, parameters = {}) => {
    let self = module.exports;
    profilePreparation.userId = userid;
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: text,
          languageCode: config.dialogFlowSessionLanguageCode,
        },
      },
      queryParams: {
        payload: {
          data: parameters,
        },
      },
    };
    let responses = await sessionCLient.detectIntent(request);
    responses = await self.handleAction(responses);

    return responses;
  },
  eventQuery: async (body, parameters) => {
    let self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          name: body.eventName,
          languageCode: config.dialogFlowSessionLanguageCode,
        },
      },
      queryParams: {
        payload: {
          data: parameters,
        },
      },
    };

    let responses = await sessionCLient.detectIntent(request);
    if (body.eventName === "KOMMUNICATE_MEDIA_EVENT") {
      self.handleFile(body.metadata.KM_CHAT_CONTEXT.attachments[0].payload.url, true);
    }
    return responses;
  },
  handleAction: function (responses) {
    let self = module.exports;
    let queryResult = responses[0].queryResult;
    let fields = queryResult.parameters.fields;
    let keys = Object.keys(fields);
    if (keys.includes("age")) profilePreparation.age = fields.age.stringValue;
    if (keys.includes("person")) profilePreparation.name = fields.person.structValue.fields.name.stringValue;
    if (keys.includes("email")) profilePreparation.email = fields.email.stringValue;
    if (keys.includes("phone")) profilePreparation.phone = fields.phone.stringValue;
    if (keys.includes("address")) profilePreparation.address = fields.address.stringValue;
    if (keys.includes("degree")) profilePreparation.degree = fields.degree.stringValue;
    if (keys.includes("degreeDomain")) profilePreparation.degreeDomain = fields.degreeDomain.stringValue;
    if (keys.includes("job")) profilePreparation.job = fields.job.stringValue;
    if (keys.includes("workPlace")) profilePreparation.workPlace = fields.workPlace.stringValue;
    if (keys.includes("duration")) {
      profilePreparation.duration =
        fields.duration.structValue.fields.amount.numberValue + " " + fields.duration.structValue.fields.unit.stringValue === "yr"
          ? " years"
          : " months";
    }
    if (keys.includes("typeOfExperience")) profilePreparation.typeOfExperience = fields.typeOfExperience.stringValue;
    if (keys.includes("description")) profilePreparation.projectDescription = fields.description.stringValue;
    if (keys.includes("field")) profilePreparation.field = fields.field.stringValue;
    if (keys.includes("urlGithub")) profilePreparation.urlGithub = fields.urlGithub.stringValue;
    if (keys.includes("urlLinkedIn")) profilePreparation.urlLinkedIn = fields.urlLinkedIn.stringValue;
    if (keys.includes("hardSkills1"))
      fields.hardSkills1.listValue.values.forEach((element) => {
        profilePreparation.hardSkills.push(element.stringValue);
      });
    if (keys.includes("softSkills1"))
      fields.softSkills1.listValue.values.forEach((element) => {
        profilePreparation.softSkills.push(element.stringValue);
      });
    if (keys.includes("hobbies"))
      fields.hobbies.listValue.values.forEach((element) => {
        profilePreparation.hobbies.push(element.stringValue);
      });
    if (keys.includes("language1")) {
      fields.language1.listValue.values.forEach((element) => {
        profilePreparation.languages.push(element.stringValue);
      });
      self.saveUser();
    }
    if (keys.includes("course")) {
      profilePreparation.courses.push(fields.course.stringValue);

      //////////////////////////////
      const UdemyUrl = `https://www.udemy.com/api-2.0/courses/?search=${fields.course.stringValue}`;
      axios.defaults.headers.common["Authorization"] =
        "Basic c2Y5TXgyZWdHeDBwbHVUblBWd3paTGNlMW5XTUVCOTF0MHdDYlNJZTpoazJaaWdxbDVEZENkdkNoNjJrbFI2UGp1SkE3aThUTDF0TldCQkVQcFFIWlVCcVREajZ5dEtFTjNpSEJRYzZ4bnNxMkFPQjZZUjhHRlh0NUs0NmtlZjRIR1dCSWtsckxYbTRuZmlaRmNpQlAyM1RSNUxPUHR5Q0tVUjNNVHcyVw==";
      axios.get(UdemyUrl).then((response) => {
        let newCourse = response.data.results.slice(0, 3);
        this.saveCourseToDb(newCourse);
      });

      ///////////////////////////////
    }
    return responses;
  },
  saveCourseToDb: async function (newCourse) {
    //get the user
    const USER = await User.findById(profilePreparation.userId, async (err, result) => {
      if (result.tempCourses)
        for (var i in result.tempCourses) {
          //delete the search temp courses for the user
          const u = await Course.findByIdAndDelete(result.tempCourses[i].toString(), (err, succ) => {});
          //console.log(result.tempCourses.shift());
        }
    });
    USER.tempCourses = [];

    USER.save();
    //start inserting the new temp courses in DB
    for (var j in newCourse) {
      const c2 = new Course({
        title: newCourse[j].title,
        price: newCourse[j].price,
        url: newCourse[j].url,
        headline: newCourse[j].headline,
        isPaid: newCourse[j].isPaid,
        rating: newCourse[j].rating ? newCourse[j].rating : "",
        visible_instructors: newCourse[j].visible_instructors,
        image_480x270: newCourse[j].image_480x270,
        completionRatio: newCourse[j].completionRatio ? newCourse[j].completionRatio : "",
      });
      try {
        //insert course in courses db
        let c = await c2.save();
        //insert the course id in the user tempcourses attribute
        const user = await User.findByIdAndUpdate(profilePreparation.userId, { $push: { tempCourses: (await c)._id } });
      } catch (err) {
        console.log(err);
      }
    }
  },
  saveUser: async function () {
    const profile = new Profile({
      age: profilePreparation.age,
      phone: profilePreparation.phone,
      email: profilePreparation.email,
      address: profilePreparation.address,
      education: profilePreparation.degree + " in " + profilePreparation.degreeDomain,
      academicProject: profilePreparation.projectDescription,
      softSkills: profilePreparation.softSkills.slice(1, profilePreparation.softSkills.length),
      hardSkills: profilePreparation.hardSkills.slice(1, profilePreparation.hardSkills.length),
      hobbies: profilePreparation.hobbies.slice(1, profilePreparation.hobbies.length),
      languages: profilePreparation.languages.slice(1, profilePreparation.languages.length),
      experiences:
        profilePreparation.typeOfExperience +
        " as a " +
        profilePreparation.job +
        " for " +
        profilePreparation.duration +
        " at " +
        profilePreparation.workPlace,
      courses: profilePreparation.courses.slice(1, profilePreparation.courses.length),
      github: profilePreparation.urlGithub,
      linkedIn: profilePreparation.urlLinkedIn,
    });
    try {
      let pro = await profile.save();
      const user = User.findByIdAndUpdate(profilePreparation.userId, { profile: (await pro)._id }, (err, result) => {
        if (err) console.log(err);
        else console.log(result);
      });
    } catch (err) {
      console.log(err);
    }
  },

  handleFile: function (file, isUri) {
    parser(file, isUri);
  },
};
