const ActionLogSchema = require('../../Schemas/ChannelSchema/ModLogsChannelSchema');
const Logger = require('../../Functions/LoggerFunction');

const {
    EmbedBuilder,
    GuildChannel,
    Client,
    PermissionFlagsBits,
    AuditLogEvent
} = require('discord.js');

module.exports = {
    name: 'channelUpdate',
    once: false,

    /**
     * 
     * @param {GuildChannel} oldChannel 
     * @param {GuildChannel} newChannel 
     * @param {Client} client 
     */
    async execute(oldChannel, newChannel, client) {

        let newPerms, oldPerms, resetPerm_Old, resetPerm_New;

        oldChannel.permissionOverwrites.cache.map(channels => channels).forEach(value => {
            newChannel.permissionOverwrites.cache.map(ch => ch).forEach(val => {
                // console.log('Name', value.allow.serialize(false), 'Old Bitfield: Allow', value.allow.bitfield, 'Old Bitfield: Deny', value.deny.bitfield);
                // console.log('Name', val.allow.serialize(false), 'New Bitfield: Allow', val.allow.bitfield, 'New Bitfield: Deny', val.deny.bitfield);

                // console.log('Old Bitfield: Allow', value.allow.bitfield, 'Old Bitfield: Deny', value.deny.bitfield);
                // console.log('New Bitfield: Allow', val.allow.bitfield, 'New Bitfield: Deny', val.deny.bitfield);
            })
        })

        oldChannel.permissionOverwrites.cache.map(channel => channel).forEach(value => {
            newChannel.permissionOverwrites.cache.map(ch => ch).forEach(val => {
                newPerms = value.allow.missing(val.allow.bitfield, false);

                // resetPerm_Old = value.allow.bitfield === value.deny.bitfield;
                // resetPerm_Old = value.allow.missing(val.allow.bitfield, false) && (value.allow.bitfield === value.deny.bitfield);
                if (value.allow.bitfield === value.deny.bitfield) {
                    resetPerm_Old = value.allow.missing(val.allow.bitfield, false);
                }
            })
        })

        newChannel.permissionOverwrites.cache.map(channel => channel).forEach(value => {
            oldChannel.permissionOverwrites.cache.map(ch => ch).forEach(val => {
                oldPerms = value.allow.missing(val.allow.bitfield, false);

                // resetPerm_New = value.allow.bitfield === value.deny.bitfield;
                // resetPerm_New = value.allow.missing(val.allow.bitfield, false) && (value.allow.bitfield === value.deny.bitfield);
                if (value.allow.bitfield === value.deny.bitfield) {
                    resetPerm_New = value.allow.missing(val.allow.bitfield, false);
                }
            })
        })

        // console.log('newperms', newPerms);
        // console.log('oldperms', oldPerms);

        // console.log('Reset Perm New', resetPerm_New);
        // console.log('Reset Perm Old', resetPerm_Old);

    }
}