const {MessageEmbed} = require("discord.js");
const Random = require("../utility/Random.js");
const Constants = require("../utility/Constants.js");

function createMessage(channel, description, options = {}) {
  const embed = new MessageEmbed()
    .setColor(options.color ? options.color : Random.arrayElement(Constants.data.colors.defaults))
    .setDescription(description);

  if (options.title)
    embed.setTitle(options.title);

  if (options.author)
    embed.setAuthor(options.author.name, options.author.icon, options.author.URL);

  if (options.footer)
    embed.setFooter(options.footer.text, options.footer.icon);

  if (options.timestamp)
    embed.setTimestamp();

  return channel.send({embed});
}

module.exports = createMessage;
