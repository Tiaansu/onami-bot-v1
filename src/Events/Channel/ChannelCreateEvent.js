const ActionLogSchema = require('../../Schemas/ChannelSchema/ModLogsChannelSchema');
const Logger = require('../../Functions/LoggerFunction');
const {
    EmbedBuilder,
    Client,
    GuildChannel,
    ChannelType
} = require('discord.js');

const {
    stripIndents
} = require('common-tags');

module.exports = {
    name: 'channelCreate',
    once: false,

    /**
     * 
     * @param {GuildChannel} channel 
     * @param {Client} client 
     */
    async execute(channel, client) {
        if (channel.type === ChannelType.AnnouncementThread || channel.type === ChannelType.DM || channel.type === ChannelType.GroupDM || channel.type === ChannelType.PrivateThread || channel.type === ChannelType.PublicThread) {
            return;
        }

        const ActionLog = await ActionLogSchema.findOne({ Guild: channel.guild.id, Activated: true });
        if (!ActionLog) return;
        
        const Channel = client.channels.cache.get(ActionLog.Channel);

        const ChannelEmbed = new EmbedBuilder()
            .setFooter({ text: `Channel ID: ${channel.id}` })
            .setTimestamp()
            .setColor(client.color.discord.Eucalyptus);

        if (channel.type === ChannelType.GuildText) {
            try {
                ChannelEmbed
                    .setTitle('Text channel created')
                    .setDescription(stripIndents(`
                        **Name:** ${channel.name}
                        **Category:** ${channel.parent?.name === undefined ? 'None' : channel.parent.name}
                    `));

                channel.permissionOverwrites.cache.map(channels => channels).forEach(value => {
                    ChannelEmbed.addFields(
                        {
                            name: `Role override for ${channel.guild.roles.cache.get(value.id).name}`,
                            value: `**View channel:** ${value.allow.serialize(false).ViewChannel ? ':white_check_mark:' : ':x:'}`
                        }
                    )
                });
            } catch (error) {
                Logger.error(error);
            }
        }

        if (channel.type === ChannelType.GuildVoice) {
            try {
                ChannelEmbed
                    .setTitle('Voice channel created')
                    .setDescription(stripIndents(`
                        **Name:** ${channel.name}
                        **Category:** ${channel.parent?.name === undefined ? 'None' : channel.parent.name}
                    `));

                channel.permissionOverwrites.cache.map(channels => channels).forEach(value => {
                    ChannelEmbed.addFields(
                        {
                            name: `Role override for ${channel.guild.roles.cache.get(value.id).name}`,
                            value: stripIndents(`
                                **View channel:** ${value.allow.serialize(false).ViewChannel ? ':white_check_mark:' : ':x:'}
                                **Connect:** ${value.allow.serialize(false).Connect ? ':white_check_mark:' : ':x:'}
                            `)
                        }
                    )
                });
            } catch (error) {
                Logger.error(error);
            }
        }

        if (channel.type === ChannelType.GuildAnnouncement) {
            try {
                ChannelEmbed
                    .setTitle('Announcement channel created')
                    .setDescription(stripIndents(`
                        **Name:** ${channel.name}
                        **Category:** ${channel.parent?.name === undefined ? 'None' : channel.parent.name}
                    `));

                channel.permissionOverwrites.cache.map(channels => channels).forEach(value => {
                    ChannelEmbed.addFields(
                        {
                            name: `Role override for ${channel.guild.roles.cache.get(value.id).name}`,
                            value: `**Send messages:** ${value.allow.serialize(false).SendMessages ? ':white_check_mark:' : ':x:'}`
                        }
                    )
                });
            } catch (error) {
                Logger.error(error);
            }
        }

        if (channel.type === ChannelType.GuildForum) {
            try {
                ChannelEmbed
                    .setTitle('Forum channel created')
                    .setDescription(stripIndents(`
                        **Name:** ${channel.name}
                        **Category:** ${channel.parent?.name === undefined ? 'None' : channel.parent.name}
                    `));

                channel.permissionOverwrites.cache.map(channels => channels).forEach(value => {
                    ChannelEmbed.addFields(
                        {
                            name: `Role override for ${channel.guild.roles.cache.get(value.id).name}`,
                            value: `**View channel:** ${value.allow.serialize(false).ViewChannel ? ':white_check_mark:' : ':x:'}`
                        }
                    )
                });
            } catch (error) {
                Logger.error(error);
            }
        }

        if (channel.type === ChannelType.GuildStageVoice) {
            try {
                ChannelEmbed
                    .setTitle('Stage Voice channel created')
                    .setDescription(stripIndents(`
                        **Name:** ${channel.name}
                        **Category:** ${channel.parent?.name === undefined ? 'None' : channel.parent.name}
                    `));

                channel.permissionOverwrites.cache.map(channels => channels).forEach(value => {
                    ChannelEmbed.addFields(
                        {
                            name: `Role override for ${channel.guild.roles.cache.get(value.id).name}`,
                            value: stripIndents(`
                                **Manage channels:** ${value.allow.serialize(false).ManageChannels ? ':white_check_mark:' : ':x:'}
                                **Move members:** ${value.allow.serialize(false).MoveMembers ? ':white_check_mark:' : ':x:'}
                                **Mute members:** ${value.allow.serialize(false).MuteMembers ? ':white_check_mark:' : ':x:'}
                            `)
                        }
                    )
                });
            } catch (error) {
                Logger.error(error);
            }
        }

        if (channel.type === ChannelType.GuildCategory) {
            try {
                ChannelEmbed
                    .setTitle('Category channel created')
                    .setDescription(stripIndents(`
                        **Name:** ${channel.name}
                        **Category:** ${channel.parent?.name === undefined ? 'None' : channel.parent.name}
                    `));

                channel.permissionOverwrites.cache.map(channels => channels).forEach(value => {
                    ChannelEmbed.addFields(
                        {
                            name: `Role override for ${channel.guild.roles.cache.get(value.id).name}`,
                            value: stripIndents(`
                                **View channel:** ${value.allow.serialize(false).ViewChannel ? ':white_check_mark:' : ':x:'}
                                **Connect:** ${value.allow.serialize(false).Connect ? ':white_check_mark:' : ':x:'}
                            `)
                        }
                    )
                });
            } catch (error) {
                Logger.error(error);
            }
        }

        try {
            Channel.send({
                embeds: [ChannelEmbed],
            })
        } catch (error) {
            Logger.error(error);
        }
    }
}