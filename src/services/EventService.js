const path = require("path");
const patron = require("patron.js");

class EventService {
  async initiate(client) {
    const events = await patron.RequireAll(path.join(__dirname, "../events"));

    for (let i = 0; i < events.length; i++) {
      const event = new events[i](client);

      client.on(event.eventName, event.listener);
    }
  }
}

module.exports = new EventService();
