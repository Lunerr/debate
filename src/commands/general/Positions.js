const patron = require("patron.js");
const Constants = require("../../utility/Constants.js");
const client = require("../../singletons/client.js");

class Positions extends patron.Command {
  constructor() {
    super({
      names: ["positions", "stances"],
      groupName: "general",
      description: "Information about a debate topic.",
      args: [new patron.Argument({
        name: "member",
        key: "member",
        type: "member",
        defaultValue: patron.ArgumentDefault.Member,
        example: "ChestnutEN#4967",
        remainder: true
      })]
    });
  }

  async getTopics(guildId, userId, stance) {
    let res = "";
    let topics = await client.db.topicRepo.findMany({guildId: guildId})
    topics = topics.filter(topic => Object.keys(topic.stances).includes(userId)
     && Object.values(topic.stances).includes(stance));

    for (let i = 0; i < topics.length; i++) {
      res += `${topics[i].name}, `;
    }

    return res.length > Constants.discord.FieldValueCharLimit || res.length === 0 ? 'None' : res.slice(0, -2);;
  }

  async run(msg, args) {
    return msg.channel.createFieldsMessage(["User",
      args.member.user.tag,
      "For",
      await this.getTopics(msg.guild.id, args.member.id, "for"),
      "Against",
      await this.getTopics(msg.guild.id, args.member.id, "against")], false);
  }
}

module.exports = new Positions();
