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

  getPeople(client, ids) {
    let res = "";

    for (const id of ids) {
      const user = client.users.get(id);
      if (user)
        res += `${user}, `;
    }

    return res.length > Constants.data.discord.FieldValueCharLimit ? ids.length.toString() : res.slice(0, -2);
  }

  async run(msg, args) {
    return msg.channel.createFieldsMessage(["Topic",
      args.topic.topic,
      "Statements",
      args.topic.statements.length.toString(),
      "People for",
      this.getPeople(msg.client, args.topic.for),
      "People against",
      this.getPeople(msg.client, args.topic.against)], false);
  }
}

module.exports = new Topic();
