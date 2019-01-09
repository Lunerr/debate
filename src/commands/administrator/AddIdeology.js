const patron = require("patron.js");
const Ideology = require("../../structures/Ideology.js");

class AddTopic extends patron.Command {
  constructor() {
    super({
      names: ["addtopic", "createtopic", "adddebate", "createdebate"],
      groupName: "administrators",
      description: "Add a topic to debate.",
      args: [new patron.Argument({
        name: "ideology",
        key: "ideology",
        type: "string",
        example: "Leftism",
        remainder: true
      })]
    });
  }

  async run(msg, args) {
    if (msg.dbGuild.ideologies.some(x => x.name.toLowerCase() === args.ideology.toLowerCase()))
      return msg.createErrorReply("there's already an ideology by this name.");

    await msg.client.db.guildRepo.upsertGuild(msg.guild.id, {$push: {ideologies: new Ideology(args.ideology)}});

    return msg.createReply(`you've successfully created the ideology ${args.ideology.boldify()}.`);
  }
}

module.exports = new AddTopic();
