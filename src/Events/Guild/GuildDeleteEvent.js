const {
    Client,
    Guild
} = require('discord.js');
const Logger = require('../../Functions/LoggerFunction');

module.exports = {
    name: "guildDelete",
    once: true,

    /**
     * 
     * @param {Guild} guild 
     * @param {Client} client 
     */
    async execute(guild, client) {
        Logger.log(`Guild ${guild.name} has just kicked the bot from their server.`);
    }
}