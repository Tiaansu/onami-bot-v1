const { stripIndents } = require('common-tags');
const {
    ChatInputCommandInteraction,
    Client,
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');

const Logger = require('../../Functions/LoggerFunction');

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("testcmd")
        .setDescription("A command for the developer")
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('user')
                .setRequired(true)
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client
     */
    async execute(interaction, client) {
        // Test Command
    }
}