const {Client: _Client} = require("discord.js");
const Constants = require("../utility/Constants.js");
const registry = require("./registry.js");
const Database = require("../database/Database.js");

class Client extends _Client {
  constructor(reg, db, options) {
    super(options);
    Object.defineProperty(this, "registry", {value: reg});
    Object.defineProperty(this, "db", {value: db});
  }

  async tryDM(id, description, options) {
    try {
      const user = await this.users.fetch(id);

      return user.tryDM(description, options);
    } catch (err) {
      return false;
    }
  }
}
module.exports = new Client(registry, new Database(), Constants.data.misc.clientOptions);
