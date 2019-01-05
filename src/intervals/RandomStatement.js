const Random = require("../utility/Random.js");
const debates = require("../singletons/debates.js");

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

      const messages = await channel.messages.fetch({limit: 20});
      const messagesArray = messages.array();

      if (messagesArray[0].createdTimestamp + 60000 > Date.now())
        continue;

      let anyAuto = false;

      for (let j = 0; j < messagesArray.length; j++) {
        if (debates.get(messagesArray[j]) !== undefined)
          anyAuto = true;
      }

      if (anyAuto)
        continue;

      const topic = Random.arrayElement(guilds[i].topics);

      const onlineFor = topic.for.filter(x => {
        const user = client.users.get(x);
        return user && user.presence.status === "online";
      });

      const onlineAgainst = topic.for.filter(x => {
        const user = client.users.get(x);
        return user && user.presence.status === "online";
      });

      if (onlineFor.length <= 0 || onlineAgainst.length <= 0)
        continue;

      if (topic.statements.length <= 0)
        continue;

      const getStatement = Random.arrayElement(topic.statements);
      const position = getStatement.position;
      const statement = getStatement.statement

      const debateMessage = await channel.createMessage(`**${topic.topic} Debate**\n\n__STATEMENT:__\n${statement.upperFirstChar().codeBlock()}\n**__REPLY__** with \`agree\` or \`disagree\` to debate!`, 
        {footer: {text: "Up to 3 random people will be selected to debate your stance."}});

      debates.set(debateMessage.id, Date.now());

      const reply = await channel.awaitMessages(m => m.content.lowerString() === "agree" || m.content.lowerString() === "disagree", { max: 1, time: 60000 });

      if (reply.size >= 1) {
        const content = reply.first().content.lowerString();
        let opponents;
        let opponentsArray = [];
        let opponentsString = '';
        let l;

        if (position === "for") {
          if (content === "agree") {
            opponents = topic.against.filter(x => {
              const user = client.users.get(x);
              return user && user.presence.status === "online";
            });

            const len = opponents.length > 3 ? 3 : opponents.length;

            for (l = 0; l < len; l++) {
              opponentsArray.push(client.users.get(Random.arrayElement(opponents)));
            }
          }

          if (content === "disagree") {
            opponents = topic.for.filter(x => {
              const user = client.users.get(x);
              return user && user.presence.status === "online";
            });

            const len = opponents.length > 3 ? 3 : opponents.length;

            for (l = 0; l < len; l++) {
              opponentsArray.push(client.users.get(Random.arrayElement(opponents)));
            }
          }
        } else if (position === "against") {
          if (content === "agree") {
            opponents = topic.for.filter(x => {
              const user = client.users.get(x);
              return user && user.presence.status === "online";
            });

            const len = opponents.length > 3 ? 3 : opponents.length;

            for (l = 0; l < len; l++) {
              opponentsArray.push(client.users.get(Random.arrayElement(opponents)));
            }
          }

          if (content === "disagree") {
            opponents = topic.against.filter(x => {
              const user = client.users.get(x);
              return user && user.presence.status === "online";
            });

            const len = opponents.length > 3 ? 3 : opponents.length;

            for (l = 0; l < len; l++) {
              opponentsArray.push(client.users.get(Random.arrayElement(opponents)));
            }
          }
        }

        for (let s = 0; s < opponentsArray.length; s++) {
          opponentsString += opponentsArray[s].toString() + ', ';
        }

        await channel.createMessage(`**${topic.topic} Debate**\n\n__STATEMENT:__\n${statement.upperFirstChar().codeBlock()}\n__**Rules of rationality:**__\n\n
          **1.** No ad hominems. Don't attack the person, attack the point.\n\n
          **2.** No straw men. Don't misrepresent someone's argument to then knock down the straw man. "So you're saying..." is typically a straw man argument.\n\n
          **3.** Use reasonable sources with a fair amount of citations. Some humanities paper from a disreputable university with zero citations is not a source.\n\n
          **May the most reasonable man win!**`);
        await channel.send(`${reply.first().author} VS ${opponentsString.substring(0, opponentsString.length - 2)}!`);
      } else {
        debateMessage.delete();
      }
    }
  }, 5000);
};
