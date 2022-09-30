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

        const SubCommand = interaction.options.getSubcommand(false);
        if (SubCommand) {
            const SubCommandFile = client.subCommands.get(`${interaction.commandName}.${SubCommand}`);

            if (!SubCommandFile) {
                return interaction.send({
                    content: "This sub command is only available to developer.",
                    ephemeral: true
                });
            }
            SubCommandFile.execute(interaction, client);
        } else {
            command.execute(interaction, client);
        }
    }
}