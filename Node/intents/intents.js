//Costumizable intents goes here
function welcome(agent) {
  agent.add("");
}

function defaultFallback(agent) {
  agent.add("");
}

module.exports = { welcome: welcome, defaultFallback: defaultFallback };
