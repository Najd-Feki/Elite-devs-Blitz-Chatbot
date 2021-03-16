const dialogflow = require("dialogflow");
const config = require("../config/keys");
const sessionCLient = new dialogflow.SessionsClient();
const sessionPath = sessionCLient.sessionPath(config.googleProjectID, config.dialogFlowSessionID);

const chatbot = require("../Chatbot/chatbot");
// The text query request.
module.exports = (app) => {
  app.post("/api/text_query", async (req, res) => {
    let responses = await chatbot.textQuery(req.body.text, req.body.parameters);
    res.send(responses[0].queryResult);
  });
  // the event query request
  app.post("/api/event_querry", (req, res) => {
    res.send(chatbot.textQuery(req));
  });
};
