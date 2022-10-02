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
        .setName('ban')
        .setDescription('Ban a member from the server')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option =>
            option
                .setName('member')
                .setDescription('The member that you want to ban')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('The reason of the ban')
                .setRequired(false)    
        ),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const banUser = interaction.options.getUser('member');
        const banMember = interaction.guild.members.cache.get(banUser.id);
        if (!banMember) {
            return interaction.reply({
                content: 'The user specified doesn\'t exist on the server',
                ephemeral: true
            })
        }

        let banReason = interaction.options.getString('reason');
        if (!banReason) {
            banReason = 'No reason provided.';
        }

        try {
            await banMember.ban({
                reason: banReason
            })

            banMember.send({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                        .setDescription(`You have been banned from a server.\nServer: ${interaction.guild.name} \nBanned by: ${userMention(interaction.user.id)}\nReason: ${banReason}`)
                        .setColor('Red')
                        .setTimestamp()
                ]
            })

            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                        .setDescription(`Successfully banned a member.\nName: ${userMention(banUser.id)}\nReason: ${banReason}`)
                        .setColor('Green')
                        .setTimestamp()
                ]
            })
        } catch (error) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                        .setDescription(`Failed to banned ${userMention(banUser.id)}\nReason: \`${error}\``)
                        .setColor('Red')
                        .setTimestamp()
                ],
                ephemeral: true
            })
        }
    }
}