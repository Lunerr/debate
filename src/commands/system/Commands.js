const patron = require("patron.js");
const Constants = require("../../utility/Constants.js");

class Commands extends patron.Command {
  constructor() {
    super({
      names: ["commands", "cmds"],
      groupName: "system",
      description: "View all commands.",
      usableContexts: [patron.Context.DM, patron.Context.Guild]
    });
  }

  async run(msg) {
    const elems = [];

    for (const group of msg.client.registry.groups) {
      elems.push(group.name.upperFirstChar());
      elems.push(group.commands.map(x => `\`${Constants.misc.prefix}${x.names[0]}\``).join(", "));
    }

    return msg.channel.createFieldsMessage(elems, false);
  }
}

module.exports = new Commands();
