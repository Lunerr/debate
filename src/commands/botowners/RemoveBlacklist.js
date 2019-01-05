const patron = require("patron.js");

class RemoveBlacklist extends patron.Command {
  constructor() {
    super({
      names: ["unblacklist", "removeblacklist"],
      groupName: "botowners",
      description: "Remove's blacklist on stated user.",
      args: [new patron.Argument({
        name: "user",
        key: "user",
        type: "user",
        example: "The Devil#6666",
        remainder: true
      })]
    });
  }

  async run(msg, args) {
    if (!await msg.client.db.blacklistRepo.anyBlacklist(args.user.id))
      return msg.createErrorReply("this user isn't blacklisted.");

    await msg.client.db.blacklistRepo.deleteBlacklist(args.user.id);

    return msg.createReply(`successfully removed ${args.user.tag}'s blacklist.`);
  }
}
module.exports = new RemoveBlacklist();
