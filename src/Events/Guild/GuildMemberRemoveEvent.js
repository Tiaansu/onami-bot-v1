const {
    AttachmentBuilder,
    EmbedBuilder,
    GuildMember,
    Client
} = require('discord.js');
const Canvas = require('canvas');
const moment = require('moment');
const {
    OrdinalSuffixOf
} = require('../../Functions/OrdinalSuffixFunction');

const FarewellChannel = require('../../Schemas/ChannelSchema/LeaveChannelSchema');
const Logger = require('../../Functions/LoggerFunction');

let farewellCanvas = {};
farewellCanvas.create = Canvas.createCanvas(1024, 500);
farewellCanvas.context = farewellCanvas.create.getContext('2d');
farewellCanvas.context.font = '72px sans-serif';
farewellCanvas.context.fillStyle = '#ED4242'; // same with './GuildMemberAddEvent.js'

Canvas.loadImage('./src/Assets/Images/welcomer2.png').then(async (img) => {
    farewellCanvas.context.drawImage(img, 0, 0, 1024, 500);
    farewellCanvas.context.beginPath();
})

module.exports = {
    name: 'guildMemberRemove',

    /**
     * 
     * @param {GuildMember} member 
     * @param {Client} client 
     */
    async execute(member, client) {
        let Farewell = await FarewellChannel.findOne({ Guild: member.guild.id, Activated: true });

        if (Farewell) {
            let canvas = farewellCanvas;
            canvas.context.textAlign = 'center';
            canvas.context.fillText(`Goodbye, ${member.user.tag}`, 512, 360);
            canvas.context.font = '42px sans-serif';
            canvas.context.fillText(`Our ${OrdinalSuffixOf(member.guild.memberCount)} member has just left.`, 512, 410);
            canvas.context.font = '25px sans-serif';
            canvas.context.fillText('We hope you enjoy staying here.', 512, 465);
            canvas.context.beginPath();
            canvas.context.arc(512, 165, 119, 0, Math.PI * 2, true);
            canvas.context.closePath();
            canvas.context.clip();
            await Canvas.loadImage(member.user.displayAvatarURL({ extension: 'png', size: 1024 }))
                .then(img => {
                    canvas.context.drawImage(img, 393, 47, 238, 238);
                })
            const attachment = new AttachmentBuilder(canvas.create.toBuffer(), {
                name: 'goodbye.png'
            });

            let rolenames;
            let roles = member.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()).slice(0, -1);

            rolenames = roles.join(" ");

            const embed = new EmbedBuilder()
                .setColor('Red')
                .setImage(`attachment://${attachment.name}`)
                .setTimestamp()
                .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
                .setTitle('Member left')
                .addFields(
                    {
                        name: `Joined ${member.guild.name}`,
                        value: `${member} joined \`${moment(member.joinedAt).format('LLLL')}\` which was \`${moment(member.joinedAt).startOf('year month week isoWeek day hour minute second').fromNow()}\``
                    },
                    {
                        name: 'Roles',
                        value: `${rolenames.length == 0 ? 'No roles' : rolenames}`
                    }
                )
                .setFooter({ text: `ID: ${member.user.id}` })

            try {
                const Channel = client.channels.cache.get(Farewell.Channel);
                Channel.send({
                    embeds: [embed],
                    files: [attachment]
                })
            } catch (error) {
                Logger.error(error);
            }
        }
    }
}