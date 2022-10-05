const {
    stripIndents
} = require('common-tags');

const {
    addCommas
} = require('../../../Functions/FormatNumberFunction');

const {
    ChatInputCommandInteraction,
    EmbedBuilder,
    Client,
    userMention,
    hyperlink
} = require('discord.js'); 

const moment = require('moment');

module.exports = {
    subCommand: 'info.server',

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        let owner = await interaction.guild.fetchOwner();

        const roles = interaction.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()).slice(0, -1);
        let display;

        if (roles.length <= 15) {
            display = roles.join(', ');
        } else {
            display = roles.slice(0, 15).join(', ') + '... and more!';
        }

        const embed = new EmbedBuilder()
            .setColor(client.color.orange.Pantone)
            .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
            .setFooter({ text: `© | ${client.user.username} | ${moment().format('YYYY')}`, iconURL: client.user.displayAvatarURL() })
            .setThumbnail(interaction.guild.iconURL())
            .addFields(
                {
                    name: 'Guild name',
                    value: stripIndents(`
                        ㅤ•ㅤ${interaction.guild.name} - ${interaction.guild.id}
                    `)
                },
                {
                    name: 'Guild creation date',
                    value: stripIndents(`
                        ㅤ•ㅤ${moment(interaction.guild.createdAt).format('LLLL')}
                    `)
                },
                {
                    name: 'Guild owner',
                    value: stripIndents(`
                        ㅤ•ㅤ${interaction.guild.members.cache.get(owner.id).user.tag} - ${userMention(interaction.guild.ownerId)}
                    `)
                },
                {
                    name: 'Guild emoji count',
                    value: stripIndents(`
                        ㅤ•ㅤAnimated: ${interaction.guild.emojis.cache.filter((e) => e.animated).size}
                        ㅤ•ㅤStatic: ${interaction.guild.emojis.cache.filter((e) => !e.animated).size}
                        ㅤ•ㅤStickers: ${interaction.guild.stickers.cache.size}
                        
                        ㅤ•ㅤ**Total:** ${interaction.guild.stickers.cache.size + interaction.guild.emojis.cache.size}
                    `)
                },
                {
                    name: 'Guild avatar',
                    value: stripIndents(`
                        ㅤ•ㅤ${hyperlink('JPG', interaction.guild.iconURL({ extension: 'jpg', size: 1024}), 'JPG')}
                        ㅤ•ㅤ${hyperlink('JPEG', interaction.guild.iconURL({ extension: 'jpeg', size: 1024 }), 'JPEG')}
                        ㅤ•ㅤ${hyperlink('PNG', interaction.guild.iconURL({ extension: 'png', size: 1024 }), 'PNG')}
                        ㅤ•ㅤ${hyperlink('WEBP', interaction.guild.iconURL({ extension: 'webp', size: 1024 }), 'WEBP')}
                        ㅤ•ㅤ${hyperlink('GIF', interaction.guild.iconURL({ extension: 'gif', size: 1024 }), 'GIF')}
                    `)
                },
                {
                    name: 'Guild member count',
                    value: stripIndents(`
                        ㅤ•ㅤ${addCommas(interaction.guild.memberCount)}/${addCommas(interaction.guild.maximumMembers)}
                    `)
                },
                {
                    name: 'Guild boosts',
                    value: stripIndents(`
                        ㅤ•ㅤ${addCommas(interaction.guild.premiumSubscriptionCount)}
                    `)
                },
                {
                    name: 'Guild boost level',
                    value: stripIndents(`
                        ㅤ•ㅤ${interaction.guild.premiumTier === 'NONE' ? `${interaction.guild.name} doesn't have any tier yet.` : `${interaction.guild.premiumTier.toString().replace('TIER_', 'Level ')}`}
                    `)
                },
                {
                    name: `Guild roles [${roles.length}]`,
                    value: stripIndents(`
                        ㅤ•ㅤ${display}
                    `)
                }
            )

        interaction.reply({
            embeds: [embed]
        })
    }
}