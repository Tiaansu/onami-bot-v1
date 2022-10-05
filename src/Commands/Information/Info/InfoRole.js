const {
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder
} = require('discord.js');

const {
    PermissionsText
} = require('../../../Validations/PermissionValidation');

const moment = require('moment');
const { stripIndents } = require('common-tags/lib');

module.exports = {
    subCommand: 'info.role',

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const role = interaction.options.getRole('choose-role');
        const roles = interaction.guild.roles.cache.size;
        const roleCount = interaction.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()).slice(0, -1);

        const roleNote = role.permissions.toArray();
        const rolePerms = [];
        roleNote.forEach((perms) => {
            if (PermissionsText[perms]) {
                if (PermissionsText[perms] === '') return;
                rolePerms.push(PermissionsText[perms]);
            }
        })

        const embed = new EmbedBuilder()
            .setThumbnail(interaction.guild.iconURL())
            .setAuthor({ name: `Role information about: ${role.name}`, iconURL: client.user.displayAvatarURL() })
            .setFooter({ text: `© | ${client.user.username} | ${moment().format('YYYY')}`, iconURL: client.user.displayAvatarURL() })
            .setColor(role.hexColor)
            .addFields(
                {
                    name: 'Role information',
                    value: stripIndents(`
                        ㅤ•ㅤThis role was created at **${moment(role.createdAt).format('LLLL')}**
                    `)
                },
                {
                    name: 'Role',
                    value: stripIndents(`
                        ㅤ•ㅤ${role}
                    `)
                },
                {
                    name: 'Role id',
                    value: stripIndents(`
                        ㅤ•ㅤ${role.id}
                    `)
                },
                {
                    name: 'Role color',
                    value: stripIndents(`
                        ㅤ•ㅤ${role.hexColor}
                    `)
                },
                {
                    name: 'Role position',
                    value: stripIndents(`
                        ㅤ•ㅤ${roles - role.position}/${roleCount.length}
                    `)
                },
                {
                    name: 'Role mentionable',
                    value: stripIndents(`
                        ㅤ•ㅤ${role.mentionable}
                    `)
                },
                {
                    name: 'Role current permissions',
                    value: stripIndents(`
                        ㅤ•ㅤ${rolePerms.join(', ')}
                    `)
                }
            )

        interaction.reply({
            embeds: [embed]
        })
    }
}