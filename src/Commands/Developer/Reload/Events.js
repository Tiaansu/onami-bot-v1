const {
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder
} = require('discord.js');
const {
    loadEvents
} = require('../../../Handlers/EventHandler');

module.exports = {
    subCommand: "reload.events",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client) {
        for (const [key, value] of client.events) {
            client.removeListener(`${key}`, value, true);
            loadEvents(client);
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                        .setDescription('Successfully reloaded events.')
                        .setColor(client.color.orange.Pantone)
                ],
                ephemeral: true
            })
        }
    }
}