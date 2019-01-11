class Constants {
  constructor() {
    this.colors = {
      defaults: [[255, 38, 154],
        [0, 255, 0],
        [0, 232, 40],
        [8, 248, 255],
        [242, 38, 255],
        [255, 28, 142],
        [104, 255, 34],
        [255, 190, 17],
        [41, 84, 255],
        [150, 36, 237],
        [168, 237, 0]],
      error: [255, 0, 0]
    };

    this.discord = {
      FieldValueCharLimit: 1024, DescriptionCharLimit: 2048
    };

    this.links = {
      botInvite: "https://discordapp.com/oauth2/authorize?client_id=531143043697475594&scope=bot&permissions=8",
      serverInvite: "https://discord.gg/DpaZNEQ"
    };

    this.numbers = {
      thousand: 1000,
      million: 1000000,
      billion: 1000000000
    };

    this.misc = {
      clientOptions: {
        fetchAllMembers: true,
        messageCacheMaxSize: 100,
        messageCacheLifetime: 30,
        messageSweepInterval: 1800,
        disabledEvents: ["CHANNEL_PINS_UPDATE",
          "MESSAGE_UPDATE",
          "MESSAGE_REACTION_ADD",
          "MESSAGE_REACTION_REMOVE",
          "MESSAGE_REACTION_REMOVE_ALL",
          "VOICE_STATE_UPDATE",
          "TYPING_START",
          "VOICE_SERVER_UPDATE",
          "WEBHOOKS_UPDATE"]
      },
      game: ";help",
      prefix: ";",
      ownerIds: ["226736342745219072", "474210876967223296"]
    };

    this.statements = {
      maxOpponents: 3,
      previousMessagesCount: 20,
      replyWait: 60000,
      lastMessageAge: 60000
    };

    this.regexes = {
      capitalize: /\w\S*/g,
      escape: /[-[\]{}()*+?.,\\/^$|#\s]/g,
      prefix: /^;/,
      newline: /\r?\n/
    };
  }
}

module.exports = new Constants();
