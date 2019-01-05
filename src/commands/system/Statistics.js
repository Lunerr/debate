const patron = require("patron.js");
const Constants = require("../../utility/Constants.js");
const NumberUtil = require("../../utility/NumberUtil.js");

class Statistics extends patron.Command {
  constructor() {
    super({
      names: ["statistics", "stats"],
      groupName: "system",
      description: "Statistics about this bot.",
      usableContexts: [patron.Context.DM, patron.Context.Guild]
    });
  }

  async run(msg) {
    const uptime = NumberUtil.msToTime(msg.client.uptime);
    let users = 0;

    for (const guild of msg.client.guilds.values())
      users += guild.memberCount;

    await msg.author.DMFields(["Authors",
      Constants.data.misc.botOwners.join("\n"),
      "Framework",
      "patron.js",
      "Memory",
      `${(process.memoryUsage().rss / 1048576).toFixed(2)} MB`,
      "Servers",
      msg.client.guilds.size,
      "Users",
      users,
      "Uptime",
      `Days: ${uptime.days}\nHours: ${uptime.hours}\nMinutes: ${uptime.minutes}`]);

    if (msg.channel.type !== "dm")
      return msg.createReply(`you have been DMed with all ${msg.client.user.username} Statistics!`);
  }
}
module.exports = new Statistics();
