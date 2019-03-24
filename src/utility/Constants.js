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

    this.messages = {info: `The best ideas naturally rise to the top when free speech and rational discussion are promoted. This bot evolves around debate. We need to know what **YOU** think in order to promote debates.

In order to allow the bot to pick people with differing opinions, please enter in one of the following commands __in the server__:
- \`;subscribe leftist\`
- \`;subscribe conservative\`
- \`;subscribe libertarian\`

To view more information about any ideology, please use the command \`;ideology <name>\`.

This will automatically pick your positions on a wide range of topics. You can individually pick your positions by using:
- \`;topics\`
- \`;for <topic>\`
- \`;against <topic>\`.

You may use \`;commands\` to view all commands.`};

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
      ownerIds: ["226736342745219072", "474210876967223296", "266743271898742785"]
    };

    this.statements = {
      maxDebaters: 5,
      previousMessagesCount: 20,
      replyWait: 120000,
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
