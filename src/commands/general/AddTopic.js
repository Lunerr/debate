const patron = require("patron.js");
const debate = require("../../structures/debate.js");

class AddTopic extends patron.Command {
  constructor() {
    super({
      names: ["addtopic", "createtopic", "adddebate", "createdebate"],
      groupName: "general",
      description: "Add a topic to debate.",
      args: [new patron.Argument({
        name: "topic",
        key: "topic",
        type: "string",
        example: "\"is john gay\"",
        remainder: true
      })]
    });
  }

  async run(msg, args) {
    if (msg.dbGuild.topics.find(x => x.topic.lowerString() === args.topic.lowerString()))
      return msg.createErrorReply("there's already a debate with this topic.");

    const topicIndex = msg.dbGuild.topics.length + 1;

    await msg.client.db.guildRepo.upsertGuild(msg.guild.id, {$push: {topics: new debate(topicIndex, args.topic)}});

    return msg.createReply(`you've successfully created topic ${args.topic.boldify()}.`);
  }
}
module.exports = new AddTopic();
