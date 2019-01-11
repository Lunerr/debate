class Topic {
  constructor(guildId, name) {
    this.guildId = guildId;
    this.name = name;
    this.statements = {};
    this.stances = {};
  }
}

module.exports = Topic;
