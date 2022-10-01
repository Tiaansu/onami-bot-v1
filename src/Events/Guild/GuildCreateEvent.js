const {
    EmbedBuilder,
    Client,
    Guild,
    ChannelType,
    PermissionFlagsBits
} = require('discord.js');
const { 
    addCommas 
} = require('../../Functions/FormatNumberFunction');

const moment = require('moment');
const Logger = require('../../Functions/LoggerFunction');

module.exports = {
    name: "guildCreate",
    once: true,

    /**
     * @param {Guild} guild
     * @param {Client} client 
     */
    async execute(guild, client) {
        const guildChannel = guild.channels?.cache?.find(channel => channel.type === ChannelType.GuildText && channel.permissionsFor(guild.members.me).has(PermissionFlagsBits.SendMessages));
        const totalGuilds = await client.shard.fetchClientValues('guilds.cache.size').then(results => results.reduce((acc, guildCount) => acc + guildCount, 0)).catch(console.error);
        const totalMembers = await client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)).then(results => results.reduce((acc, memberCount) => acc + memberCount, 0));
    
        const embed = new EmbedBuilder()
            .setAuthor({ name: `${client.user.username}`, iconURL: `https://i.imgur.com/Yj7ldQ8.gif` })
            .setColor(client.color.orange.Pantone)
            .setThumbnail('https://i.imgur.com/Yj7ldQ8.gif')
            .setFooter({ text: `${client.user.username}` })
            .setTimestamp()
            .setDescription(`Thank you for inviting **${client.user.username}**!\n*Currently we are on ${addCommas(totalGuilds)} server(s) with the total of ${addCommas(totalMembers)} member(s).*`)
            .addFields(
                {
                    name: 'Question?',
                    value: `[Coming soon](${client.development.SupportServer})`,
                    inline: true
                },
                {
                    name: 'Invite Onami?',
                    value: `[Invite](${client.development.InviteLink})`,
                    inline: true
                }
            )
        try {
            guildChannel?.send({ embeds: [embed] });
            let owner = await guild.fetchOwner();
            Logger.log(`Guild ${guild.name} has just added the bot to their server. Owner: ${guild?.members?.cache?.get(owner.id).user.username}`);
        } catch (error) {
            console.log(error);
        }
    }
}