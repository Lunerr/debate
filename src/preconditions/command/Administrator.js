const patron = require("patron.js");

class Administrator extends patron.Precondition {
  constructor() {
    super({name: "administrator"});
  }

  async run(command, msg) {
    if (msg.member.hasPermission("MANAGE_MESSAGES"))
      return patron.PreconditionResult.fromSuccess();

    return patron.PreconditionResult.fromError(command, "you must be an administrator to use this command.");
  }
}

module.exports = new Administrator();
