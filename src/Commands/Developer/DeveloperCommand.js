const {
    ChatInputCommandInteraction,
    Client,
    SlashCommandBuilder
} = require('discord.js');

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("developer")
        .setDescription("A command for the developer"),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client
     */
    async execute(interaction, client) {
        // You can delete this file
    }
}