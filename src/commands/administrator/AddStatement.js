const patron = require("patron.js");
const Constants = require("../../utility/Constants.js");

class AddStatement extends patron.Command {
  constructor() {
    super({
      names: ["addstatement", "setstatement"],
      groupName: "administrators",
      description: "Add a statement to a topic.",
      args: [new patron.Argument({
        name: "topic",
        key: "topic",
        type: "topic",
        example: "communism"
      }),
      new patron.Argument({
        name: "for/against",
        key: "stance",
        type: "stance",
        example: "against"
      }),
      new patron.Argument({
        name: "statement",
        key: "statement",
        type: "string",
        example: "Empirical data proves that capitalism is more efficient.",
        remainder: true
      })]
    });
  }

  async run(msg, args) {
    const cleaned = args.statement.replace(Constants.regexes.monogoDbField, "");
    await msg.client.db.topicRepo.setStatement(msg.guild.id, args.topic.name, cleaned, args.stance);

    return msg.createReply("you have successfully added a statement.");
  }
}

module.exports = new AddStatement();
