"use strict";
const dialogflow = require("dialogflow");
const config = require("../config/keys");
const sessionCLient = new dialogflow.SessionsClient();
const sessionPath = sessionCLient.sessionPath(config.googleProjectID, config.dialogFlowSessionID);
// user attributes list///
var profilePreparation = {
  fullName: String,
  age: Number,
  phone: Number,
  email: String,
  education: String,
  address: String,
  degree: String,
  degreeDomain: String,
  job: String,
  workPlace: String,
  duration: Number,
  typeOfExperience: String,
  projectDescription: String,
  hardSkills: [{ type: String }],
  softSkills: [{ type: String }],
  field: String,
  hobbies: [{ type: String }],
  languages: [{ type: String }],
};
////////
module.exports = {
  textQuery: async (text, parameters = {}) => {
    let self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: text,
          // The language used by the client (en-US)
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
  handleAction: function (responses) {
    let self = module.exports;
    let queryResult = responses[0].queryResult;
    let fields = queryResult.parameters.fields;
    console.log(JSON.stringify(fields));
    console.log("number of keys is : ", Object.keys(fields).length);
    let keys = Object.keys(fields);
    keys.forEach((element) => {
      console.log(element);
    });
    if (keys.includes("age")) profilePreparation.age = fields.age.structValue.fields.amount.numberValue;
    if (keys.includes("person")) profilePreparation.name = fields.person.structValue.fields.name.stringValue;
    if (keys.includes("email")) profilePreparation.email = fields.email.stringValue;
    if (keys.includes("phone")) profilePreparation.phone = fields.phone.stringValue;
    if (keys.includes("address")) profilePreparation.address = fields.address.stringValue;
    if (keys.includes("degree")) profilePreparation.degree = fields.degree.stringValue;
    if (keys.includes("degreeDomain")) profilePreparation.degreeDomain = fields.degreeDomain.stringValue;
    if (keys.includes("job")) profilePreparation.job = fields.job.stringValue;
    if (keys.includes("workPlace")) profilePreparation.workPlace = fields.workPlace.stringValue;
    if (keys.includes("duration")) profilePreparation.duration = fields.duration.stringValue;
    if (keys.includes("typeOfExperience")) profilePreparation.typeOfExperience = fields.typeOfExperience.stringValue;
    if (keys.includes("description")) profilePreparation.projectDescription = fields.description.stringValue;
    if (keys.includes("field")) profilePreparation.field = fields.field.stringValue;
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
      profilePreparation.course = fields.course.stringValue;
      console.log(JSON.stringify(profilePreparation, null, 4));
    }

    let res = self.saveUser();
    return responses;
  },
  saveUser: function () {
    //console.log("name is : " + name + "age is " + age);
  },
};
