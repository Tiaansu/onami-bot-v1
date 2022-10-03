const MessageLogSchema = require('../../Schemas/ChannelSchema/MessageLogChannelSchema');
const Logger = require('../../Functions/LoggerFunction');
const {
    EmbedBuilder,
    Message,
    Client,
} = require('discord.js');

module.exports = {
    name: 'messageDelete',
    once: false,

    /**
     * 
     * @param {Message} message 
     * @param {Client} client
     */
    async execute(message, client) {
        if (!message.content && !message.attachments) return;
        if (message.author?.bot) return;

        const MessageLog = await MessageLogSchema.findOne({ Guild: message.guild.id, Activated: true });
        if (!MessageLog) return;

        const Channel = client.channels.cache.get(MessageLog.Channel);

        const embed = new EmbedBuilder()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
            .setColor(client.color.discord.JellyBean)
            .setTitle(`Message deleted in #${message.channel.name}`)
            .setFooter({ text: `ID: ${message.author?.id}` })
            .setTimestamp();

        try {
            if (message.content) {
                embed.setDescription(message.content);
            }
            if (message.attachments.size !== 0) {
                embed.addFields(
                    {
                        name: 'Attachments',
                        value: `${message.attachments.map(attach => attach.name).toString()}`
                    }
                );
                embed.setImage(message.attachments.map(attach => attach.url).toString());
            }
            Channel.send({
                embeds: [embed]
            })
        } catch (error) {
            Logger.error(error);
        }
    }
}