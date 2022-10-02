const {
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder
} = require('discord.js');
const {
    loadCommands
} = require('../../../Handlers/CommandHandler');

module.exports = {
    subCommand: "reload.commands",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client) {
        loadCommands(client);
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                    .setDescription('Successfully reloaded commands.')
                    .setColor(client.color.orange.Pantone)
            ],
            ephemeral: true
        })
    }
}