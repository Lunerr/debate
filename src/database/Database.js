const {MongoClient} = require("mongodb");
const util = require("util");
const GuildRepository = require("./repositories/GuildRepository.js");
const IdeologyRepoistory = require("./repositories/IdeologyRepository.js");
const TopicRepository = require("./repositories/TopicRepository.js");

class Database {
  constructor() {
    this.queries = {
      Guild: require("./queries/GuildQuery.js"),
      Id: require("./queries/IdQuery.js")
    };
    this.updates = {
      Pull: require("./updates/PullUpdate.js"),
      Push: require("./updates/PushUpdate.js")
    };
    this.models = {Guild: require("./models/Guild.js")};
  }

  async connect(connectionURL) {
    const promisified = util.promisify(MongoClient.connect);
    const connection = await promisified(connectionURL, {useNewUrlParser: true});
    const db = connection.db(connection.s.options.dbName);

    this.ideologyRepo = new IdeologyRepoistory(await db.createCollection("ideologies"));
    this.topicRepo = new TopicRepository(await db.createCollection("topics"));
    this.guildRepo = new GuildRepository(await db.createCollection("guilds"));
  }
}

module.exports = Database;
