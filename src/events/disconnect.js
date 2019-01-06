const Logger = require("../utility/Logger.js");
const client = require("../singletons/client.js");

client.on("disconnect", () => Logger.log(`${client.user.username} has disconnected.`));
