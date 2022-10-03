const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require('discord.js');

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("emit")
        .setDescription("Emits a event.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(subcommand =>
            subcommand
                .setName('guild-member')
                .setDescription('Guild member events')
                .addStringOption(option =>
                    option
                        .setName('event')
                        .setDescription('Choose which event you want to emit')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Guild Member Add', value: 'guildMemberAdd' },
                            { name: 'Guild Member Remove', value: 'guildMemberRemove' }
                        )
                )    
        ),
}