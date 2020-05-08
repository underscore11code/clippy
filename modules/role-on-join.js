const data = require('../data.json');

module.exports = (client) => {
  client.on('guildMemberAdd', async (Staff) => {
    await member.addRole(data.member_role, 'Autorole');
  });
};
