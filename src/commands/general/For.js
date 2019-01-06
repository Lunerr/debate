const patron = require("patron.js");

class For extends patron.Command {
  constructor() {
    super({
      names: ["for", "agree"],
      groupName: "general",
      description: "Go for a topic.",
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
    if (args.topic.for.includes(msg.author.id))
      return msg.createErrorReply("you are already going for this topic.");

    let topic = "";

    if (args.topic.against.includes(msg.author.id)) {
      topic = `topics.${args.topic.index - 1}.against`;
      await msg.client.db.guildRepo.updateGuild(msg.guild.id, {$pull: {[topic]: msg.author.id}});
    }

    topic = `topics.${args.topic.index - 1}.for`;
    await msg.client.db.guildRepo.updateGuild(msg.guild.id, {$push: {[topic]: msg.author.id}});

    return msg.createReply(`you are now for the topic ${args.topic.topic.boldify()}.`);
  }
}

module.exports = new For();
