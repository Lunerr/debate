const Logger = require("../utility/Logger.js");
const client = require("../structures/Client.js");

client.on("disconnect", () => Logger.log(`${client.user.username} has disconnected.`));
