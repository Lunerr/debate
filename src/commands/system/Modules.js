const patron = require("patron.js");

class Modules extends patron.Command {
  constructor() {
    super({
      names: ["modules", "module", "groups", "group"],
      groupName: "system",
      description: "View all modules or a modules information.",
      usableContexts: [patron.Context.DM, patron.Context.Guild],
      args: [new patron.Argument({
        name: "module",
        key: "module",
        type: "string",
        defaultValue: "",
        example: "administrator"
      })]
    });
  }

  async run(msg, args) {
    if (String.isNullOrWhiteSpace(args.module)) {
      let message = "";

      for (let i = 0; i < msg.client.registry.groups.length; i++)
        message += `${msg.client.registry.groups[i].name.upperFirstChar()}, `;

      return msg.channel.createMessage(`${message.substring(0, message.length - 2)}.`, {title: "Modules"});
    }

    const lowerInput = args.module.toLowerCase();
    const module = msg.client.registry.groups.find(x => x.name === lowerInput);

    if (!module)
      return msg.createErrorReply("this module does not exist.");

    let message = `**Description**: ${module.description}\n**Commands:** `;

    for (let i = 0; i < module.commands.length; i++)
      message += `${module.commands[i].names[0].upperFirstChar()}, `;

    return msg.channel.createMessage(`${message.substring(0, message.length - 2)}.`, {title: module.name.upperFirstChar()});
  }
}

module.exports = new Modules();
