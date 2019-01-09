const patron = require("patron.js");
const path = require("path");
const registry = new patron.Registry({
  library: "discord.js", caseSensitive: false
});

(async () => {
  registry.registerGlobalTypeReaders()
    .registerLibraryTypeReaders()
    .registerTypeReaders(await patron.RequireAll(path.join(__dirname, "../readers")))
    .registerPreconditions(await patron.RequireAll(path.join(__dirname, "../preconditions", "command")))
    .registerGroups(await patron.RequireAll(path.join(__dirname, "../groups")))
    .registerCommands(await patron.RequireAll(path.join(__dirname, "../commands")));
})();

module.exports = registry;
