const {
    ChatInputCommandInteraction,
    Client,
    SlashCommandBuilder
} = require('discord.js');
const logger = require('../../Functions/LoggerFunction');

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("msg")
        .setDescription("A command for the developer")
        .addStringOption(option => option
            .setName('string')
            .setDescription('string kek')
            .setRequired(true))
        .addUserOption(option => option
            .setName('option')
            .setDescription('option kek')
            .setRequired(true)),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client
     */
    async execute(interaction, client) {

        const user = interaction.options.getUser('option');
        const message = interaction.options.getString('string');

        user.send({
            content: `${message}`
        })

        interaction.reply({
            content: `Testing Logger done.`,
            ephemeral: true
        })
    }
}