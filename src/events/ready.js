const Constants = require("../utility/Constants.js");
const Logger = require("../utility/Logger.js");
const client = require("../singletons/client.js");

client.on("ready", () => {
  Logger.log(`${client.user.tag} has successfully connected.`, "INFO");

  return client.user.setActivity(Constants.misc.game);
});
