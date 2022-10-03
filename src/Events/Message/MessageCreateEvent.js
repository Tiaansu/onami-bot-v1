const Logger = require('../../Functions/LoggerFunction');
const {
    Message,
    Client,
    ChannelType
} = require('discord.js');

module.exports = {
    name: 'messageCreate',
    once: false,

    /**
     * 
     * @param {Message} message 
     * @param {Client} client 
     */
    async execute(message, client) {
        if (message.author?.bot || message.channel.type === ChannelType.DM) return;

        // EXP & ChatBot struct soon.
    }
}