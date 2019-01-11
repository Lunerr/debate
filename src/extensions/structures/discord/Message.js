const {Structures} = require("discord.js");
const Random = require("../../../utility/Random.js");
const Constants = require("../../../utility/Constants.js");

Structures.extend("Message", M => {
  class Message extends M {
    createReply(description, options = {}) {
      return this.channel.createMessage(`${this.author.tag.boldify()}, ${description}`, options);
    }

    tryCreateReply(description, options = {}) {
      return this.channel.tryCreateMessage(`${this.author.tag.boldify()}, ${description}`, options);
    }

    createErrorReply(description, options = {}) {
      return this.channel.createErrorMessage(`${this.author.tag.boldify()}, ${description}`, options);
    }

    tryCreateErrorReply(description, options = {}) {
      return this.channel.tryCreateErrorMessage(`${this.author.tag.boldify()}, ${description}`, options);
    }

    sendEmbed(commandEmbed, options = {}) {
      const embed = commandEmbed
        .setColor(options.color ? options.color : Random.arrayElement(Constants.colors.defaults));

      return this.channel.send({embed});
    }
  }

  return Message;
});
