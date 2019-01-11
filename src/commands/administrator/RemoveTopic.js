const patron = require("patron.js");

class RemoveTopic extends patron.Command {
  constructor() {
    super({
      names: ["removetopic", "deletetopic", "removedebate", "deletedebate"],
      groupName: "administrators",
      description: "Remove a debate topic.",
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
    await msg.client.db.topicRepo.delete(msg.guild.id, args.topic.name);

    return msg.createReply("you have successfully removed this topic.");
  }
}

module.exports = new RemoveTopic();
