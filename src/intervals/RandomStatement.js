const Constants = require("../utility/Constants.js");
const Random = require("../utility/Random.js");
const debates = require("../singletons/debates.js");
const StringUtil = require("../utility/StringUtil.js");

function getDebaters(guild, maxCount, ids) {
  let res = "";
  let count = 0;

  for (const id of Random.shuffle(ids)) {
    if (count >= maxCount)
      break;

    const member = guild.members.get(id);

    if (member && member.user.presence.status !== "offline") {
      count++;
      res += `${member}, `;
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
          const member = guild.members.get(id);
          return member && member.user.presence.status !== "offline";
        };

        const stanceIds = Object.keys(topic.stances);
        const forIds = stanceIds.filter(id => topic.stances[id] === "for");
        const againstIds = stanceIds.filter(id => topic.stances[id] === "against");
        const statements = Object.keys(topic.statements);

        if (!forIds.some(anyOnline) || !againstIds.some(anyOnline) || statements.length === 0)
          continue;

        const statement = Random.arrayElement(statements);
        const debateMessage = await channel.createMessage(`**${topic.name} debate**\n\n__STATEMENT:__\n${StringUtil.mongoFieldOut(statement).codeBlock()}\n**__REPLY__** with \`agree\` or \`disagree\` to debate!`,
          {footer: {text: `Up to ${Constants.statements.maxOpponents} people with differing opinions will be selected to debate you.`}});

        debates.set(debateMessage.id, Date.now());

        const reply = await channel.awaitMessages(m => m.content.toLowerCase() === "agree" || m.content.toLowerCase() === "disagree", {
          max: 1, time: Constants.statements.replyWait
        });

        if (reply.size >= 1) {
          const stance = topic.statements[statement];
          const first = reply.first();
          const content = first.content.toLowerCase();
          let opponents = "";
          let allies = `${first.author}, `;

          if ((stance === "for" && content === "agree") || (stance === "against" && content === "disagree")) {
            opponents += getDebaters(guild, Constants.statements.maxDebaters, againstIds);
            allies += getDebaters(guild, Constants.statements.maxDebaters - 1, forIds);
          } else {
            opponents += getDebaters(guild, Constants.statements.maxDebaters, forIds);
            allies += getDebaters(guild, Constants.statements.maxDebaters - 1, againstIds);
          }

          await channel.tryCreateMessage(`**${topic.name} debate**
          
__STATEMENT:__
${StringUtil.mongoFieldOut(statement).codeBlock()}
__**Rules of rationality:**__

**1.** No ad hominems. Don't attack the person, attack the point.
          
**2.** No straw men. Don't misrepresent someone's argument to then knock down the straw man. "So you're saying..." is typically a straw man argument.

**3.** Use reasonable sources with a fair amount of citations. Some humanities paper from a disreputable university with zero citations is not a source.

**May the best man win!**`);
          await channel.trySend(`${allies.slices(0, -2)} VS ${opponents.slice(0, -2)}!`);
        } else {
          debateMessage.delete();
        }

        break;
      }
    }
  }, 5000);
};
