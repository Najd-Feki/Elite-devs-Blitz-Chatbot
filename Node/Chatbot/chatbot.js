"use strict";
const dialogflow = require("dialogflow");
const config = require("../config/keys");

const sessionCLient = new dialogflow.SessionsClient();
const sessionPath = sessionCLient.sessionPath(config.googleProjectID, config.dialogFlowSessionID);
const Profile = require("../models/profile");
const User = require("../models-auth/User");
const parser = require("./resumeParser");
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
      console.log(JSON.stringify(fields.duration.structValue.fields.amount.numberValue + " " + fields.duration.structValue.fields.unit.stringValue));
      profilePreparation.duration =
        fields.duration.structValue.fields.amount.numberValue + " " + fields.duration.structValue.fields.unit.stringValue == "yr"
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
    if (keys.includes("language1"))
      fields.language1.listValue.values.forEach((element) => {
        profilePreparation.languages.push(element.stringValue);
      });
    if (keys.includes("course")) {
      profilePreparation.courses.push(fields.course.stringValue);
      console.log(JSON.stringify(profilePreparation, null, 4));
      self.saveUser();
    }
    return responses;
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
      console.log("profle id is : " + pro._id);
      const user = User.findByIdAndUpdate(profilePreparation.userId, { profile: (await pro)._id }, (err, result) => {
        if (err) console.log(err);
        else console.log(result);
      });
      console.log("user is : ", user);
    } catch (err) {
      console.log(err);
    }
  },

  handleFile: function (file, isUri) {
    parser(file, isUri);
  },
};
