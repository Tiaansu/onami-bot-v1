const { ChatInputCommandInteraction, Client, SlashCommandBuilder } = require("discord.js");
const logger = require("../../Functions/Logger");

const chalk = require("chalk");

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
        
        logger.log("Testing normal log", "log");
        logger.log("Testing warn log", "warn");
        logger.log("Testing error log", "error");
        logger.log("Testing debug log", "debug");
        logger.log("Testing cmd log", "cmd");
        logger.log("Testing ready log", "ready");
        
        interaction.reply({
            content: `Testing Logger done.`,
            ephemeral: true
        })
    }
}