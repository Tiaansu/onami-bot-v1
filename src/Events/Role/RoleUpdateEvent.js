const ActionLogSchema = require('../../Schemas/ChannelSchema/ModLogsChannelSchema');
const Logger = require('../../Functions/LoggerFunction');
const {
    EmbedBuilder,
    Role,
    Client,
    inlineCode,
    PermissionFlagsBits
} = require('discord.js');
const {
    PermissionsText
} = require('../../Validations/PermissionValidation');
const { stripIndents } = require('common-tags');

module.exports = {
    name: 'roleUpdate',
    once: false,

    /**
     * 
     * @param {Role} oldRole
     * @param {Role} newRole 
     * @param {Client} client 
     */
    async execute(oldRole, newRole, client) {

        if (oldRole.rawPosition !== newRole.rawPosition) {
            return;
        }

        const Actionlog = await ActionLogSchema.findOne({ Guild: newRole.guild.id, Activated: true });
        if (!Actionlog) return;

        const Channel = client.channels.cache.get(Actionlog.Channel);

        const RoleEmbed = new EmbedBuilder()
            .setColor(client.color.discord.Blueberry)
            .setTitle(`Role "${oldRole.name}" updated`)
            .setFooter({ text: `Role ID: ${oldRole.id}` })
            .setTimestamp();

        try {
            RoleEmbed.addFields(
                {
                    name: 'Before',
                    value: stripIndents(`
                        ${oldRole.name !== newRole.name ? `**Name:** ${oldRole.name}` : ''}
                        ${oldRole.hexColor !== newRole.hexColor ? `**Color:** ${oldRole.hexColor}` : ''}
                        ${oldRole.hoist !== newRole.hoist ? `**Separated:** ${oldRole.hoist ? 'True' : 'False'}` : ''}
                        ${oldRole.mentionable !== newRole.mentionable ? `**Mentionable:** ${oldRole.mentionable ? 'True' : 'False'}` : ''}
                    `),
                    inline: true
                },
                {
                    name: 'After',
                    value: stripIndents(`
                        ${oldRole.name !== newRole.name ? `**Name:** ${newRole.name}` : ''}
                        ${oldRole.hexColor !== newRole.hexColor ? `**Color:** ${newRole.hexColor}` : ''}
                        ${oldRole.hoist !== newRole.hoist ? `**Separated:** ${newRole.hoist ? 'True' : 'False'}` : ''}
                        ${oldRole.mentionable !== newRole.mentionable ? `**Mentionable:** ${newRole.mentionable ? 'True' : 'False'}` : ''}
                    `),
                    inline: true
                }
            );
        } catch (error) {
            Logger.error(error);
        }

        if (oldRole.permissions !== newRole.permissions) {
            const newPerms = oldRole.permissions.missing(newRole.permissions, false);
            const oldPerms = newRole.permissions.missing(oldRole.permissions, false);

            let newPermArray = [];
            let oldPermArray = [];

            for (const perm of newPerms) {
                if (!PermissionsText[perm]) {
                    return;
                }
                newPermArray.push(PermissionsText[perm]);
            }

            for (const perm of oldPerms) {
                if (!PermissionsText[perm]) {
                    return;
                }
                oldPermArray.push(PermissionsText[perm]);
            }

            try {
                RoleEmbed.addFields(
                    {
                        name: 'New permissions',
                        value: stripIndents(`
                            ${newPermArray.length === 0 ? '' : `**Added:** ${newPermArray.join(', ')}`}
                            ${oldPermArray.length === 0 ? '' : `**Removed:** ${oldPermArray.join(', ')}`}
                        `),
                        inline: true
                    }
                );
            } catch (error) {
                Logger.error(error);
            }
        }
        
        try {
            Channel.send({
                embeds: [RoleEmbed]
            })
        } catch (error) {
            Logger.error(error);
        }
    }
}