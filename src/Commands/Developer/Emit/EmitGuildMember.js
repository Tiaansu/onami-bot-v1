const {
    Client,
    ChatInputCommandInteraction
} = require('discord.js');

module.exports = {
    subCommand: 'emit.guild-member',
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client) {
        const choices = interaction.options.getString('event');

        switch (choices) {
            case 'guildMemberAdd': {
                client.emit('guildMemberAdd', interaction.member);
                interaction.reply({
                    content: `Successfully emitted event ${choices}`,
                    ephemeral: true
                })
            }
            break;

            case 'guildMemberRemove': {
                client.emit('guildMemberRemove', interaction.member);
                interaction.reply({
                    content: `Successfully emitted event ${choices}`,
                    ephemeral: true
                })
            }
        }
    }
}