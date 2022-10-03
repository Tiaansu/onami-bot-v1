const {
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
    userMention
} = require('discord.js');

const WelcomeChannelSchema = require('../../../Schemas/ChannelSchema/WelcomeChannelSchema');
const LeaveChannelSchema = require('../../../Schemas/ChannelSchema/LeaveChannelSchema');
const RulesChannelSchema = require('../../../Schemas/ChannelSchema/RulesChannelSchema');
const SuggestionChannelSchema = require('../../../Schemas/ChannelSchema/SuggestionChannelSchema');
const ChatBotChannelSchema = require('../../../Schemas/ChannelSchema/ChatBotChannelSchema');
const ModLogsChannelSchema = require('../../../Schemas/ChannelSchema/ModLogsChannelSchema');
const MessageLogsChannelSchema = require('../../../Schemas/ChannelSchema/MessageLogChannelSchema');
const {
    stripIndents
} = require('common-tags');
const {
    SendModAction
} = require('../../../Functions/SendModActionFunction');

module.exports = {
    subCommand: 'setup.disable',

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client) {
        switch (interaction.options.getString('disable')) {
            case 'disable-all': {
                WelcomeChannelSchema.findOne({ Guild: interaction.guild.id, Activated: true }, async (err, data) => {
                    if (err) {
                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor('Red')
                                    .setDescription(`An unexpected error occured.\nError: \`${err}\``)
                            ],
                            ephemeral: true
                        })
                    }

                    if (data) {
                        data.delete();
                    }
                })

                LeaveChannelSchema.findOne({ Guild: interaction.guild.id, Activated: true }, async (err, data) => {
                    if (err) {
                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor('Red')
                                    .setDescription(`An unexpected error occured.\nError: \`${err}\``)
                            ],
                            ephemeral: true
                        })
                    }

                    if (data) {
                        data.delete();
                    }
                })

                RulesChannelSchema.findOne({ Guild: interaction.guild.id, Activated: true }, async (err, data) => {
                    if (err) {
                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor('Red')
                                    .setDescription(`An unexpected error occured.\nError: \`${err}\``)
                            ],
                            ephemeral: true
                        })
                    }

                    if (data) {
                        data.delete();
                    }
                })

                SuggestionChannelSchema.findOne({ Guild: interaction.guild.id, Activated: true }, async (err, data) => {
                    if (err) {
                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor('Red')
                                    .setDescription(`An unexpected error occured.\nError: \`${err}\``)
                            ],
                            ephemeral: true
                        })
                    }

                    if (data) {
                        data.delete();
                    }
                })

                ChatBotChannelSchema.findOne({ Guild: interaction.guild.id, Activated: true }, async (err, data) => {
                    if (err) {
                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor('Red')
                                    .setDescription(`An unexpected error occured.\nError: \`${err}\``)
                            ],
                            ephemeral: true
                        })
                    }

                    if (data) {
                        data.delete();
                    }
                })

                MessageLogsChannelSchema.findOne({ Guild: interaction.guild.id, Activated: true }, async (err, data) => {
                    if (err) {
                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor('Red')
                                    .setDescription(`An unexpected error occured.\nError: \`${err}\``)
                            ],
                            ephemeral: true
                        })
                    }

                    if (data) {
                        data.delete();
                    }
                })

                ModLogsChannelSchema.findOne({ Guild: interaction.guild.id, Activated: true }, async (err, data) => {
                    if (err) {
                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor('Red')
                                    .setDescription(`An unexpected error occured.\nError: \`${err}\``)
                            ],
                            ephemeral: true
                        })
                    }

                    if (data) {
                        data.delete();
                    }
                })

                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(client.color.orange.Pantone)
                            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                            .setDescription('Successfully disabled all events in this guild.')
                            .addFields(
                                {
                                    name: '> Disabled by',
                                    value: stripIndents(`
                                        ㅤ•ㅤ${interaction.user}
                                    `),
                                    inline: true
                                },
                            )
                    ]
                })
            }
            break;

            case 'disable-welcome': {
                WelcomeChannelSchema.findOne({ Guild: interaction.guild.id, Activated: true }, async (err, data) => {
                    if (err) {
                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor('Red')
                                    .setDescription(`An unexpected error occured.\nError: \`${err}\``)
                            ],
                            ephemeral: true
                        })
                    }

                    if (data) {
                        data.delete();
                    }

                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.color.orange.Pantone)
                                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                                .setDescription('Successfully disabled welcome messages in this guild.')
                                .addFields(
                                    {
                                        name: '> Disabled by',
                                        value: stripIndents(`
                                            ㅤ•ㅤ${interaction.user}
                                        `),
                                        inline: true
                                    },
                                )
                        ]
                    })

                    SendModAction(client, interaction, 'disable welcome message event.');
                })
            }
            break;

            case 'disable-leave': {
                LeaveChannelSchema.findOne({ Guild: interaction.guild.id, Activated: true }, async (err, data) => {
                    if (err) {
                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor('Red')
                                    .setDescription(`An unexpected error occured.\nError: \`${err}\``)
                            ],
                            ephemeral: true
                        })
                    }

                    if (data) {
                        data.delete();
                    }

                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.color.orange.Pantone)
                                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                                .setDescription('Successfully disabled leave messages in this guild.')
                                .addFields(
                                    {
                                        name: '> Disabled by',
                                        value: stripIndents(`
                                            ㅤ•ㅤ${interaction.user}
                                        `),
                                        inline: true
                                    },
                                )
                        ]
                    })

                    SendModAction(client, interaction, 'disable leave message event.');
                })
            }
            break;

            case 'disable-rules': {
                RulesChannelSchema.findOne({ Guild: interaction.guild.id, Activated: true }, async (err, data) => {
                    if (err) {
                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor('Red')
                                    .setDescription(`An unexpected error occured.\nError: \`${err}\``)
                            ],
                            ephemeral: true
                        })
                    }

                    if (data) {
                        data.delete();
                    }

                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.color.orange.Pantone)
                                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                                .setDescription('Successfully disabled rules channel in welcome messages.')
                                .addFields(
                                    {
                                        name: '> Disabled by',
                                        value: stripIndents(`
                                            ㅤ•ㅤ${interaction.user}
                                        `),
                                        inline: true
                                    },
                                )
                        ]
                    })

                    SendModAction(client, interaction, 'disable rules channel on welcome message event.');
                })
            }
            break;

            case 'disable-suggest': {
                SuggestionChannelSchema.findOne({ Guild: interaction.guild.id, Activated: true }, async (err, data) => {
                    if (err) {
                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor('Red')
                                    .setDescription(`An unexpected error occured.\nError: \`${err}\``)
                            ],
                            ephemeral: true
                        })
                    }

                    if (data) {
                        data.delete();
                    }

                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.color.orange.Pantone)
                                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                                .setDescription('Successfully disabled suggesting on this guild.')
                                .addFields(
                                    {
                                        name: '> Disabled by',
                                        value: stripIndents(`
                                            ㅤ•ㅤ${interaction.user}
                                        `),
                                        inline: true
                                    },
                                )
                        ]
                    })

                    SendModAction(client, interaction, 'disable suggestion event.');
                })
            }
            break;

            case 'disable-chatbot': {
                ChatBotChannelSchema.findOne({ Guild: interaction.guild.id, Activated: true }, async (err, data) => {
                    if (err) {
                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor('Red')
                                    .setDescription(`An unexpected error occured.\nError: \`${err}\``)
                            ],
                            ephemeral: true
                        })
                    }

                    if (data) {
                        data.delete();
                    }

                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.color.orange.Pantone)
                                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                                .setDescription('Successfully disabled chatbot feature on this guild.')
                                .addFields(
                                    {
                                        name: '> Disabled by',
                                        value: stripIndents(`
                                            ㅤ•ㅤ${interaction.user}
                                        `),
                                        inline: true
                                    },
                                )
                        ]
                    })

                    SendModAction(client, interaction, 'disable chatbot feature.');
                })
            }
            break;

            case 'disable-modlogs': {
                ModLogsChannelSchema.findOne({ Guild: interaction.guild.id, Activated: true }, async (err, data) => {
                    if (err) {
                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor('Red')
                                    .setDescription(`An unexpected error occured.\nError: \`${err}\``)
                            ],
                            ephemeral: true
                        })
                    }

                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.color.orange.Pantone)
                                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                                .setDescription('Successfully disabled mod action logs event on this guild.')
                                .addFields(
                                    {
                                        name: '> Disabled by',
                                        value: stripIndents(`
                                            ㅤ•ㅤ${interaction.user}
                                        `),
                                        inline: true
                                    },
                                )
                        ]
                    })

                    SendModAction(client, interaction, 'disable mod action logs event.');

                    if (data) {
                        data.delete();
                    }
                })
            }
            break;

            case 'disable-messagelog': {
                MessageLogsChannelSchema.findOne({ Guild: interaction.guild.id, Activated: true }, async (err, data) => {
                    if (err) {
                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor('Red')
                                    .setDescription(`An unexpected error occured.\nError: \`${err}\``)
                            ],
                            ephemeral: true
                        })
                    }

                    if (data) {
                        data.delete();
                    }

                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.color.orange.Pantone)
                                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                                .setDescription('Successfully disabled message logs event on this guild.')
                                .addFields(
                                    {
                                        name: '> Disabled by',
                                        value: stripIndents(`
                                            ㅤ•ㅤ${interaction.user}
                                        `),
                                        inline: true
                                    },
                                )
                        ]
                    })

                    SendModAction(client, interaction, 'disable message logs event.');
                })
            }
            break;
        }
    }
}