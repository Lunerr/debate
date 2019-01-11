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
      await msg.author.DM(`The best ideas naturally rise to the top when free speech and rational discussion are promoted. This bot evolves around debate. We need to know what **YOU** think in order to promote debates.

In order to allow ${msg.client.user.username} to pick people with differing opinions, please enter in one of the following commands __in the server__:
- \`;subscribe leftist\`
- \`;subscribe conservative\`
- \`;subscribe libertarian\`
      
This will automatically pick your positions on a wide range of topics. You can individually pick your positions by using: 
- \`;topics\`
- \`;for <topic>\`
- \`;against <topic>\`.
      
You may use \`;commands\` to view all commands.`, {title: msg.client.user.username});

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
