const patron = require("patron.js");
const Constants = require("../../utility/Constants.js");

class BotOwner extends patron.Precondition {
  constructor() {
    super({name: "botowner"});
  }

  async run(command, msg) {
    if (Constants.misc.ownerIds.includes(msg.author.id))
      return patron.PreconditionResult.fromSuccess();

    return patron.PreconditionResult.fromError(command, "you must be a bot owner in order to use this command.");
  }
}

module.exports = new BotOwner();
