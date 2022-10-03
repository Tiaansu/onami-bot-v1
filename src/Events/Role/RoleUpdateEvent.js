const ActionLogSchema = require('../../Schemas/ChannelSchema/ModLogsChannelSchema');
const Logger = require('../../Functions/LoggerFunction');
const {
    ConvertToHex
} = require('../../Functions/ConvertToHexFunction');
const {
    EmbedBuilder,
    Role,
    Client,
    inlineCode,
    PermissionFlagsBits
} = require('discord.js');

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

        const RoleEmbed = new EmbedBuilder()
            .setColor(client.color.discord.Blueberry)
            .setTitle(`Role "${oldRole.name}" updated`)
            .setFooter({ text: `Role ID: ${oldRole.id}` })
            .setTimestamp();

        if (!oldRole.color !== newRole.color) {
            RoleEmbed.addFields(
                {
                    name: 'Before',
                    value: `Color: ${oldRole.color === 0 ? '#000000' : ConvertToHex(oldRole.color)}`,
                    inline: true
                },
                {
                    name: 'After',
                    value: `Color: ${newRole.color === 0 ? '#000000' : ConvertToHex(newRole.color)}`,
                    inline: true
                }
            )
        }
        
       // check the missing permissions in newRole
        const removedPermissions = newRole.permissions.missing(oldRole.permissions)
        // check the missing permissions in oldRole (meaning it just got added)
        const addedPermissions = oldRole.permissions.missing(newRole.permissions)

        console.log(removedPermissions);
        console.log("");
        console.log(addedPermissions);

        

        // console.log(permUpdated);

        // let permsUpdated = [];

        // for (const [key, element] of Object.entries(oldPerms)) {
        //     if (newPerms[key] !== element) {
        //         permsUpdated.push(key);
        //     }
        // }

        // if (oldRole.permissions > newRole.permissions) {
        //     console.log(`${newRole.name} has lost the ${permsUpdated.join(', ')} permissions`);
        // } else if (oldRole.permissions < newRole.permissions) {
        //     console.log(`${newRole.name} has been given the ${permsUpdated.join(', ')} permission`);
        // }
    }
}