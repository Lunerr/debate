const patron = require("patron.js");

class General extends patron.Group {
  constructor() {
    super({
      name: "general",
      description: "These commands are for general purpose."
    });
  }
}

module.exports = new General();
