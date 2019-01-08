const patron = require("patron.js");

class RemovePosition extends patron.Command {
  constructor() {
    super({
      names: ["removeposition", "deleteposition", "removestatement", "deletestatement"],
      groupName: "administrators",
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
    const topic = `topics.${msg.dbGuild.topics.indexOf(args.topic)}.statements`;

    await msg.client.db.guildRepo.upsertGuild(msg.guild.id, {$pull: {[topic]: args.statement}});

    return msg.createReply(`you've successfully removed statement ${args.statement.statement.boldify()} from topic ${args.topic.topic.boldify()}.`);
  }
}

module.exports = new RemovePosition();
