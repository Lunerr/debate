const patron = require("patron.js");

class Ideology extends patron.Command {
  constructor() {
    super({
      names: ["ideology"],
      groupName: "general",
      description: "Lists all the ideologies.",
      args: [new patron.Argument({
        name: "ideology",
        key: "ideology",
        type: "ideology",
        example: "Leftism",
        remainder: true
      })]
    });
  }

  async run(msg, args) {
    const stanceTopics = Object.keys(args.ideology.stances);
    return msg.channel.createFieldsMessage(["Ideology",
      args.ideology.name,
      "For",
      stanceTopics.filter(x => args.ideology.stances[x] === "for").join(", ") || "Nothing",
      "Against",
      stanceTopics.filter(x => args.ideology.stances[x] === "against").join(", ") || "Nothing"], false);
  }
}

module.exports = new Ideology();
