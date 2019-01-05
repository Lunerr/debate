const path = require("path");
const {RequireAll} = require("patron.js");

class IntervalService {
  async initiate(client) {
    const obj = await RequireAll(path.join(__dirname, "../intervals"));

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key))
        obj[key](client);
    }
  }
}
module.exports = new IntervalService();
