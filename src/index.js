const path = require("path");
const patron = require("patron.js");
const Logger = require("./utility/Logger.js");
const intervalService = require("./services/intervalService.js");

require("dotenv").config();
(async () => {
  require("./extensions");

  const client = require("./structures/Client.js");

  await patron.RequireAll(path.join(__dirname, "events"));
  await intervalService.initiate(client);
  await client.db.connect(process.env.MONGO_DB_URL);
  await client.login(process.env.BOT_TOKEN);
})().catch(e => Logger.handleError(e));
process.on("unhandledRejection", e => Logger.handleError(e));
