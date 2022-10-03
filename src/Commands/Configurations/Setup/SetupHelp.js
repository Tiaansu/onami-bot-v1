const {
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder
} = require('discord.js');

const {
    BtnPaginator
} = require('../../../Functions/ButtonPaginationFunction');

module.exports = {
    subCommand: 'setup.help',
    
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const HelpEmbedPageOne = new EmbedBuilder()
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setColor(client.color.orange.Pantone)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`> Hello there! I'm ${client.user.username}. Having trouble with **setup** command? Here's little explanation about each section or group: **Channels** you need to know!`)
    
        const ChannelEmbedGroup = new EmbedBuilder()
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setColor(client.color.orange.Pantone)
            .setImage('https://i.imgur.com/K0kYLqL.png')
            .addFields(
                {
                    name: '> Group: Channel',
                    value: 'Information about Channel events'
                },
                {
                    name: '> /setup channels `choose-channel` `channel`',
                    value: 'First while using **/setup channels** the first option will pop us is `choose-channel` which will show you a list of available **events**. And then the second will ask you which channel where the event will be executed at'
                },
                {
                    name: '> Extra information',
                    value: 'Use `/setup settings` to see which event are enabled or disabled on the server.'
                }
            )
        
        let Pages = [HelpEmbedPageOne, ChannelEmbedGroup];

        BtnPaginator(client, interaction, Pages);
    }
}