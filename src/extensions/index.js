require("./structures/Number.js");
require("./structures/String.js");

const {RequireAll} = require("patron.js");
const path = require("path");

module.exports = RequireAll(path.join(__dirname, "structures", "discord"));
