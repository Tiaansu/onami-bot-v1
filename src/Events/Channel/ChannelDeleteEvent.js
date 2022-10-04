const ActionLogSchema = require('../../Schemas/ChannelSchema/ModLogsChannelSchema');
const Logger = require('../../Functions/LoggerFunction');
const {
    EmbedBuilder,
    GuildChannel,
    Client,
    ChannelType
} = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = {
    name: 'channelDelete',
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
            .setColor(client.color.discord.JellyBean);

        if (channel.type === ChannelType.GuildText) {
            try {
                ChannelEmbed
                    .setTitle('Text channel deleted')
                    .setDescription(stripIndents(`
                        **Name:** ${channel.name}
                        **Category:** ${channel.parent?.name === undefined ? 'None' : channel.parent.name}
                    `));
            } catch (error) {
                Logger.error(error);
            }
        }

        if (channel.type === ChannelType.GuildVoice) {
            try {
                ChannelEmbed
                    .setTitle('Voice channel deleted')
                    .setDescription(stripIndents(`
                        **Name:** ${channel.name}
                        **Category:** ${channel.parent?.name === undefined ? 'None' : channel.parent.name}
                    `));
            } catch (error) {
                Logger.error(error);
            }
        }

        if (channel.type === ChannelType.GuildAnnouncement) {
            try {
                ChannelEmbed
                    .setTitle('Announcement channel deleted')
                    .setDescription(stripIndents(`
                        **Name:** ${channel.name}
                        **Category:** ${channel.parent?.name === undefined ? 'None' : channel.parent.name}
                    `));
            } catch (error) {
                Logger.error(error);
            }
        }

        if (channel.type === ChannelType.GuildForum) {
            try {
                ChannelEmbed
                    .setTitle('Forum channel deleted')
                    .setDescription(stripIndents(`
                        **Name:** ${channel.name}
                        **Category:** ${channel.parent?.name === undefined ? 'None' : channel.parent.name}
                    `));
            } catch (error) {
                Logger.error(error);
            }
        }

        if (channel.type === ChannelType.GuildStageVoice) {
            try {
                ChannelEmbed
                    .setTitle('Stage Voice channel deleted')
                    .setDescription(stripIndents(`
                        **Name:** ${channel.name}
                        **Category:** ${channel.parent?.name === undefined ? 'None' : channel.parent.name}
                    `));
            } catch (error) {
                Logger.error(error);
            }
        }

        if (channel.type === ChannelType.GuildCategory) {
            try {
                ChannelEmbed
                    .setTitle('Category channel deleted')
                    .setDescription(stripIndents(`
                        **Name:** ${channel.name}
                        **Category:** ${channel.parent?.name === undefined ? 'None' : channel.parent.name}
                    `));
            } catch (error) {
                Logger.error(error);
            }
        }

        try {
            Channel.send({
                embeds: [ChannelEmbed]
            })
        } catch (error) {
            Logger.error(error);
        }
    }
}