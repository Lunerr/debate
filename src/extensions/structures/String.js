const Constants = require("../../utility/Constants.js");

String.isNullOrWhiteSpace = function(input) {
  return typeof input !== "string" || input.replace(/\s+/g, "").length === 0;
};
/* eslint-disable no-extend-native */
String.prototype.boldify = function() {
  return `**${this.replace(/(\*|~|`)+/g, "").replace(/_/g, " ")}**`;
};
String.prototype.upperFirstChar = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
String.prototype.lowerString = function() {
  return this.toLowerCase();
};
String.prototype.upperString = function() {
  return this.toUpperCase();
};
String.prototype.codeBlock = function() {
  return `\`\`\`${this}\`\`\``;
};
String.prototype.mention = function() {
  return `<@${this}>`;
};
String.prototype.capitalizeWords = function() {
  if (isNaN(this))
    return this.replace("_", " ").replace(Constants.data.regexes.capitalize, x => x.charAt(0).toUpperCase() + x.substr(1));

  return this;
};
String.prototype.format = function() {
  const args = arguments;

  return this.replace(/{(\d+)}/g, (match, number) => typeof args[number] !== "undefined" ? args[number] : match);
};
/* eslint-enable no-extend-native */
