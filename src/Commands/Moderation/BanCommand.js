const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    PermissionFlagsBits,
    Client,
    userMention
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a member from the server')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option => option
            .setName('member')
            .setDescription('Choose member to ban from the server')
            .setRequired(true))
        .addStringOption(option => option
            .setName('reason')
            .setDescription('Reason of the ban')
            .setRequired(false)),
    
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const targetUser = interaction.options.getUser('member');
        
        let BanReason = interaction.options.getString('reason');
        const member = interaction.guild.members.cache.get(targetUser.id);

        if (!member) {
            return interaction.reply({
                content: "The user specified doesn't exist in the server.",
                ephemeral: true
            });
        }

        if (!BanReason) {
            BanReason = 'No reason provided.';
        }

        try {
            await interaction.guild.members.ban(member, {
                reason: BanReason
            })
        } catch (e) {
            return interaction.reply({
                content: `Cannot ban the user ${user.tag}\n\`\`\`${e}\`\`\``,
                ephemeral: true
            });
        }

        targetUser.send({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
                    .setColor(client.color.orange.Pantone)
                    .setTimestamp()
                    .setDescription(`You have been banned from **${interaction.guild.name}** for the following reasons:\n\n**Banned by:** ${userMention(interaction.user.id)}\n**Reason:** ${BanReason}`)
            ]
        })

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
                    .setColor('Green')
                    .setTimestamp()
                    .setDescription(`Successfully banned ${userMention(targetUser.id)} from this server. Reason: ${BanReason}`)
            ],
            ephemeral: true
        })
    }
}