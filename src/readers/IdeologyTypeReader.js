const patron = require("patron.js");

class IdeologyTypeReader extends patron.TypeReader {
  constructor() {
    super({type: "ideology"});
  }

  async read(command, message, argument, args, input) {
    const ideology = await message.client.db.ideologyRepo.get(message.guild.id, input);

    if (ideology)
      return patron.TypeReaderResult.fromSuccess(ideology);

    return patron.TypeReaderResult.fromError(command, "This ideology doesn't exist.");
  }
}

module.exports = new IdeologyTypeReader();
