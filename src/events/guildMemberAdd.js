const client = require("../singletons/client.js");
const Constants = require("../utility/Constants.js");

client.on("guildMemberAdd", async member => {
  await member.tryDM(Constants.messages.info);
});
