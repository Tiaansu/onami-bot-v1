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
        
        let invite = await interaction.channel.createInvite({
            maxAge: 60 * 60,
            maxUses: 10,
            reason: 'Test'
        });

        
        interaction.reply({
            content: `Testing Logger done. https://discord.gg/${invite.code}`,
            ephemeral: true
        })
    }
}