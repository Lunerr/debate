const patron = require("patron.js");

class RemovePosition extends patron.Command {
  constructor() {
    super({
      names: ["removeposition", "deleteposition", "removestatement", "deletestatement"],
      groupName: "general",
      description: "Remove a position to a topic.",
      args: [new patron.Argument({
        name: "topic",
        key: "topic",
        type: "topic",
        example: "communism"
      }),
      new patron.Argument({
        name: "statement",
        key: "statement",
        type: "statement",
        example: "a statement.",
        remainder: true
      })]
    });
  }

  async run(msg, args) {
    if (!msg.member.hasPermission("MANAGE_MESSAGES"))
      return msg.createErrorReply("you must be a mod to use this cmd.");

    const topic = `topics.${args.topic.index - 1}.statements`;

    await msg.client.db.guildRepo.upsertGuild(msg.guild.id, {$pull: {[topic]: args.statement}});

    return msg.createReply(`you've successfully removed statement ${args.statement.statement.boldify()} from topic ${args.topic.topic.boldify()}.`);
  }
}
module.exports = new RemovePosition();
