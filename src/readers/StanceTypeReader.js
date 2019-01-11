const patron = require("patron.js");

class StanceTypeReader extends patron.TypeReader {
  constructor() {
    super({type: "stance"});
  }

  async read(command, message, argument, args, input) {
    const lowered = input.toLowerCase();

    if (lowered === "for" || lowered === "against")
      return patron.TypeReaderResult.fromSuccess(lowered);

    return patron.TypeReaderResult.fromError(command, "The stance must either be `for` or `against`.");
  }
}

module.exports = new StanceTypeReader();
