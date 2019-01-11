const patron = require("patron.js");

class RemoveIdeology extends patron.Command {
  constructor() {
    super({
      names: ["removeideology"],
      groupName: "administrators",
      description: "Remove an ideology.",
      args: [new patron.Argument({
        name: "ideology",
        key: "ideology",
        type: "ideology",
        example: "Leftism",
        remainder: true
      })]
    });
  }

  async run(msg, args) {
    await msg.client.db.ideologyRepo.delete(msg.guild.id, args.ideology.name);

    return msg.createReply("you have successfully removed this ideology.");
  }
}

module.exports = new RemoveIdeology();
