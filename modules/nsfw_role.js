module.exports = function (client) {
    client.on('messageReactionAdd', (reaction, user) => {
        let data = require('../data.json')
        if (reaction.message.id !==  data.nsfw_message) return;
        console.log('Is message')
        if (!reaction.message.guild) return;
        console.log('Is in guild')
        if (reaction.emoji !== '✅') return;
        console.log('Is right emoji, toggling')
        if (reaction.member.roles.has(data.nsfw_role)) reaction.member.removeRole(data.nsfw_role)
        else reaction.member.addRole(data.nsfw_role)
        reaction.remove()
    })
}