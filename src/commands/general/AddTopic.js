const patron = require("patron.js");
const Debate = require("../../structures/debate.js");

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

    if (msg.dbGuild.topics.find(x => x.topic.toLowerCase() === args.topic.toLowerCase()))
      return msg.createErrorReply("there's already a debate with this topic.");

    await msg.client.db.guildRepo.upsertGuild(msg.guild.id, {$push: {topics: new Debate(args.topic)}});

    return msg.createReply(`you've successfully created the topic ${args.topic.boldify()}.`);
  }
}

module.exports = new AddTopic();
