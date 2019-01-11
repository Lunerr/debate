const patron = require("patron.js");
const Constants = require("../../utility/Constants.js");

class Ideologies extends patron.Command {
  constructor() {
    super({
      names: ["ideologies"],
      groupName: "general",
      description: "Lists all the ideologies."
    });
  }

  async run(msg) {
    const topics = await msg.client.db.ideologyRepo.findMany({guildId: msg.guild.id});

    if (topics.length === 0)
      return msg.createErrorReply("no ideologies have been added yet.");

    let descp = `Use \`${Constants.misc.prefix}ideology <name>\` for more information.\n\n`;

    for (let i = 0; i < topics.length; i++)
      descp += `**${i + 1}.** ${topics[i].name}\n\n`;

    await msg.author.tryDM(descp, {title: "Ideologies"});

    return msg.createReply(`you have been DMed with all ${msg.guild.name.boldify()} ideologies.`);
  }
}

module.exports = new Ideologies();
