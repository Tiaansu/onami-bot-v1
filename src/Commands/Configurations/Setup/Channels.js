const {
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder
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
    subCommand: "setup.channels",
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

                    SendModAction(client, interaction, "Welcome channel");
                })
            }
            break;

            // continue tomorrow
        }
    }
}