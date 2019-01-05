const Logger = require("../utility/Logger.js");
const client = require("../structures/Client.js");

client.on("reconnect", () => {
  Logger.log("Attempting to reconnect...", "INFO");
});
