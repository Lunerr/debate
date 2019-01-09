const patron = require("patron.js");
const Topic = require("../../structures/Topic.js");

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
    if (msg.dbGuild.topics.some(x => x.topic.toLowerCase() === args.topic.toLowerCase()))
      return msg.createErrorReply("there's already a topic by this name.");

    await msg.client.db.guildRepo.upsertGuild(msg.guild.id, {$push: {topics: new Topic(args.topic)}});

    return msg.createReply(`you've successfully created the topic ${args.topic.boldify()}.`);
  }
}

module.exports = new AddTopic();
