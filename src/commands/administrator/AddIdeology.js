const patron = require("patron.js");

class AddIdeology extends patron.Command {
  constructor() {
    super({
      names: ["addideology"],
      groupName: "administrators",
      description: "Add an ideology.",
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
    if (await msg.client.db.ideologyRepo.any(msg.guild.id, args.ideology))
      return msg.createErrorReply("there's already an ideology by this name.");

    await msg.client.db.ideologyRepo.insert(msg.guild.id, args.ideology);

    return msg.createReply(`you have successfully created the ideology ${args.ideology.boldify()}.`);
  }
}

module.exports = new AddIdeology();
