class RateLimit {
  constructor() {
    this.messages = 1;
    this.time = Date.now();
  }
}
module.exports = RateLimit;
