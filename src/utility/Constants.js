class Constants {
  constructor() {
    this.data = {
      colors: {
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
      },

      links: {
        botInvite: "https://discordapp.com/oauth2/authorize?client_id=531143043697475594&scope=bot&permissions=8",
        serverInvite: "https://discord.gg/DpaZNEQ"
      },

      numbers: {
        thousand: 1000,
        million: 1000000,
        billion: 1000000000
      },

      misc: {
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
      },

      statements: {
        maxOpponents: 3,
        previousMessagesCount: 20,
        replyWait: 60000,
        lastMessageAge: 60000
      },

      regexes: {
        capitalize: /\w\S*/g,
        escape: /[-[\]{}()*+?.,\\/^$|#\s]/g,
        prefix: /^;/
      }
    };
  }
}

module.exports = new Constants();
