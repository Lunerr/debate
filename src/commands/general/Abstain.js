const patron = require("patron.js");

class Abstain extends patron.Command {
  constructor() {
    super({
      names: ["abstain"],
      groupName: "general",
      description: "Abstain yourself from a certain idea.",
      args: [new patron.Argument({
        name: "topic",
        key: "topic",
        type: "topic",
        example: "communism",
        remainder: true
      })]
    });
  }

  async run(msg, args) {
    await msg.client.db.topicRepo.removeStance(msg.guild.id, args.topic.name, msg.author.id);

    return msg.createReply(`you have abstained from ${args.topic.name.boldify()}.`);
  }
}

module.exports = new Abstain();
