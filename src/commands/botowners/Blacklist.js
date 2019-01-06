const patron = require("patron.js");

class Blacklist extends patron.Command {
  constructor() {
    super({
      names: ["blacklist"],
      groupName: "botowners",
      description: "Blacklists user from your server, but doesn't ban him.",
      args: [new patron.Argument({
        name: "user",
        key: "user",
        type: "user",
        example: "Jesus Christ#4444",
        remainder: true
      })]
    });
  }

  async run(msg, args) {
    if (await msg.client.db.blacklistRepo.anyBlacklist(args.user.id))
      return msg.createErrorReply("this user is already blacklisted.");

    await msg.client.db.blacklistRepo.insertBlacklist(args.user.id, args.user.tag, args.user.displayAvatarURL());

    return msg.createReply(`successfully blacklisted ${args.user.tag}.`);
  }
}

module.exports = new Blacklist();
