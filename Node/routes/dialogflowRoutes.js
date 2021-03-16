const dialogflow = require("dialogflow");
const config = require("../config/keys");
const sessionCLient = new dialogflow.SessionsClient();
const sessionPath = sessionCLient.sessionPath(config.googleProjectID, config.dialogFlowSessionID);

// The text query request.
module.exports = (app) => {
  app.post("/api/text_query", async (req, res) => {
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: req.body.text,
          // The language used by the client (en-US)
          languageCode: config.dialogFlowSessionLanguageCode,
        },
      },
    };
    let responses = await sessionCLient.detectIntent(request);

    res.send(responses[0].queryResult);
  });
  // the event query request
  app.post("/api/event_querry", (req, res) => {
    res.send({ do: "event query" });
  });
};
