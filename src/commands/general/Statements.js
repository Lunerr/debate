const patron = require("patron.js");
const PromiseUtil = require("../../utility/PromiseUtil.js");

class Statements extends patron.Command {
  constructor() {
    super({
      names: ["statements"],
      groupName: "general",
      description: "Finds all statements on a topic.",
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
    const statements = args.topic.statements.sort((a, b) => a.index - b.index);
    const topicNums = [20,
      40,
      60,
      80,
      100];
    let message = "";

    if (statements.length <= 0)
      return msg.createErrorReply(`there's currently no statements on the topic ${args.topic.topic}.`);

    for (let i = 0; i < statements.length; i++) {
      message += `**${i + 1}.** ${statements[i].statement}\n\n`;

      if (topicNums.includes(i)) {
        await msg.author.tryDM(message, {title: `${args.topic.topic} Statements`});
        await PromiseUtil.delay(2000);
        message = "";
      }
    }

    await msg.author.tryDM(message, {title: `${args.topic.topic} Statements`});

    return msg.createReply(`you have been DMed with all ${args.topic.topic.boldify()} statements.`);
  }
}

module.exports = new Statements();
