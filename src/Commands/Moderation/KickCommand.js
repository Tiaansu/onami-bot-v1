const {
    ChatInputCommandInteraction,
    Client,
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
    userMention,
    hyperlink
} = require('discord.js'); 

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a member from the server')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option =>
            option
                .setName('member')
                .setDescription('The member that you want to kick')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('The reason of the kick')
                .setRequired(false)    
        ),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client ){
        const KickUser = interaction.options.getUser('member');
        const KickMember = interaction.guild.members.cache.get(KickUser.id);
        if (!KickMember) {
            return interaction.reply({
                content: 'The user specified doesn\'t exist on the server',
                ephemeral: true
            })
        }

        let KickReason = interaction.options.getString('reason');
        if (!KickReason) {
            KickReason = 'No reason provided.';
        }

        try {
            await interaction.guild.members.kick(KickMember, {
                reason: KickReason
            })

            let invite = await interaction.channel.createInvite({
                maxAge: 1, // too bad... let's make it 1 seconds :D
                maxUses: 10,
                reason: 'Test'
            });

            KickUser.send({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                        .setColor('Red')
                        .setDescription(`You have been kicked from a server.\nServer: ${hyperlink(interaction.guild.name, `https://discord.gg/${invite}`, interaction.guild.name)}\nKicked by: ${userMention(interaction.user.id)}\nReason: ${KickReason}`)
                        .setTimestamp()
                ]
            })

            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                        .setDescription(`Successfully kicked a member.\nName: ${userMention(KickUser.id)}\nReason: ${KickReason}`)
                        .setColor('Green')
                        .setTimestamp()
                ]
            })

        } catch (error) {
            
        }
    }
}