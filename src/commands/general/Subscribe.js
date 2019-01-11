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
    const promises = [];

    for (const topic of Object.keys(args.ideology.stances))
      promises.push(msg.client.db.topicRepo.setStance(msg.guild.id, topic, msg.author.id, args.ideology.stances[topic]));

    await msg.createReply(`you have successfully subsribed to the ${args.ideology.name.boldify()} ideology.`);

    return Promise.all(promises);
  }
}

module.exports = new Subscribe();
