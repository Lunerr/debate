const patron = require("patron.js");

class AddPosition extends patron.Command {
  constructor() {
    super({
      names: ["addposition", "setposition"],
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
        example: "The government controlling the means of production results inefficiency and waste, slowing innovation.",
        remainder: true
      })]
    });
  }

  async run(msg, args) {
    if (args.position.lowerString() !== "for" && args.position.lowerString() !== "against")
      return msg.createErrorReply("this is an invalid position.");

    const statementObj = {};

    statementObj[args.statement] = {position: args.position};

    const topic = `topics.${args.topic.index - 1}.statements`;

    await msg.client.db.guildRepo.upsertGuild(msg.guild.id, {$push: {[topic]: statementObj}});

    return msg.createReply(`you've successfully added statement ${args.statement.boldify()} with the position ${args.position.boldify()} on topic ${args.topic.topic.boldify()}.`);
  }
}
module.exports = new AddPosition();
