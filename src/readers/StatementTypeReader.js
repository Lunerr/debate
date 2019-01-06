const patron = require("patron.js");

class StatementTypeReader extends patron.TypeReader {
  constructor() {
    super({type: "statement"});
  }

  async read(command, message, argument, args, input) {
    const statement = await args.topic.statements.find(x => x.statement.toLowerCase() === input.toLowerCase());

    if (statement)
      return patron.TypeReaderResult.fromSuccess(statement);

    return patron.TypeReaderResult.fromError(command, "This statement doesn't exist.");
  }
}

module.exports = new StatementTypeReader();
