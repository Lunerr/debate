const patron = require("patron.js");
const StringUtil = require("../utility/StringUtil.js");

class StatementTypeReader extends patron.TypeReader {
  constructor() {
    super({type: "statement"});
  }

  async read(command, message, argument, args, input) {
    const cleaned = StringUtil.mongoFieldIn(input.toLowerCase());
    const statement = Object.keys(args.topic.statements).find(x => x.toLowerCase() === cleaned);

    if (statement)
      return patron.TypeReaderResult.fromSuccess(statement);

    return patron.TypeReaderResult.fromError(command, "This statement doesn't exist.");
  }
}

module.exports = new StatementTypeReader();
