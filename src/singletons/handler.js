const registry = require("./registry.js");
const patron = require("patron.js");
const handler = new patron.Handler({registry});

module.exports = handler;
