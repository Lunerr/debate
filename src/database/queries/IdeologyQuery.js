const escapeStringRegexp = require("escape-string-regexp");

class IdeologyQuery {
  constructor(guildId, name) {
    this.guildId = guildId;
    this.name = new RegExp(`^${escapeStringRegexp(name)}$`, "i");
  }
}

module.exports = IdeologyQuery;
