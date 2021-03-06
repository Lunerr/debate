const patron = require("patron.js");
const Constants = require("../../utility/Constants.js");

class Topic extends patron.Command {
  constructor() {
    super({
      names: ["topic", "debate"],
      groupName: "general",
      description: "Information about a debate topic.",
      args: [new patron.Argument({
        name: "topic",
        key: "topic",
        type: "topic",
        example: "communism",
        remainder: true
      })]
    });
  }

  getPeople(guild, ids, stance) {
    let res = "";
    let count = 0;

    for (const id of Object.keys(ids)) {
      if (ids[id] !== stance)
        continue;

      const member = guild.members.get(id);
      if (member) {
        res += `${member}, `;
        count++;
      }
    }

    return res.length > Constants.discord.FieldValueCharLimit || res.length === 0 ? count.toString() : res.slice(0, -2);
  }

  async run(msg, args) {
    return msg.channel.createFieldsMessage(["Topic",
      args.topic.name,
      "Statements",
      Object.keys(args.topic.statements).length.toString(),
      "People for",
      this.getPeople(msg.guild, args.topic.stances, "for"),
      "People against",
      this.getPeople(msg.guild, args.topic.stances, "against")], false);
  }
}

module.exports = new Topic();
