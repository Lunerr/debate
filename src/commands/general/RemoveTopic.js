const patron = require("patron.js");
const debate = require("../../structures/debate.js");

class RemoveTopic extends patron.Command {
  constructor() {
    super({
      names: ["removetopic", "deletetopic", "removedebate", "deletedebate"],
      groupName: "general",
      description: "Remove a topic to debate.",
      args: [new patron.Argument({
        name: "topic",
        key: "topic",
        type: "topic",
        example: "\"is john gay\"",
        remainder: true
      })]
    });
  }

  async run(msg, args) {
    await msg.client.db.guildRepo.upsertGuild(msg.guild.id, {$pull: {topics: args.topic.index}});

    return msg.createReply(`you've successfully removed topic ${args.topic.boldify()}.`);
  }
}
module.exports = new RemoveTopic();
