const {Structures} = require("discord.js");
const Constants = require("../../../utility/Constants.js");
const createMessage = require("../../createMessage.js");
const createFieldsMessage = require("../../createFieldsMessage.js");

Structures.extend("TextChannel", T => {
  class TextChannel extends T {
    createMessage(description, options = {}) {
      return createMessage(this, description, options);
    }

    createErrorMessage(description, options = {}) {
      options.color = Constants.colors.error;

      return this.createMessage(description, options);
    }

    createFieldsMessage(fieldsAndValues, inline = true, color = null) {
      return createFieldsMessage(this, fieldsAndValues, inline, color);
    }

    async tryCreateMessage(description, options = {}) {
      const permissions = this.permissionsFor(this.guild.me);

      if (permissions.has("SEND_MESSAGES") && permissions.has("EMBED_LINKS")) {
        await this.createMessage(description, options);

        return true;
      }

      return false;
    }

    tryCreateErrorMessage(description, options = {}) {
      options.color = Constants.colors.error;

      return this.tryCreateMessage(description, options);
    }

    async trySend(description, options = {}) {
      const permissions = this.permissionsFor(this.guild.me);

      if (permissions.has("SEND_MESSAGES")) {
        await this.send(description, options);

        return true;
      }

      return false;
    }
  }

  return TextChannel;
});
