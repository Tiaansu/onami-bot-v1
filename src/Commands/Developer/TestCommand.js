const { stripIndents } = require('common-tags');
const {
    ChatInputCommandInteraction,
    Client,
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');

const Logger = require('../../Functions/LoggerFunction');

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("testcmd")
        .setDescription("A command for the developer")
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('user')
                .setRequired(true)
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client
     */
    async execute(interaction, client) {
        const member = interaction.options.getMember('user');

        const Statuses = {
            dnd: '🔴',
            idle: '🟡',
            online: '🟢'
        };

        const ActivityNames = {
            0: 'Playing',
            1: 'Streaming',
            2: 'Listening',
            3: 'Watching',
            4: 'CustomStatus',
            5: 'Competing'
        };

        let Activities = {
            ActivityString: {
                'Playing': 'Playing: %VAR%',
                'Streaming': 'Streaming: %VAR%',
                'Listening': 'Listening to: %VAR%',
                'Watching': 'Watching: %VAR%',
                'CustomStatus': '%VAR%: %VAR%',
                'Competing': 'Competing in: %VAR%'
            }
        }

        function GetUserActivity(ActivityString, string, ...vars) {
            let Activity = Activities[ActivityString][string];

            let count = 0;
            Activity = Activity.replace(/%VAR%/g, () => vars[count] !== null ? vars[count] : '%VAR%');

            return Activity;
        }

        const UserEmbed = new EmbedBuilder()
            .setAuthor({ name: `${Statuses[member.presence.status]}${member.user.tag}` })
            .addFields(
                {
                    name: 'Joined Discord on',
                    value: `<t:${parseInt(member.user.createdAt / 1000)}:F> (<t:${parseInt(member.user.createdAt / 1000)}:R>)`
                },
                {
                    name: 'Joined this server on',
                    value: `<t:${parseInt(member.joinedAt / 1000)}:F> (<t:${parseInt(member.joinedAt / 1000)}:R>)`
                }
            );

        
        let FoundValue = false;
        
        for (const value of member.presence.activities) {
            if (value.type === 0 || value.type === 1 || value.type === 2 || value.type === 3 || value.type === 5) {

                UserEmbed.setDescription(`${await GetUserActivity('ActivityString', ActivityNames[value.type], value.name)}`);

                interaction.reply({
                    embeds: [UserEmbed],
                    ephemeral: true
                })
                
                FoundValue = true;
            }
        }

        if (FoundValue === false) {
            try {
                UserEmbed.setDescription(`Chilling in ${member.presence.status} status`);
                interaction.reply({
                    embeds: [UserEmbed],
                    ephemeral: true
                })
            } catch (error) {
                Logger.error(error);
            }
        }
    }
}