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

String.prototype.codeBlock = function() {
  return `\`\`\`${this}\`\`\``;
};
/* eslint-enable no-extend-native */
