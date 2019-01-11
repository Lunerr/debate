const {Structures} = require("discord.js");
const Constants = require("../../../utility/Constants.js");
const createMessage = require("../../createMessage.js");
const createFieldsMessage = require("../../createFieldsMessage.js");

Structures.extend("DMChannel", DMC => {
  class DMChannel extends DMC {
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
      try {
        await this.createMessage(description, options);

        return true;
      } catch (_) {
        return false;
      }
    }

    tryCreateErrorMessage(description, options = {}) {
      options.color = Constants.colors.error;

      return this.tryCreateMessage(description, options);
    }
  }

  return DMChannel;
});
