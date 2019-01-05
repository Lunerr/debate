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
        type: "string",
        example: "The government controlling the means of production results inefficiency and waste, slowing innovation.",
        remainder: true
      })]
    });
  }

  async run(msg, args) {
    const statements = Object.keys(args.topic.statements);
    let statement;

    for (let i = 0; i < statements.length; i++) {
      console.log(statements[i]);
      if (statements[i] === args.statement) {
        statement = statements[i];
      }
    }

    console.log(statement);

    if (!statement)
      return msg.createErrorReply("this statement does not exist.");

    const index = args.topic.statements.indexOf(statement)

    console.log(statement);

    if (index < 0)
      return msg.createErrorReply("this statement does not exist.");

    const topicDB = `topics.${args.topic.index - 1}.statements`;

    await msg.client.db.guildRepo.upsertGuild(msg.guild.id, {$push: {[topicDB]: index}});

    return msg.createReply(`you've successfully removed statement ${args.statement.boldify()} from topic ${args.topic.topic.boldify()}.`);
  }
}
module.exports = new RemovePosition();
