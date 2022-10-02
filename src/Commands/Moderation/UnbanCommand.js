const {
    ChatInputCommandInteraction,
    Client,
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
    userMention
} = require('discord.js'); 

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unban a member from the server')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addStringOption(option =>
            option
                .setName('member')
                .setDescription('The member that you want to unban')   
                .setRequired(true) 
        )
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('The reason of the unban')   
                .setRequired(false) 
        ),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const UnbanUser = interaction.options.getString('member');
        const UnbanReason = interaction.options.getString('reason');

        await interaction.guild.bans.fetch()
            .then(async bans => {
                if (bans.size === 0) {
                    return await interaction.reply({
                        content: 'There is no user banned on this server.',
                        ephemeral: true
                    })
                }

                let BannedID = await bans.find(ban => ban.user.id === UnbanUser);
                if (!BannedID) {
                    return interaction.reply({
                        content: 'The member specified is not banned on this server.',
                        ephemeral: true
                    })
                }

                await interaction.guild.bans.remove(UnbanUser, UnbanReason)
                    .then(() => {
                        interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                                    .setColor('Green')
                                    .setDescription(`Successfully unban a user.\nUser: ${userMention(UnbanUser)}\nReason: ${UnbanReason}`)
                                    .setTimestamp()
                            ]
                        })
                    })
                    .catch(err => {
                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                                    .setColor('Red')
                                    .setDescription(`There was an error while unbanning user ${userMention(UnbanUser)}\nError: \`${err}\``)
                                    .setTimestamp()
                            ],
                            ephemeral: true
                        })
                    })
            })
    }
}