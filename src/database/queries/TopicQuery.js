const escapeStringRegexp = require("escape-string-regexp");

class TopicQuery {
  constructor(guildId, name) {
    this.guildId = guildId;
    this.name = new RegExp(`^${escapeStringRegexp(name)}$`, "i");
  }
}

module.exports = TopicQuery;
