const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js');

const ms = require('ms');

module.exports = {
    BtnPaginator: async function(client, interaction, pages, timeout = ms('60s')) {
        let page = 0;

        const LeftButton = new ButtonBuilder()
            .setStyle(ButtonStyle.Primary)
            .setCustomId('paginator-button-left')
            .setEmoji(`${client.emotes.animated.ArrowLeft}`)

        const RightButton = new ButtonBuilder()
            .setStyle(ButtonStyle.Primary)
            .setCustomId('paginator-button-right')
            .setEmoji(`${client.emotes.animated.ArrowRight}`)

        const PaginatorRow = new ActionRowBuilder().addComponents([LeftButton, RightButton]);

        const LeftButtonAfter = new ButtonBuilder()
            .setStyle(ButtonStyle.Primary)
            .setCustomId('paginator-button-left-after')
            .setEmoji(`${client.emotes.animated.ArrowLeft}`)
            .setDisabled(true)

        const RightButtonAfter = new ButtonBuilder()
            .setStyle(ButtonStyle.Primary)
            .setCustomId('paginator-button-right-after')
            .setEmoji(`${client.emotes.animated.ArrowRight}`)
            .setDisabled(true)

        const PaginatorRowAfter = new ActionRowBuilder().addComponents([LeftButtonAfter, RightButtonAfter]);

        const Pages = pages;

        const currentPage = await interaction.reply({
            embeds: [Pages[page].setFooter({ text: `Page ${page + 1}/${Pages.length}` })],
            components: [PaginatorRow],
            fetchReply: true
        })

        const filter = (inter) => {
            if (inter.user.id === interaction.user.id) {
                return true;
            } else {
                return inter.reply({
                    content: 'That button is not yours.',
                    ephemeral: true
                })
            }
        }

        const collector = currentPage.createMessageComponentCollector({
            filter: filter,
            time: timeout
        });

        collector.on('collect', async (inter) => {
            if (inter.customId === 'paginator-button-left') {
                page = page > 0 ? --page : Pages.length - 1;
            } else if (inter.customId === 'paginator-button-right') {
                page = page + 1 < Pages.length ? ++page : 0;
            }

            await inter.update({
                embeds: [Pages[page].setFooter({ text: `Page ${page + 1}/${Pages.length}` })],
                components: [PaginatorRow]
            })
        })

        collector.on('end', () => {
            currentPage.edit({ components: [PaginatorRowAfter] })
        })

    }
}