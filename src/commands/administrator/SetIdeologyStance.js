const patron = require("patron.js");

class SetIdeologyStance extends patron.Command {
  constructor() {
    super({
      names: ["setideologystance", "addideologystance"],
      groupName: "administrators",
      description: "Set an ideological stance.",
      args: [new patron.Argument({
        name: "ideology",
        key: "ideology",
        type: "ideology",
        example: "Conservative"
      }),
      new patron.Argument({
        name: "for/against",
        key: "stance",
        type: "stance",
        example: "for"
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
    await msg.client.db.ideologyRepo.setStance(msg.guild.id, args.ideology.name, args.topic.name, args.stance);

    return msg.createReply("you have successfully set this ideological stance.");
  }
}

module.exports = new SetIdeologyStance();
