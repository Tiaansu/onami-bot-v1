const {
    ChatInputCommandInteraction,
    Client,
    SlashCommandBuilder
} = require('discord.js');

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("testcmd")
        .setDescription("A command for the developer"),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client
     */
    async execute(interaction, client) {
        
        
        interaction.reply({
            content: `Testing done.`,
            ephemeral: true
        })
    }
}