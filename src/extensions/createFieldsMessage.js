const {MessageEmbed} = require("discord.js");
const Random = require("../utility/Random.js");
const Constants = require("../utility/Constants.js");

function createFieldsMessage(channel, fieldsAndValues, inline = true, color = null) {
  const embed = new MessageEmbed()
    .setColor(color ? color : Random.arrayElement(Constants.data.colors.defaults));

  for (let i = 0; i < fieldsAndValues.length - 1; i++) {
    if (i.isEven())
      embed.addField(fieldsAndValues[i], fieldsAndValues[i + 1], inline);
  }

  return channel.send({embed});
}

module.exports = createFieldsMessage;
