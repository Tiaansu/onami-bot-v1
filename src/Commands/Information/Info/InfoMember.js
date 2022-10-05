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
        
        // const mentionedUser = interaction.options.getMember('choose-member') || interaction.member;

        // let rolenames;
        // let roles = mentionedUser.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()).slice(0, -1);

        // rolenames = roles.join(' ');

        // const embed = new EmbedBuilder()
        //     .setAuthor({ name: mentionedUser.user.tag, iconURL: mentionedUser.displayAvatarURL() })
        //     .setFooter({ text: `© | ${client.user.username} | ${moment().format('YYYY')}`, iconURL: client.user.displayAvatarURL() })
        //     .setThumbnail(mentionedUser.displayAvatarURL())
        //     .setColor(mentionedUser.displayHexColor)
        //     .addFields(
        //         {
        //             name: 'Member',
        //             value: stripIndents(`
        //                 ㅤ•ㅤUsername: ${mentionedUser} - \`${mentionedUser.id}\`
        //                 ㅤ•ㅤAvatar: ${hyperlink('JPG', mentionedUser.displayAvatarURL({ extension: 'jpg', size: 1024 }))}/${hyperlink('PNG', mentionedUser.displayAvatarURL({extension: 'png', size: 1024 }))}/${hyperlink('GIF', mentionedUser.displayAvatarURL({ extension: 'gif', size: 1024 }))}
        //             `)
        //         },
        //         {
        //             name: 'Bot',
        //             value: stripIndents(`
        //                 ㅤ•ㅤ${mentionedUser.bot ? `${mentionedUser.user.username} is a bot` : `${mentionedUser.user.username} is not a bot`}
        //             `)
        //         },
        //         {
        //             name: 'Account Created',
        //             value: stripIndents(`
        //                 ㅤ•ㅤ${moment(mentionedUser.user.createdAt).format('LLLL')} which was \`${moment(mentionedUser.user.createdAt).startOf('day').fromNow()}\`
        //             `)
        //         },
        //         {
        //             name: `Joined ${interaction.guild.name}`,
        //             value: stripIndents(`
        //                 ㅤ•ㅤ${moment(mentionedUser.joinedAt).format('LLLL')} which was \`${moment(mentionedUser.joinedAt).startOf('year month week isoWeek day hour minute second').fromNow()}\`
        //             `)
        //         },
        //         {
        //             name: `Roles [${roles.length || '0'}]`,
        //             value: stripIndents(`
        //                 ㅤ•ㅤ${roles.length === 0 ? 'No roles' : `${rolenames}`}
        //             `)
        //         }
        //     )

        // interaction.reply({
        //     embeds: [embed]
        // })
    }
}