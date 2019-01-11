const patron = require("patron.js");
const StringUtil = require("../../utility/StringUtil.js");

class Statements extends patron.Command {
  constructor() {
    super({
      names: ["statements"],
      groupName: "general",
      description: "Lists all the statements on a topic.",
      args: [new patron.Argument({
        name: "topic",
        key: "topic",
        type: "topic",
        example: "communism",
        remainder: true
      })]
    });
  }

  async run(msg, args) {
    const keys = Object.keys(args.topic.statements);

    if (keys.length === 0)
      return msg.createErrorReply(`there are currently no statements on ${args.topic.name.boldify()}.`);

    const statements = keys.sort((a, b) => a.index - b.index);
    const description = statements.map((x, i) => `**${i + 1}.** ${StringUtil.mongoFieldOut(x)}\n\n`).join();

    await msg.author.tryDM(description, {title: `${args.topic.name} Statements`});

    return msg.createReply(`you have been DMed with all ${args.topic.name.boldify()} statements.`);
  }
}

module.exports = new Statements();
