const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    PermissionFlagsBits,
    Client
} = require("discord.js");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("Reload your commands or events.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand((option) => option
            .setName("events")
            .setDescription("Reload your events."))
        .addSubcommand((options) => options
            .setName("commands")
            .setDescription("Reload your commands.")),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client) {
        const subCommand = interaction.options.getSubcommand();

        // Continue tomorrow.
    }
}