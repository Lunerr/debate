const BaseRepository = require("./BaseRepository.js");
const Ideology = require("../models/Ideology.js");
const IdeologyQuery = require("../queries/IdeologyQuery.js");

class IdeologyRepository extends BaseRepository {
  any(guildId, name) {
    return super.any(new IdeologyQuery(guildId, name));
  }

  insert(guildId, name) {
    return this.insertOne(new Ideology(guildId, name));
  }

  delete(guildId, name) {
    return this.deleteOne(new IdeologyQuery(guildId, name));
  }

  get(guildId, name) {
    return this.findOne(new IdeologyQuery(guildId, name));
  }

  setStance(guildId, name, topic, stance) {
    return this.updateOne(new IdeologyQuery(guildId, name), {$set: {[`stances.${topic}`]: stance}});
  }

  deleteStance(guildId, name, topic) {
    return this.updateOne(new IdeologyQuery(guildId, name), {$unset: {[`stances.${topic}`]: ""}});
  }
}

module.exports = IdeologyRepository;
