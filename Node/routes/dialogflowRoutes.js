const dialogflow = require("dialogflow");
const config = require("../config/keys");
const sessionCLient = new dialogflow.SessionsClient();
const sessionPath = sessionCLient.sessionPath(config.googleProjectID, config.dialogFlowSessionID);

const chatbot = require("../Chatbot/chatbot");
// The text query request.
module.exports = (app) => {
  app.post("/api/text_query", async (req, res) => {
    let responses;
    if (req.body.eventName != "") responses = await chatbot.eventQuery(req.body, req.body.parameters);
    else responses = await chatbot.textQuery(req.body.metadata.KM_CHAT_CONTEXT._id, req.body.text || req.body.message, req.body.parameters);
    //if (req.body.text) res.send(responses[0].queryResult);
    res.send([{ message: responses[0].queryResult.fulfillmentMessages[0].text.text[0] }]);
  });
  // the event query request
  app.post("/api/event_query", async (req, res) => {
    let responses = await chatbot.eventQuery(req.body.eventName, req.body.parameters);
    res.send(responses[0].queryResult);
  });
};
