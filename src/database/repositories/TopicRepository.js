const BaseRepository = require("./BaseRepository.js");
const Topic = require("../models/Topic.js");
const TopicQuery = require("../queries/TopicQuery.js");
const StringUtil = require("../../utility/StringUtil.js");

class TopicRepository extends BaseRepository {
  any(guildId, name) {
    return super.any(new TopicQuery(guildId, name));
  }

  get(guildId, name) {
    return this.findOne(new TopicQuery(guildId, name));
  }

  insert(guildId, name) {
    return this.insertOne(new Topic(guildId, name));
  }

  delete(guildId, name) {
    return this.deleteOne(new TopicQuery(guildId, name));
  }

  setStance(guildId, name, userId, stance) {
    return this.updateOne(new TopicQuery(guildId, name), {$set: {[`stances.${userId}`]: stance}});
  }

  removeStance(guildId, name, userId) {
    return this.updateOne(new TopicQuery(guildId, name), {$set: {[`stances.${userId}`]: ""}});
  }

  setStatement(guildId, name, statement, stance) {
    return this.updateOne(new TopicQuery(guildId, name), {$set: {[`statements.${StringUtil.mongoFieldIn(statement)}`]: stance}});
  }

  deleteStatement(guildId, name, statement) {
    return this.updateOne(new TopicQuery(guildId, name), {$unset: {[`statements.${StringUtil.mongoFieldIn(statement)}`]: ""}});
  }
}

module.exports = TopicRepository;
