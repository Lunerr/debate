const patron = require("patron.js");

class Administrators extends patron.Group {
  constructor() {
    super({
      name: "administrators",
      description: "These commands may only be used by administrators of the server.",
      preconditions: ["administrator"]
    });
  }
}

module.exports = new Administrators();
