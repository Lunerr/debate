const patron = require("patron.js");

class Against extends patron.Command {
  constructor() {
    super({
      names: ["against", "disagree"],
      groupName: "general",
      description: "Set yourself to be against a certain idea.",
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
    await msg.client.db.topicRepo.setStance(msg.guild.id, args.topic.name, msg.author.id, "against");

    return msg.createReply(`you are now against ${args.topic.name.boldify()}.`);
  }
}

module.exports = new Against();
