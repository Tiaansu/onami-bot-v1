const ActionLogSchema = require('../../Schemas/ChannelSchema/ModLogsChannelSchema');
const Logger = require('../../Functions/LoggerFunction');

const {
    EmbedBuilder,
    GuildMember,
    Client,
    User,
    GuildManager
} = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = {
    name: 'userUpdate',
    once: false,

    /**
     * 
     * @param {User} oldUser 
     * @param {User} newUser 
     * @param {Client} client 
     */
    async execute(oldUser, newUser, client) {
        client.guilds.cache.map(guild => guild).forEach(async value => {
            const Actionlog = await ActionLogSchema.findOne({ Guild: value.id, Activated: true });
            if (!Actionlog) return;

            const Channel = client.channels.cache.get(Actionlog.Channel);
            const Guild = client.guilds.cache.get(Actionlog.Guild);
            const Member = Guild.members.cache.get(oldUser.id);
            
            if (Member) {
                const MemberUpdate = new EmbedBuilder()
                    .setColor(client.color.discord.Blueberry)
                    .setFooter({ text: `ID: ${oldUser.id}` })
                    .setTimestamp();

                if (oldUser.avatarURL() !== newUser.avatarURL()) {
                    MemberUpdate
                        .setAuthor({ name: newUser.tag, iconURL: newUser.displayAvatarURL() })
                        .setTitle('Avatar update')
                        .setDescription(`${newUser}`)
                        .setThumbnail(newUser.displayAvatarURL({ extension: 'png', size: 1024 }))
        
                    Channel.send({
                        embeds: [MemberUpdate]
                    })
                }

                if (oldUser.username !== newUser.username) {
                    MemberUpdate
                        .setAuthor({ name: newUser.tag, iconURL: newUser.displayAvatarURL() })
                        .setTitle('Name change')
                        .setDescription(stripIndents(`
                            **Before:** ${oldUser.username}
                            **+After:** ${newUser.username}
                        `))
        
                    Channel.send({
                        embeds: [MemberUpdate]
                    })
                }
            }
        });
    }
}