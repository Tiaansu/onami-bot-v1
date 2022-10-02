const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ChatInputCommandInteraction,
    EmbedBuilder,
    Client
} = require('discord.js');

const Database = require('../../Schemas/UserSchema/InfractionSchema');
const ms = require('ms');
const Logger = require('../../Functions/LoggerFunction');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Timeout a member from talking / communicating')
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .setDMPermission(false)
        .addUserOption(option =>
            option
                .setName('member')
                .setDescription('The member that you want to timeout') 
                .setRequired(true)   
        )
        .addStringOption(option =>
            option
                .setName('duration')
                .setDescription('Provide a duration for this timeout, Ex: (1m, 1h, 1d)')
                .setRequired(true)    
        )
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('The reason of the timeout')
                .setMaxLength(512)    
        ),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client
     */
    async execute(interaction, client) {
        const {
            options,
            guild,
            member
        } = interaction;

        const target = options.getMember('member');
        const duration = options.getString('duration');
        const reason = options.getString('reason') || 'No reason provided';

        const errorsArray = [];

        const errorEmbed = new EmbedBuilder()
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setColor('Red');

        if (!target) {
            return interaction.reply({
                embeds: [errorEmbed.setDescription('The member is most likely left the server.')],
                ephemeral: true
            });
        }

        if (!ms(duration) || ms(duration) > ms('28d')) {
            errorsArray.push('The provided duration is invalid or over the 28 days limit.');
        }

        if (!target.manageable || !target.moderatable) {
            errorsArray.push('Selected target is not moderatable by the bot.');
        }

        if (member.roles.highest.position < target.roles.highest.position) {
            errorsArray.push('Selected member has a higher role position than you.');
        }

        if (errorsArray.length) {
            return interaction.reply({
                embeds: [errorEmbed.setDescription(errorsArray.join("\n"))],
                ephemeral: true
            })
        }

        target.timeout(ms(duration), reason).catch((err) => {
            interaction.reply({
                embeds: [errorEmbed.setDescription('Could not timeout user due to an unexpected error.')],
                ephemeral: true
            })
            return Logger.error(`Error occured in src/Commands/Moderation/TimeoutCommand.js: ${err}`);
        })

        const newInfractionsObject = {
            IssuerID: member.id,
            IssuerTag: member.user.tag,
            Reason: reason,
            Date: Date.now()
        }

        let userData = await Database.findOne({ Guild: guild.id, User: target.id });
        if (!userData) {
            userData = await Database.create({ Guild: guild.id, User: target.id, Infractions: [newInfractionsObject] });
        } else {
            userData.Infractions.push(newInfractionsObject) && await userData.save();
        }

        const successEmbed = new EmbedBuilder()
            .setAuthor({ name: 'Timeout issues', iconURL: guild.iconURL({ dynamic: true }) })
            .setColor('Gold')
            .setDescription([
                `${target} was issued a timeout for **${ms(ms(duration), {long: true})}** by ${member}`,
                `bringing their infractions total to ${userData.Infractions.length} points`,
                `\nReason: ${reason}`
            ].join("\n"))

        return interaction.reply({
            embeds: [successEmbed], ephemeral: true
        })
    }
}