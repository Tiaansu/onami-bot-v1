const {
    Client,
    GuildMember
} = require('discord.js');

module.exports  = {
    name: 'guildMemberUpdate',
    once: false,

    /**
     * 
     * @param {GuildMember} oldMember 
     * @param {GuildMember} newMember 
     * @param {Client} client 
     */
    async execute(oldMember, newMember, client) {
        if (oldMember.displayAvatarURL !== newMember.displayAvatarURL) {
            console.log('YES');
        }
    }
}