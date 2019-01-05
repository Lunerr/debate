const client = require("../structures/Client.js");
const Logger = require("../utility/Logger.js");

client.on("error", err => Logger.handleError(err));
