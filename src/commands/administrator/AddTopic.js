const patron = require("patron.js");

class AddTopic extends patron.Command {
  constructor() {
    super({
      names: ["addtopic", "createtopic", "adddebate", "createdebate"],
      groupName: "administrators",
      description: "Add a topic to debate.",
      args: [new patron.Argument({
        name: "topic",
        key: "topic",
        type: "string",
        example: "Socialism",
        remainder: true
      })]
    });
  }

  async run(msg, args) {
    if (await msg.client.db.topicRepo.any(msg.guild.id, args.topic))
      return msg.createErrorReply("there's already a topic by this name.");

    await msg.client.db.topicRepo.insert(msg.guild.id, args.topic);

    return msg.createReply(`you have successfully created the topic ${args.topic.boldify()}.`);
  }
}

module.exports = new AddTopic();
