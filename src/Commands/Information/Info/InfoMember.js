const { stripIndents } = require('common-tags');
const {
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
    hyperlink
} = require('discord.js');

const moment = require('moment');

module.exports = {
    subCommand: 'info.member',

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const member = interaction.options.getMember('choose-member') || interaction.member;

        if (member.presence?.status === undefined) {
            let rolenames;
            let roles = member.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()).slice(0, -1);

            rolenames = roles.join(' ');

            const UserEmbed = new EmbedBuilder()
                .setAuthor({ name: `⚫${member.user.tag}` })
                .setThumbnail(member.displayAvatarURL())
                .setDescription(`Chilling in offline status`)
                .addFields(
                    {
                        name: 'Joined Discord on',
                        value: `<t:${parseInt(member.user.createdAt / 1000)}:F> (<t:${parseInt(member.user.createdAt / 1000)}:R>)`
                    },
                    {
                        name: 'Joined this server on',
                        value: `<t:${parseInt(member.joinedAt / 1000)}:F> (<t:${parseInt(member.joinedAt / 1000)}:R>)`
                    },
                    {
                        name: `Roles [${roles.length || '0'}]`,
                        value: `${roles.length === 0 ? 'No roles' : `${rolenames}`}`
                    }
                );

            return interaction.reply({
                embeds: [UserEmbed]
            })
        }

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
            .setThumbnail(member.displayAvatarURL())
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

        let rolenames;
        let roles = member.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()).slice(0, -1);

        rolenames = roles.join(' ');
        
        let FoundValue = false;
        
        for (const value of member.presence.activities) {
            if (value.type === 0 || value.type === 1 || value.type === 2 || value.type === 3 || value.type === 5) {

                UserEmbed
                    .setDescription(`${await GetUserActivity('ActivityString', ActivityNames[value.type], value.name)}`)
                    .addFields(
                        {
                            name: `Roles [${roles.length || '0'}]`,
                            value: `${roles.length === 0 ? 'No roles' : `${rolenames}`}`
                        }
                    )

                interaction.reply({
                    embeds: [UserEmbed]
                })
                
                FoundValue = true;
            }
        }

        if (FoundValue === false) {
            try {
                UserEmbed
                    .setDescription(`Chilling in ${member.presence.status} status`)
                    .addFields(
                        {
                            name: `Roles [${roles.length || '0'}]`,
                            value: `${roles.length === 0 ? 'No roles' : `${rolenames}`}`
                        }
                    );
                interaction.reply({
                    embeds: [UserEmbed]
                })
            } catch (error) {
                Logger.error(error);
            }
        }
    }
}