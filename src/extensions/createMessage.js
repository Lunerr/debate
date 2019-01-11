const {MessageEmbed} = require("discord.js");
const Random = require("../utility/Random.js");
const Constants = require("../utility/Constants.js");

function createEmbed(options) {
  const embed = new MessageEmbed()
    .setColor(options.color ? options.color : Random.arrayElement(Constants.colors.defaults));

  if (options.title)
    embed.setTitle(options.title);

  if (options.author)
    embed.setAuthor(options.author.name, options.author.icon, options.author.URL);

  if (options.footer)
    embed.setFooter(options.footer.text, options.footer.icon);

  if (options.timestamp)
    embed.setTimestamp();

  return embed;
}

async function createMessage(channel, description, options = {}) {
  const embed = createEmbed(options);
  const split = description.split(Constants.regexes.newline);
  let content = "";

  for (let i = 0; i < split.length; i++) {
    if (content.length + split[i].length > Constants.discord.DescriptionCharLimit) {
      await channel.send({embed: embed.setDescription(content)});
      content = "";
    }

    content += `${split[i]}\n`;
  }

  return channel.send({embed: embed.setDescription(content)});
}

module.exports = createMessage;
