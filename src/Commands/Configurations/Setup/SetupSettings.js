const {
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
    channelMention
} = require('discord.js');

const WelcomeChannelSchema = require('../../../Schemas/ChannelSchema/WelcomeChannelSchema');
const LeaveChannelSchema = require('../../../Schemas/ChannelSchema/LeaveChannelSchema');
const RulesChannelSchema = require('../../../Schemas/ChannelSchema/RulesChannelSchema');
const SuggestionChannelSchema = require('../../../Schemas/ChannelSchema/SuggestionChannelSchema');
const ChatBotChannelSchema = require('../../../Schemas/ChannelSchema/ChatBotChannelSchema');
const ModLogsChannelSchema = require('../../../Schemas/ChannelSchema/ModLogsChannelSchema');
const MessageLogsChannelSchema = require('../../../Schemas/ChannelSchema/MessageLogChannelSchema');
const { stripIndents } = require('common-tags');

module.exports = {
    subCommand: 'setup.settings',

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        try {

            let WelcomeChannel = await WelcomeChannelSchema.findOne({ Guild: interaction.guild.id, Activated: true });
            let LeaveChannel = await LeaveChannelSchema.findOne({ Guild: interaction.guild.id, Activated: true });
            let RulesChannel = await RulesChannelSchema.findOne({ Guild: interaction.guild.id, Activated: true });
            let SuggestionChannel = await SuggestionChannelSchema.findOne({ Guild: interaction.guild.id, Activated: true });
            let ChatBotChannel = await ChatBotChannelSchema.findOne({ Guild: interaction.guild.id, Activated: true });
            let MessageLogsChannel = await MessageLogsChannelSchema.findOne({ Guild: interaction.guild.id, Activated: true });
            let ModLogsChannel = await ModLogsChannelSchema.findOne({ Guild: interaction.guild.id, Activated: true });

            const SettingsEmbed = new EmbedBuilder()
                .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                .setDescription(`> **Enabled and Disabled channels in ${interaction.guild.name}**`)
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                .setColor('Green')
                .setTimestamp()
                .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                .addFields(
                    {
                        name: `${client.emotes.static.BlurpleTextChannel} Channels`,
                        value: stripIndents(`
                            ㅤ•ㅤ**Welcome Channel:** ${WelcomeChannel ? `${channelMention(WelcomeChannel.Channel)}` : client.emotes.static.StaffInactive}
                            ㅤ•ㅤ**Leave Channel:** ${LeaveChannel ? `${channelMention(LeaveChannel.Channel)}` : client.emotes.static.StaffInactive}
                            ㅤ•ㅤ**Rules Channel:** ${RulesChannel ? `${channelMention(RulesChannel.Channel)}` : client.emotes.static.StaffInactive}
                            ㅤ•ㅤ**Suggestion Channel:** ${SuggestionChannel ? `${channelMention(SuggestionChannel.Channel)}` : client.emotes.static.StaffInactive}
                            ㅤ•ㅤ**Chatbot Channel:** ${ChatBotChannel ? `${channelMention(ChatBotChannel.Channel)}` : client.emotes.static.StaffInactive}
                            ㅤ•ㅤ**Modlogs Channel:** ${ModLogsChannel ? `${channelMention(ModLogsChannel.Channel)}` : client.emotes.static.StaffInactive}
                            ㅤ•ㅤ**Message logs Channel:** ${MessageLogsChannel ? `${channelMention(MessageLogsChannel.Channel)}` : client.emotes.static.StaffInactive}
                        `),
                        inline: true
                    }
                )

            await interaction.reply({
                embeds: [SettingsEmbed]
            })

        } catch (error) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor('Red')
                        .setDescription(`An unexpected error occured.\nError: \`${err}\``)
                ],
                ephemeral: true
            })
        }
    }
}