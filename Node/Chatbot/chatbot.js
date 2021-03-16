"use strict";
const dialogflow = require("dialogflow");
const { func } = require("joi");
const config = require("../config/keys");
const sessionCLient = new dialogflow.SessionsClient();
const sessionPath = sessionCLient.sessionPath(config.googleProjectID, config.dialogFlowSessionID);
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
    return responses;
  },
};
