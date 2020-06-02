const data = require('../data.json');
const RichEmbed = require('discord.js').RichEmbed;
module.exports = client => {
    client.on('messageReactionAdd', async (reaction, user) => {
        if (user.equals(user.client.user)) return;
        if (reaction.message.channel.id !== data.reactionroleschannel) return;
        let rr = data.reactionroles.find(rr => rr.emoji === reaction.emoji.name);
        if (rr === undefined) return reaction.remove(user);
        if (!reaction.message.guild) return;
        let member = reaction.message.guild.members.get(user.id);
        if (member.roles.find(role => role.id === rr.id))
            await member.removeRole(rr.id);
        else
            await member.addRole(rr.id);
        reaction.remove(user);
    });

    client.on('ready', async () => {
        let channel = client.channels.get(data.reactionroleschannel);
        await channel.bulkDelete(100);
        let embed = new RichEmbed();
        embed.setColor('#94df03')
            .setTitle('Claimable Roles')
            .setDescription('Click the reaction to get the role! Click it again to remove it!');
        data.reactionroles.forEach(rr => {
            embed.addField(`${rr.emoji} ${channel.guild.roles.get(rr.id).name}`, rr.description, true);
        })
        let message = await channel.send(embed);
        data.reactionroles.forEach(async rr => await message.react(rr.emoji));
    })

    client.on('message', async message => {
        if (message.channel.id !== data.reactionroleschannel) return;
        if (message.author.id === message.client.user.id) return;
        message.delete();
    });
}