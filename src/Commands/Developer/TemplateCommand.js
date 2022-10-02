const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    Client,
    PermissionFlagsBits
} = require('discord.js');

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("template")
        .setDescription("This is just a template.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client
     */
    execute(interaction, client) {
        
    }
}