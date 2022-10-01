const {
    ChatInputCommandInteraction,
    EmbedBuilder,
    userMention,
    Client,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ComponentType,
    MessageCollector
} = require('discord.js');

const moment = require('moment');

const {
    stripIndents
} = require('common-tags');

const UserConfirmationSchema = require('../../Schemas/UserSchema/UserConfirmationSchema');
const Logger = require('../../Functions/LoggerFunction');

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client
     */
    async execute(interaction, client) {
        if (!ChatInputCommandInteraction) return;

        if(interaction.isCommand()) {

            const command = client.commands.get(interaction.commandName);
            if (!command) {
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('This command is outdated.')
                            .setColor('Red')
                            .setFooter({ text: `${client.user.username}` })
                            .setTimestamp()
                    ],
                    ephemeral: true
                });
            }

            const UserConfirmationRow = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setLabel(`I accept the rules of ${client.user.username}!`)
                    .setCustomId('accept-rules')
                    .setStyle(ButtonStyle.Primary)
            )

            const UserConfirmationEmbed = new EmbedBuilder()
                .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })
                .setColor(client.color.orange.Pantone)
                .setTitle(`Before using ${client.user.username}, please accept these rules!`)
                .addFields(
                    {
                        name: '> Bugs and Glitches',
                        value: stripIndents(`
                            ㅤ•ㅤIf there is a bug roaming around ${userMention(client.user.id)} please **do not** abuse it.
                            ㅤ•ㅤYou can report it using \`/report bug\`.
                        `)
                    },
                    {
                        name: '> False Bug Reports',
                        value: stripIndents(`
                            ㅤ•ㅤWhen you are reporting a bug, please do not add unnecessary words, which can't help in ${userMention(client.user.id)} bugs fixes.
                        `)
                    },
                    {
                        name: '> Bot Warnings',
                        value: stripIndents(`
                            ㅤ•ㅤIf user reached **3** out of **3** bot warnings, user will be blacklisted **permanently**.
                            ㅤ•ㅤHowever you can still appeal it on our [Support Server](${client.development.SupportServer}).
                        `)
                    }
                )
                .setFooter({ text: `© | ${client.user.username} | ${moment().format('YYYY')}`, iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })

            const UserData = await UserConfirmationSchema.findOne({ user_id: interaction.user.id });
            const BotOwner = client.users.cache.get(client.development.OwnerId);

            if (!UserData && interaction.user.id !== BotOwner.id) {
                const UserConfirmationMessage = await interaction.reply({
                    embeds: [UserConfirmationEmbed],
                    components: [UserConfirmationRow],
                    fetchReply: true
                })

                const UserFilter = (inter) => {
                    if (inter.user.id === interaction.user.id) {
                        return true;
                    } else {
                        inter.reply({
                            content: `That button is for ${userMention(interaction.user.id)}. Therefore, you can't use it.`,
                            ephemeral: true
                        })
                    }
                }

                const UserCollector = UserConfirmationMessage.createMessageComponentCollector({
                    filter: UserFilter,
                    componentType: ComponentType.Button,
                })

                UserCollector.on('collect', (inter) => {
                    if (inter.customId === 'accept-rules') {
                        
                        new UserConfirmationSchema({
                            user_id: inter.user.id
                        }).save();

                        UserConfirmationRow.components[0].setDisabled(true);
                        UserConfirmationRow.components[0].setLabel(`${inter.user.username} has accepted the rules!`);

                        UserConfirmationMessage.edit({
                            components: [UserConfirmationRow]
                        })

                        inter.reply({
                            content: `Hello ${userMention(inter.user.id)} you need to execute the command again in order to use it.`
                        })

                        UserCollector.stop();
                        
                    }
                })
                return;
            }

            if (command.developer && interaction.user.id !== client.development.OwnerId) {
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`This command is only available to ${userMention(client.development.OwnerId)}`)
                            .setColor('Red')
                            .setFooter({ text: `${client.user.username}` })
                            .setTimestamp()
                    ],
                    ephemeral: true
                });
            }

            const SubCommand = interaction.options.getSubcommand(false);
            if (SubCommand) {
                const SubCommandFile = client.subCommands.get(`${interaction.commandName}.${SubCommand}`);

                if (!SubCommandFile) {
                    return interaction.send({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription('This subcommand is outdated.')
                                .setColor('Red')
                                .setFooter({ text: `${client.user.username}` })
                                .setTimestamp()
                        ],
                        ephemeral: true
                    });
                }
                Logger.cmd(`${interaction.user.tag} has used /${interaction.commandName} ${SubCommand} on ${interaction.guild.name}`);
                SubCommandFile.execute(interaction, client);
            } else {
                Logger.cmd(`${interaction.user.tag} has used /${interaction.commandName} on ${interaction.guild.name}`);
                command.execute(interaction, client);
            }
        }
    }
}