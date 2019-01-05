const patron = require("patron.js");
const PromiseUtil = require("../../utility/PromiseUtil.js");

class Topics extends patron.Command {
  constructor() {
    super({
      names: ["topics", "debates"],
      groupName: "general",
      description: "Finds all topics in server."
    });
  }

  async run(msg) {
    const topics = msg.dbGuild.topics.sort((a, b) => b.index - a.index);
    let message = "";

    if (topics.length <= 0)
      return msg.createErrorReply("there's currently no active topics in this server.");

    for (let i = 0; i < topics.length; i++) {
      message += `**${topics[i].index}.** ${topics[i].topic}\n\n`;  

      if (i === 20) {
        await msg.author.tryDM(message, {title: "Debate Topics"});
        await PromiseUtil.delay(2000);
        message = "";
      }
    }

    await msg.author.tryDM(message, {title: "Debate Topics"});

    return msg.createReply(`you have been DMed with all ${msg.guild.name} topics.`);
  }
}
module.exports = new Topics();
