const {
    SlashCommandBuilder,
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Get information about server, role, or member')
        .addSubcommand(subcommand =>
            subcommand
                .setName('role')
                .setDescription('Get information about specific role')
                .addRoleOption(option =>
                    option
                        .setName('choose-role')
                        .setDescription('Choose which role do you want to check')
                        .setRequired(true) 
                )    
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('Get information about the server')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('member')
                .setDescription('Get information about specific member')
                .addUserOption(option =>
                    option
                        .setName('choose-member')
                        .setDescription('Choose which member do you want to check')
                )    
        )
}