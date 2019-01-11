const patron = require("patron.js");
const Constants = require("../../utility/Constants.js");

class Invite extends patron.Command {
  constructor() {
    super({
      names: ["invite", "join", "add"],
      groupName: "system",
      description: "Add Bot to your server.",
      usableContexts: [patron.Context.DM, patron.Context.Guild]
    });
  }

  run(msg) {
    return msg.createReply(`you may add cleanest bot around by clicking here: ${Constants.links.botInvite}.\n\nIf you have any questions or concerns, you may always join the **Official ${msg.client.user.username} Support Server:** ${Constants.links.serverInvite}`);
  }
}

module.exports = new Invite();
