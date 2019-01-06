const patron = require("patron.js");

class AddPosition extends patron.Command {
  constructor() {
    super({
      names: ["addposition", "setposition", "addstatement", "setstatement"],
      groupName: "general",
      description: "Add a position to a topic.",
      args: [new patron.Argument({
        name: "topic",
        key: "topic",
        type: "topic",
        example: "communism"
      }),
      new patron.Argument({
        name: "for/against",
        key: "position",
        type: "string",
        example: "against"
      }),
      new patron.Argument({
        name: "statement",
        key: "statement",
        type: "string",
        example: "a statement.",
        remainder: true
      })]
    });
  }

  async run(msg, args) {
    if (!msg.member.hasPermission("MANAGE_MESSAGES"))
      return msg.createErrorReply("you must be a mod to use this cmd.");

    if (args.position.toLowerCase() !== "for" && args.position.toLowerCase() !== "against")
      return msg.createErrorReply("this is an invalid position.");

    const statementObj = {
      index: args.topic.statements.length + 1,
      statement: args.statement,
      position: args.position.toLowerCase()
    };
    const topic = `topics.${msg.dbGuild.topics.indexOf(args.topic)}.statements`;

    await msg.client.db.guildRepo.upsertGuild(msg.guild.id, {$push: {[topic]: statementObj}});

    return msg.createReply(`you've successfully added a statement ${args.position.boldify()} ${args.topic.topic.boldify()}.`);
  }
}

module.exports = new AddPosition();
