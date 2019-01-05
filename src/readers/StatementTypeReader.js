const patron = require("patron.js");

class StatementTypeReader extends patron.TypeReader {
  constructor() {
    super({type: "statement"});
  }

  async read(command, message, argument, args, input) {
    const statementIndex = await args.topic.statements.find(x => x.index === Number.parseInt(input));
    const statementName = await args.topic.statements.find(x => x.statement.lowerString() === input.lowerString());

    if (statementIndex)
      return patron.TypeReaderResult.fromSuccess(statementIndex);
    else if (statementName)
      return patron.TypeReaderResult.fromSuccess(statementName);

    return patron.TypeReaderResult.fromError(command, "This statement doesn't exist.");
  }
}
module.exports = new StatementTypeReader();
