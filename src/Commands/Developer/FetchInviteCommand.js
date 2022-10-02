const {
    ChatInputCommandInteraction,
    Client,
    SlashCommandBuilder
} = require('discord.js');
const moment = require('moment');

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("fetch")
        .setDescription("A command for the developer"),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client
     */
    async execute(interaction, client) {
        
        const invite = await interaction.guild.invites.fetch();
        invite.find((code) => console.log(moment(code.expiresTimestamp).format('LLLL')))

        
        interaction.reply({
            content: `Testing Logger done.`,
            ephemeral: true
        })
    }
}