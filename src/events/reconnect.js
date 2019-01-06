const Logger = require("../utility/Logger.js");
const client = require("../singletons/client.js");

client.on("reconnect", () => {
  Logger.log("Attempting to reconnect...", "INFO");
});
