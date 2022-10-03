const ActionLogSchema = require('../../Schemas/ChannelSchema/ModLogsChannelSchema');
const Logger = require('../../Functions/LoggerFunction');
const moment = require('moment');
const {
    EmbedBuilder,
    Role,
    Client,
    inlineCode
} = require('discord.js');
const {
    stripIndents
} = require('common-tags');
const {
    ConvertToHex
} = require('../../Functions/ConvertToHexFunction');

module.exports = {
    name: 'roleDelete',
    once: false,

    /**
     * 
     * @param {Role} role 
     * @param {Client} client 
     */
    async execute(role, client) {
        const ActionLogs = await ActionLogSchema.findOne({ Guild: role.guild.id, Activated: true });
        if (!ActionLogs) return;

        const Channel = client.channels.cache.get(ActionLogs.Channel);

        const embed = new EmbedBuilder()
            .setTitle(`Role "${role.name}" removed`)
            .setColor(client.color.discord.JellyBean)
            .setFooter({ text: `Role ID: ${role.id}` })
            .setTimestamp()
            .setDescription(stripIndents(`
                **Name:** ${role.name}
                **Color:** ${role.color === 0 ? '#000000' : ConvertToHex(role.color)}
                **Mentionable:** ${role.mentionable ? 'True' : 'False'}
                **Displayed separately:** ${role.hoist ? 'True' : 'False'}
                **Position:** ${role.rawPosition}
                Created: ${inlineCode(moment(role.createdAt).format('LLLL'))} which was ${inlineCode(moment(role.createdAt).startOf('year month week isoWeek day hour minute second').fromNow())}
            `))

        try {
            Channel.send({
                embeds: [embed]
            })
        } catch (error) {
            Logger.error(error);
        }
    }
}