const patron = require("patron.js");

class Against extends patron.Command {
  constructor() {
    super({
      names: ["against"],
      groupName: "general",
      description: "Go against a topic.",
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
    if (args.topic.against.includes(msg.author.id))
      return msg.createErrorReply("you are already going against this topic.");

    let topic = "";

    if (args.topic.for.includes(msg.author.id)) {
      topic = `topics.${args.topic.index - 1}.for`;
      await msg.client.db.guildRepo.updateGuild(msg.guild.id, {$pull: {[topic]: msg.author.id}});
    }

    topic = `topics.${args.topic.index - 1}.against`;
    await msg.client.db.guildRepo.updateGuild(msg.guild.id, {$push: {[topic]: msg.author.id}});

    return msg.createReply(`you are now against the topic ${args.topic.topic.boldify()}.`);
  }
}
module.exports = new Against();
