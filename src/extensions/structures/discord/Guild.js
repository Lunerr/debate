const {Structures} = require("discord.js");

Structures.extend("Guild", G => {
  class Guild extends G {
    get mainChannel() {
      const generalChannel = this.channels.find(x => x.type === "text" && (x.name === "general" || x.name.includes("main")));

      if (generalChannel)
        return generalChannel;

      return this.channels.filter(x => x.type === "text").sort((a, b) => a.createdAt - b.createdAt).first();
    }

    async defaultInvite() {
      const invites = await this.fetchInvites();
      const invite = invites.findValue(v => v.maxAge === 0 && v.maxUses === 0 && !v.temporary);

      if (invite)
        return invite;

      if (this.mainChannel)
        return this.mainChannel.createInvite({maxAge: 0});

      return null;
    }
  }

  return Guild;
});
