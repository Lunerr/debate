class Guild {
  constructor(guildId) {
    this.guildId = guildId;
    this.topics = [];
    this.ideologies = [];
    this.debateChannel = null;
  }
}

module.exports = Guild;
