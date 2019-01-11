const patron = require("patron.js");

class TopicTypeReader extends patron.TypeReader {
  constructor() {
    super({type: "topic"});
  }

  async read(command, message, argument, args, input) {
    const topic = await message.client.db.topicRepo.get(message.guild.id, input);

    if (topic)
      return patron.TypeReaderResult.fromSuccess(topic);

    return patron.TypeReaderResult.fromError(command, "This topic doesn't exist.");
  }
}

module.exports = new TopicTypeReader();
