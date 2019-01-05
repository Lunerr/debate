class Blacklist {
  constructor(userId, username, avatarURL) {
    this.userId = userId;
    this.username = username;
    this.avatarURL = avatarURL;
    this.guildIds = [];
  }
}
module.exports = Blacklist;
