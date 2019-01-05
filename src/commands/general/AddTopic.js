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
    if (!msg.member.hasPermission("MANAGE_MESSAGES"))
      return msg.createErrorReply("you must be a mod to use this cmd.");

    if (msg.dbGuild.topics.find(x => x.topic.lowerString() === args.topic.lowerString()))
      return msg.createErrorReply("there's already a debate with this topic.");

    const index = msg.dbGuild.topics.length + 1;

    await msg.client.db.guildRepo.upsertGuild(msg.guild.id, {$push: {topics: new debate(index, args.topic)}});

    return msg.createReply(`you've successfully created the topic ${args.topic.boldify()}.`);
  }
}
module.exports = new AddTopic();
