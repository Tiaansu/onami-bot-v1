const {
    ChatInputCommandInteraction
} = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction, client) {
        if (!ChatInputCommandInteraction) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) return interaction.reply({
            content: "This command is outdated.",
            ephemeral: true
        });

        if (command.developer && interaction.user.id !== "734302186644701205") {
            return interaction.reply({
                content: "This command is only available to developer.",
                ephemeral: true
            });
        }

        command.execute(interaction, client);
    }
}