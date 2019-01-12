const patron = require("patron.js");

class Subscribe extends patron.Command {
  constructor() {
    super({
      names: ["subscribe"],
      groupName: "general",
      description: "Subscribe to the stances of an ideology.",
      args: [new patron.Argument({
        name: "ideology",
        key: "ideology",
        type: "ideology",
        example: "Libertarian",
        remainder: true
      })]
    });
  }

  async run(msg, args) {
    await msg.createReply(`you have successfully subscribed to the ${args.ideology.name.boldify()} ideology.`);

    for (const topic of Object.keys(args.ideology.stances))
      await msg.client.db.topicRepo.setStance(msg.guild.id, topic, msg.author.id, args.ideology.stances[topic]);
  }
}

module.exports = new Subscribe();
