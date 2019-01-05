const patron = require("patron.js");

class SystemGroup extends patron.Group {
  constructor() {
    super({
      name: "system",
      description: "These commands are the normal bot commands."
    });
  }
}
module.exports = new SystemGroup();
