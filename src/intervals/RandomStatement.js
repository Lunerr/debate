const Constants = require("../utility/Constants.js");
const Random = require("../utility/Random.js");
const debates = require("../singletons/debates.js");

function getOpponents(client, ids) {
  let res = "";
  let count = 0;

  for (const id of Random.shuffle(ids)) {
    if (count > Constants.statements.maxOpponents)
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
    const dbGuilds = await client.db.guildRepo.findMany();

    for (const dbGuild of dbGuilds) {
      let topics = await client.db.topicRepo.findMany({guildId: dbGuild.guildId});

      if (topics.length <= 0)
        continue;

      const guild = await client.guilds.get(dbGuild.guildId);

      if (!guild)
        continue;

      const channel = await guild.channels.get(dbGuild.debateChannel);

      if (!channel)
        continue;

      const messages = (await channel.messages.fetch({limit: Constants.statements.previousMessagesCount})).array();

      if (messages[0].createdTimestamp + Constants.statements.lastMessageAge > Date.now())
        continue;

      if (messages.some(msg => debates.has(msg.id)))
        continue;

      topics = Random.shuffle(topics);

      for (const topic of topics) {
        const anyOnline = id => {
          const user = client.users.get(id);
          return user && user.presence.status !== "offline";
        };

        const stanceIds = Object.keys(topic.stances);
        const forIds = stanceIds.filter(id => topic.stances[id] === "for");
        const againstIds = stanceIds.filter(id => topic.stances[id] === "against");
        const statements = Object.keys(topic.statements);

        if (!forIds.some(anyOnline) || !againstIds.some(anyOnline) || statements.length === 0)
          continue;

        const statement = Random.arrayElement(statements);
        const debateMessage = await channel.createMessage(`**${topic.name} Debate**\n\n__STATEMENT:__\n${statement.upperFirstChar().codeBlock()}\n**__REPLY__** with \`agree\` or \`disagree\` to debate!`,
          {footer: {text: "Up to 3 people with differing opinions will be selected to debate you."}});

        debates.set(debateMessage.id, Date.now());

        const reply = await channel.awaitMessages(m => m.content.toLowerCase() === "agree" || m.content.toLowerCase() === "disagree", {
          max: 1, time: Constants.statements.replyWait
        });

        if (reply.size >= 1) {
          const stance = topic.statements[statement];
          const first = reply.first();
          const content = first.content.toLowerCase();
          let opponents = "";

          if ((stance === "for" && content === "agree") || (stance === "against" && content === "disagree"))
            opponents += getOpponents(client, againstIds);
          else
            opponents += getOpponents(client, forIds);

          await channel.tryCreateMessage(`**${topic.name} Debate**
          
__STATEMENT:__
${`${statement}.`.codeBlock()}
__**Rules of rationality:**__

**1.** No ad hominems. Don't attack the person, attack the point.
          
**2.** No straw men. Don't misrepresent someone's argument to then knock down the straw man. "So you're saying..." is typically a straw man argument.

**3.** Use reasonable sources with a fair amount of citations. Some humanities paper from a disreputable university with zero citations is not a source.

**May the best man win!**`);
          await channel.trySend(`${first.author} VS ${opponents.slice(0, -2)}!`);
        } else {
          debateMessage.delete();
        }

        break;
      }
    }
  }, 5000);
};
