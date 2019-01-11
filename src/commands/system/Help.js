const patron = require("patron.js");
const Constants = require("../../utility/Constants.js");

class Help extends patron.Command {
  constructor() {
    super({
      names: ["help", "command", "cmd"],
      groupName: "system",
      description: "Information about the bot.",
      usableContexts: [patron.Context.DM, patron.Context.Guild],
      args: [new patron.Argument({
        name: "command",
        key: "command",
        type: "string",
        defaultValue: "",
        example: "topic"
      })]
    });
  }

  async run(msg, args) {
    if (String.isNullOrWhiteSpace(args.command)) {
      await msg.author.DM(Constants.messages.info, {title: msg.client.user.username});

      if (msg.channel.type !== "dm")
        return msg.createReply(`you have been DMed with information about ${msg.client.user.username}.`);
    } else {
      args.command = args.command.startsWith(Constants.misc.prefix) ? args.command.slice(Constants.misc.prefix.length) : args.command;

      const lowerInput = args.command.toLowerCase();
      const command = msg.client.registry.commands.find(x => x.names.some(y => y === lowerInput));

      if (!command)
        return msg.createErrorReply("this command does not exist.");

      return msg.channel.createMessage(`**Description:** ${command.description}\n**Usage:** \`${Constants.misc.prefix}${command.getUsage()}\`\n**Example:** \`${Constants.misc.prefix}${command.getExample()}\``, {title: command.names[0].upperFirstChar()});
    }
  }
}

module.exports = new Help();
