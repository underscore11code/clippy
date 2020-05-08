const data = require('../data.json');

module.exports = function (client) {
  client.on('message', async msg => {
    // Ignore DMs and messages that don't mention anyone
    if (msg.channel.type !== 'text') return;
    if (msg.mentions.members.size === 0) return;
    if (msg.author.id === client.user.id) return;

    if (/<(@|@&|#)\d+>/g.test(msg.content)) {
      await msg.channel.send(`Hey ${msg.author}! Please don't tag people directly.`);
    }
  });
};
