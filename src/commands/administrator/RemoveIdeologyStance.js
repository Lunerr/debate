const patron = require("patron.js");

class RemoveIdeologyStance extends patron.Command {
  constructor() {
    super({
      names: ["removeideologystance", "deleteideologystance"],
      groupName: "administrators",
      description: "Remove an ideological stance.",
      args: [new patron.Argument({
        name: "ideology",
        key: "ideology",
        type: "ideology",
        example: "Conservative"
      }),
      new patron.Argument({
        name: "topic",
        key: "topic",
        type: "topic",
        example: "Socialism",
        remainder: true
      })]
    });
  }

  async run(msg, args) {
    await msg.client.db.ideologyRepo.deleteStance(msg.guild.id, args.ideology.name, args.topic.name);

    return msg.createReply("you have successfully removed this ideological stance.");
  }
}

module.exports = new RemoveIdeologyStance();
