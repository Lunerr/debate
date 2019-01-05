const patron = require("patron.js");
const path = require("path");
const registry = new patron.Registry({
  library: "discord.js", caseSensitive: false
});

(async r => {
  r.registerGlobalTypeReaders();
  r.registerLibraryTypeReaders();
  r.registerTypeReaders(await patron.RequireAll(path.join(__dirname, "../readers")));
  r.registerPreconditions(await patron.RequireAll(path.join(__dirname, "../preconditions", "command")));
  r.registerGroups(await patron.RequireAll(path.join(__dirname, "../groups")));
  r.registerCommands(await patron.RequireAll(path.join(__dirname, "../commands")));
})(registry);
module.exports = registry;
