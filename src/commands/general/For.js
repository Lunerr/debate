const patron = require("patron.js");

class For extends patron.Command {
  constructor() {
    super({
      names: ["for", "agree"],
      groupName: "general",
      description: "Set yourself to be for a certain idea.",
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
    await msg.client.db.topicRepo.setStance(msg.guild.id, args.topic.name, msg.author.id, "for");

    return msg.createReply(`you are now for ${args.topic.name.boldify()}.`);
  }
}

module.exports = new For();
