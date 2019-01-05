const patron = require("patron.js");
const Random = require("../../utility/Random.js");

class Debate extends patron.Command {
  constructor() {
    super({
      names: ["debate"],
      groupName: "general",
      description: "Debate with someone on topic.",
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
        example: "for"
      })]
    });
  }

  async run(msg, args) {
    const position = args.position.lowerString();

    if (position !== "for" && position !== "against")
      return msg.createErrorReply("this is an invalid position.");

    const against = position === "for" ? "against" : "for";

    if (args.topic[against].length === 0)
      return msg.createReply(`there is nobody to debate against, however you are set for ${position}.`);

    const debater = msg.client.users.get(Random.arrayElement(args.topic[against]));
    const topic = `topics.${args.topic.index - 1}.${position}`;

    await msg.client.db.guildRepo.updateGuild(msg.guild.id, {$push: {[topic]: msg.author.id}});

    return msg.createReply(`you have started a debate against ${debater.tag}.`);
  }
}
module.exports = new Debate();
