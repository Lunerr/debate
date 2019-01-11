const patron = require("patron.js");

class RemoveStatement extends patron.Command {
  constructor() {
    super({
      names: ["removestatement", "deletestatement"],
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
    await msg.client.db.topicRepo.deleteStatement(msg.guild.id, args.topic.name, args.statement);

    return msg.createReply("you have successfully removed this statement.");
  }
}

module.exports = new RemoveStatement();
