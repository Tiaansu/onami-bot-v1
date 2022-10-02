const {
    ChatInputCommandInteraction,
    Client,
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
    userMention,
} = require('discord.js'); 

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Purge up to 100 messages')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addNumberOption(option =>
            option
                .setName('amount')
                .setDescription('How many message you want to purge?')
                .setRequired(true)    
        ),
    
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        let PurgeAmount = interaction.options.getNumber('amount');

        if (PurgeAmount > 100) {
            PurgeAmount = 100;
        }

        interaction.channel.bulkDelete(PurgeAmount, true);
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: false }) })
                    .addFields(
                        {
                            name: 'Amount',
                            value: `Successfully purge ${PurgeAmount} of ${PurgeAmount} messages.`,
                            inline: true
                        },
                        {
                            name: 'Purged by',
                            value: `${userMention(interaction.user.id)}`,
                            inline: true
                        }
                    )
                    .setColor(client.color.orange.Pantone)
            ]
        })
    }
}