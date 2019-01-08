const patron = require("patron.js");

class SetDebateChannel extends patron.Command {
  constructor() {
    super({
      names: ["setdebatechannel", "setdebate"],
      groupName: "administrators",
      description: "Sets the debate channel.",
      args: [new patron.Argument({
        name: "channel",
        key: "channel",
        type: "textchannel",
        example: "debates",
        remainder: true
      })]
    });
  }

  async run(msg, args) {
    await msg.client.db.guildRepo.upsertGuild(msg.guild.id, {$set: {debateChannel: args.channel.id}});

    return msg.createReply(`you have successfully set the debate channel to ${args.channel.toString()}.`);
  }
}

module.exports = new SetDebateChannel();
