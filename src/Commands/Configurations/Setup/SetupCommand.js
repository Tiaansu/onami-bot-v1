const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require('discord.js');

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("setup")
        .setDescription("Setup server events.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(subcommand =>
            subcommand
                .setName('channels')
                .setDescription('Setup channel events')
                .addStringOption(option =>
                    option
                        .setName('choose-channel')
                        .setDescription('Please choose one of listed events.')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Welcome Channel', value: 'welcome-channel' },
                            { name: 'Leave Channel', value: 'leave-channel' },
                            { name: 'Rules Channel', value: 'rule-channel' },
                            { name: 'Suggestion Channel', value: 'suggest-channel' },
                            { name: 'Chatbot Channel', value: 'chatbot-channel' },
                            { name: 'Modlogs Channel', value: 'modlog-channel' },
                            { name: 'Message Logs Channel', value: 'messagelog-channel' }
                        )
                )
                .addChannelOption(option =>
                    option
                        .setName('channel')
                        .setDescription('Please choose one of the listed channels')
                        .setRequired(true)    
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('settings')
                .setDescription('See which events are enabled and disabled')    
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Sends a guide on how to use /setup')    
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('disable')
                .setDescription('Disable channel events')
                .addStringOption(option =>
                    option
                        .setName('disable')
                        .setDescription('Please choose which one you want to disable')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Disable all', value: 'disable-all' },
                            { name: 'Welcome Channel', value: 'disable-welcome' },
                            { name: 'Leave Channel', value: 'disable-leave' },
                            { name: 'Rules Channel', value: 'disable-rules' },
                            { name: 'Suggestion Channel', value: 'disable-suggest' },
                            { name: 'Chatbot Channel', value: 'disable-chatbot' },
                            { name: 'Modlogs Channel', value: 'disable-modlogs' },
                            { name: 'Message Logs Channel', value: 'disable-messagelog' }
                        )    
                )
        )
}