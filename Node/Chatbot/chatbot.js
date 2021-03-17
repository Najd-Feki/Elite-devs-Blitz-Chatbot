"use strict";
const dialogflow = require("dialogflow");
const config = require("../config/keys");
const sessionCLient = new dialogflow.SessionsClient();
const sessionPath = sessionCLient.sessionPath(config.googleProjectID, config.dialogFlowSessionID);
// user attributes list///
var name;
var age;
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
    let key = Object.keys(fields)[0];
    if (key == "age") age = fields.age.structValue.fields.amount.numberValue;
    if (key == "person") name = fields.person.structValue.fields.name.stringValue;
    //if (key == "")
    let res = self.saveUser();
    return responses;
  },
  saveUser: function () {
    console.log("name is : " + name + "age is " + age);
  },
};
