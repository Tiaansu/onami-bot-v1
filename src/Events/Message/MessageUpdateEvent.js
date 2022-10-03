const MessageLogSchema = require('../../Schemas/ChannelSchema/MessageLogChannelSchema');
const Logger = require('../../Functions/LoggerFunction');
const {
    EmbedBuilder,
    Message,
    Client
} = require('discord.js');

module.exports = {
    name: 'messageUpdate',
    once: false,

    /**
     * 
     * @param {Message} oldMessage 
     * @param {Message} newMessage 
     * @param {Client} client
     */
    async execute(oldMessage, newMessage, client) {
        if (oldMessage.author?.bot || newMessage.author?.bot) return;
        if (oldMessage.content == newMessage.content) return;
        if (oldMessage.guild.id !== newMessage.guild.id) return;

        const MessageLog = await MessageLogSchema.findOne({ Guild: oldMessage.guild.id, Activated: true });
        if (!MessageLog) return;

        const Channel = client.channels.cache.get(MessageLog.Channel);

        const embed = new EmbedBuilder()
            .setColor('Blue')
            .setAuthor({ name: newMessage.author.tag, iconURL: newMessage.author.displayAvatarURL() })
            .setTitle(`Message edited in ${oldMessage.channel.name}`)
            .addFields(
                {
                    name: '--Before',
                    value: `${oldMessage.content}`,
                    inline: true
                },
                {
                    name: '++After',
                    value: `${newMessage.content}`,
                    inline: true
                }
            )
            .setFooter({ text: `ID: ${newMessage.author.id}` })
            .setTimestamp()
        
        try {
            Channel.send({
                embeds: [embed]
            })
        } catch (error) {
            Logger.error(error);
        }
    }
}