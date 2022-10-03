const {
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
    userMention
} = require('discord.js');

const ModLogsChannelSchema = require('../Schemas/ChannelSchema/ModLogsChannelSchema');

/**
 * 
 * @param {Client} client 
 * @param {ChatInputCommandInteraction} interaction 
 */
async function SendModAction(client, interaction, action) {
    ModLogsChannelSchema.findOne({ Guild: interaction.guild.id, Activated: true }, async (err, data) => {
        if (err) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Red')
                        .setDescription(`An unexpected error occured.\nError: \`${err}\``)
                ],
                ephemeral: true
            })
        }

        if (!data) return;

        const ActionLogChannel = client.channels.cache.get(data.Channel);

        ActionLogChannel.send({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                    .setDescription(`${userMention(interaction.user.id)} took an action: ${action}`)
                    .setColor('Green')
                    .setTimestamp()
            ]
        })
    })
}

module.exports = {
    SendModAction
}