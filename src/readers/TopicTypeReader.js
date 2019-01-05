const patron = require("patron.js");

class TopicTypeReader extends patron.TypeReader {
  constructor() {
    super({type: "topic"});
  }

  async read(command, message, argument, args, input) {
    const topicIndex = await message.dbGuild.topics.find(x => x.index === Number.parseInt(input));
    const topicName = await message.dbGuild.topics.find(x => x.topic.lowerString() === input.lowerString());

    if (topicIndex)
      return patron.TypeReaderResult.fromSuccess(topicIndex);
    else if (topicName)
      return patron.TypeReaderResult.fromSuccess(topicName);

    return patron.TypeReaderResult.fromError(command, "This topic doesn't exist.");
  }
}
module.exports = new TopicTypeReader();
