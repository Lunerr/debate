const Constants = require("../utility/Constants.js");

class ChatService {
  constructor() {
    this.messages = new Map();
  }

  async applyBait(msg) {
    const lastMessage = this.messages.get(msg.author.id);
    const isMessageCooldownOver = !lastMessage || Date.now() - lastMessage > Constants.config.misc.messageCooldown;
    const isLongEnough = msg.content.length >= Constants.config.misc.minCharLength;

    if (isMessageCooldownOver && isLongEnough) {
      this.messages.set(msg.author.id, Date.now());

      return msg.client.db.userRepo.modifyBait(msg, msg.member, Constants.config.misc.baitPerMessage);
    }
  }
}
module.exports = new ChatService();
