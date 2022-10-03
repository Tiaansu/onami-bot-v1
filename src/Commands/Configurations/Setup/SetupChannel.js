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
    subCommand: 'setup.channels',
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client) {
        const Channel = interaction.options.getChannel('channel');

        switch (interaction.options.getString('choose-channel')) {
            case 'welcome-channel': {
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

                    data = new WelcomeChannelSchema({
                        Guild: interaction.guild.id,
                        Channel: Channel.id,
                        Author: interaction.user.id,
                        Activated: true
                    })
                    
                    data.save();

                    Channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setColor('Green')
                                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                                .setDescription('I will send welcome messages here from now.')
                                .setFooter({ text: `Enabled by: ${interaction.user.username}` })
                                .setTimestamp()
                        ]
                    })

                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.color.orange.Pantone)
                                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                                .setDescription('Successfully enabled welcome channel event.')
                                .addFields(
                                    {
                                        name: '> Enabled by',
                                        value: stripIndents(`
                                            ㅤ•ㅤ${interaction.user}
                                        `),
                                        inline: true
                                    },
                                    {
                                        name: '> Channel',
                                        value: stripIndents(`
                                            ㅤ•ㅤ${Channel}
                                        `),
                                        inline: true
                                    }
                                )
                        ]
                    })

                    SendModAction(client, interaction, 'Welcome event');
                })
            }
            break;

            case 'leave-channel': {
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

                    data = new LeaveChannelSchema({
                        Guild: interaction.guild.id,
                        Channel: Channel.id,
                        Author: interaction.user.id,
                        Activated: true
                    })

                    data.save();

                    Channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setColor('Green')
                                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                                .setDescription('I will send farewell messages here from now.')
                                .setFooter({ text: `Enabled by: ${interaction.user.username}` })
                                .setTimestamp()
                        ]
                    })

                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.color.orange.Pantone)
                                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                                .setDescription('Successfully enabled leave/quit channel event.')
                                .addFields(
                                    {
                                        name: '> Enabled by',
                                        value: stripIndents(`
                                            ㅤ•ㅤ${interaction.user}
                                        `),
                                        inline: true
                                    },
                                    {
                                        name: '> Channel',
                                        value: stripIndents(`
                                            ㅤ•ㅤ${Channel}
                                        `),
                                        inline: true
                                    }
                                )
                        ]
                    })

                    SendModAction(client, interaction, 'Leave event');
                })
            }
            break;

            case 'rule-channel': {
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

                    data = new RulesChannelSchema({
                        Guild: interaction.guild.id,
                        Channel: Channel.id,
                        Author: interaction.user.id,
                        Activated: true
                    })

                    data.save();

                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.color.orange.Pantone)
                                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                                .setDescription('Successfully added rules channel to welcome message.')
                                .addFields(
                                    {
                                        name: '> Enabled by',
                                        value: stripIndents(`
                                            ㅤ•ㅤ${interaction.user}
                                        `),
                                        inline: true
                                    },
                                    {
                                        name: '> Channel',
                                        value: stripIndents(`
                                            ㅤ•ㅤ${Channel}
                                        `),
                                        inline: true
                                    }
                                )
                        ]
                    })

                    SendModAction(client, interaction, 'added rules channel to welcome message');
                })
            }
            break;

            case 'suggest-channel': {
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

                    data = new SuggestionChannelSchema({
                        Guild: interaction.guild.id,
                        Channel: Channel.id,
                        Author: interaction.user.id,
                        Activated: true
                    })

                    data.save();

                    Channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setColor('Green')
                                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                                .setDescription('**Suggesting are enabled on this channel**.\n\nWant to suggest something? Type **/suggest** and enter your suggestion!')
                                .setFooter({ text: `Enabled by: ${interaction.user.username}` })
                                .setTimestamp()
                        ]
                    })

                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.color.orange.Pantone)
                                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                                .setDescription('Successfully added suggestion channel.')
                                .addFields(
                                    {
                                        name: '> Enabled by',
                                        value: stripIndents(`
                                            ㅤ•ㅤ${interaction.user}
                                        `),
                                        inline: true
                                    },
                                    {
                                        name: '> Channel',
                                        value: stripIndents(`
                                            ㅤ•ㅤ${Channel}
                                        `),
                                        inline: true
                                    }
                                )
                        ]
                    })

                    SendModAction(client, interaction, 'suggestion event');
                })
            }
            break;

            case 'chatbot-channel': {
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

                    data = new ChatBotChannelSchema({
                        Guild: interaction.guild.id,
                        Channel: Channel.id,
                        Author: interaction.user.id,
                        Activated: true
                    })

                    data.save();

                    Channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setColor('Green')
                                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                                .setDescription(`If you want ${userMention(client.user.id)} to not respond on your message on this channel, put **.** at first message\nExample: *. hello*`)
                                .setFooter({ text: `Enabled by: ${interaction.user.username}` })
                                .setTimestamp()
                        ]
                    })

                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.color.orange.Pantone)
                                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                                .setDescription('Successfully enabled AI chatbot feature.')
                                .addFields(
                                    {
                                        name: '> Enabled by',
                                        value: stripIndents(`
                                            ㅤ•ㅤ${interaction.user}
                                        `),
                                        inline: true
                                    },
                                    {
                                        name: '> Channel',
                                        value: stripIndents(`
                                            ㅤ•ㅤ${Channel}
                                        `),
                                        inline: true
                                    }
                                )
                        ]
                    })

                    SendModAction(client, interaction, 'AI chatbot event');
                })
            }
            break;

            case 'modlog-channel': {
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

                    data = new ModLogsChannelSchema({
                        Guild: interaction.guild.id,
                        Channel: Channel.id,
                        Author: interaction.user.id,
                        Activated: true
                    })

                    data.save();

                    Channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setColor('Green')
                                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                                .setDescription(`I will send all actions that were executed on ${userMention(client.user.id)}`)
                                .setFooter({ text: `Enabled by: ${interaction.user.username}` })
                                .setTimestamp()
                        ]
                    })

                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.color.orange.Pantone)
                                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                                .setDescription('Successfully enabled mod action logs event.')
                                .addFields(
                                    {
                                        name: '> Enabled by',
                                        value: stripIndents(`
                                            ㅤ•ㅤ${interaction.user}
                                        `),
                                        inline: true
                                    },
                                    {
                                        name: '> Channel',
                                        value: stripIndents(`
                                            ㅤ•ㅤ${Channel}
                                        `),
                                        inline: true
                                    }
                                )
                        ]
                    })

                    SendModAction(client, interaction, 'Action logs event');
                })
            }
            break;

            case 'messagelog-channel': {
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

                    data = new MessageLogsChannelSchema({
                        Guild: interaction.guild.id,
                        Channel: Channel.id,
                        Author: interaction.user.id,
                        Activated: true
                    })

                    data.save();

                    Channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setColor('Green')
                                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                                .setDescription(`Message logs have been enabled on this channel.`)
                                .setFooter({ text: `Enabled by: ${interaction.user.username}` })
                                .setTimestamp()
                        ]
                    })

                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.color.orange.Pantone)
                                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                                .setDescription('Successfully enabled message logs event.')
                                .addFields(
                                    {
                                        name: '> Enabled by',
                                        value: stripIndents(`
                                            ㅤ•ㅤ${interaction.user}
                                        `),
                                        inline: true
                                    },
                                    {
                                        name: '> Channel',
                                        value: stripIndents(`
                                            ㅤ•ㅤ${Channel}
                                        `),
                                        inline: true
                                    }
                                )
                        ]
                    })

                    SendModAction(client, interaction, 'message logs event');
                })
            }
            break;
        }
    }
}