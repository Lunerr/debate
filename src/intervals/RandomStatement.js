const Constants = require("../utility/Constants.js");
const Random = require("../utility/Random.js");
const debates = require("../singletons/debates.js");

function getOpponents(client, ids) {
  let res = "";
  let count = 0;

  for (const id of Random.shuffle(ids)) {
    if (count > Constants.data.statements.maxOpponents)
      break;

    const user = client.users.get(id);

    if (user && user.presence.status !== "offline") {
      count++;
      res += `${user}, `;
    }
  }

  return res;
}

module.exports = async client => {
  client.setInterval(async () => {
    const guilds = await client.db.guildRepo.findMany();

    for (let i = 0; i < guilds.length; i++) {
      if (guilds[i].topics.length <= 0)
        continue;

      const guild = await client.guilds.get(guilds[i].guildId);

      if (!guild)
        continue;

      const channel = await guild.channels.get(guilds[i].debateChannel);

      if (!channel)
        continue;

      const messages = await channel.messages.fetch({limit: Constants.data.statements.previousMessagesCount});
      const messagesArray = messages.array();

      if (messagesArray[0].createdTimestamp + Constants.data.statements.lastMessageAge > Date.now())
        continue;

      for (let j = 0; j < messagesArray.length; j++) {
        if (!debates.get(messagesArray[j]))
          continue;
      }

      const topic = Random.arrayElement(guilds[i].topics);
      const anyOnline = id => {
        const user = client.users.get(id);
        return user && user.presence.status !== "offline";
      };

      if (!topic.for.some(anyOnline) || !topic.against.some(anyOnline) || topic.statements.length === 0)
        continue;

      const statement = Random.arrayElement(topic.statements);
      const debateMessage = await channel.createMessage(`**${topic.topic} Debate**\n\n__STATEMENT:__\n${statement.statement.upperFirstChar().codeBlock()}\n**__REPLY__** with \`agree\` or \`disagree\` to debate!`,
        {footer: {text: "Up to 3 people with differing opinions will be selected to debate you."}});

      debates.set(debateMessage.id, Date.now());

      const reply = await channel.awaitMessages(m => m.content.toLowerCase() === "agree" || m.content.toLowerCase() === "disagree", {
        max: 1, time: Constants.data.statements.replyWait
      });

      if (reply.size >= 1) {
        const content = reply.first().content.toLowerCase();
        let opponents = "";

        if ((statement.position === "for" && content === "agree") || (statement.position === "against" && content === "disagree"))
          opponents += getOpponents(client, topic.against);
        else if ((statement.position === "against" && content === "agree") || (statement.position === "for" && content === "disagree"))
          opponents += getOpponents(client, topic.for);

        await channel.createMessage(`**${topic.topic} Debate**\n\n__STATEMENT:__\n${statement.statement.upperFirstChar().codeBlock()}\n__**Rules of rationality:**__\n
          **1.** No ad hominems. Don't attack the person, attack the point.\n
          **2.** No straw men. Don't misrepresent someone's argument to then knock down the straw man. "So you're saying..." is typically a straw man argument.\n
          **3.** Use reasonable sources with a fair amount of citations. Some humanities paper from a disreputable university with zero citations is not a source.\n
          **May the most reasonable man win!**`);
        await channel.send(`${reply.first().author} VS ${opponents.substring(0, opponents.length - 2)}!`);
      } else {
        debateMessage.delete();
      }
    }
  }, 5000);
};
