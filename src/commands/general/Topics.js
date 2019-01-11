const patron = require("patron.js");
const Constants = require("../../utility/Constants.js");

class Topics extends patron.Command {
  constructor() {
    super({
      names: ["topics", "debates"],
      groupName: "general",
      description: "Lists all the debate topics."
    });
  }

  async run(msg) {
    const topics = await msg.client.db.topicRepo.findMany({guildId: msg.guild.id});

    if (topics.length === 0)
      return msg.createErrorReply("no topics have been added yet.");

    let descp = `Use \`${Constants.misc.prefix}topic <name>\` for more information.\n\n`;

    for (let i = 0; i < topics.length; i++)
      descp += `**${i + 1}.** ${topics[i].name}\n\n`;

    await msg.author.tryDM(descp, {title: "Debate Topics"});

    return msg.createReply(`you have been DMed with all ${msg.guild.name.boldify()} topics.`);
  }
}

module.exports = new Topics();
