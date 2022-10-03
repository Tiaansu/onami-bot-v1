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

const WelcomeChannel = require('../../Schemas/ChannelSchema/WelcomeChannelSchema');
const Logger = require('../../Functions/LoggerFunction');

let welcomeCanvas = {};
welcomeCanvas.create = Canvas.createCanvas(1024, 500);
welcomeCanvas.context = welcomeCanvas.create.getContext('2d');
welcomeCanvas.context.font = '72px sans-serif';
welcomeCanvas.context.fillStyle = '#FF5A00'; // it supposedly client.user.orange.Pantone but our colors from onami.json has '0x' so we can't use it.

Canvas.loadImage('./src/Assets/Images/welcomer2.png').then(async (img) => {
    welcomeCanvas.context.drawImage(img, 0, 0, 1024, 500);
    welcomeCanvas.context.beginPath();
})

module.exports = {
    name: 'guildMemberAdd',

    /**
     * 
     * @param {GuildMember} member 
     * @param {Client} client 
     */
    async execute(member, client) {
        let Welcomer = await WelcomeChannel.findOne({ Guild: member.guild.id, Activated: true });

        if (Welcomer) {
            let canvas = welcomeCanvas;
            canvas.context.textAlign = 'center';
            canvas.context.fillText(`Welcome, ${member.user.tag}`, 512, 360);
            canvas.context.font = '42px sans-serif';
            canvas.context.fillText(`You are the ${OrdinalSuffixOf(member.guild.memberCount)} member`, 512, 410);
            canvas.context.font = '25px sans-serif';
            canvas.context.fillText(`We hope you enjoy staying on ${member.guild.name}!`, 512, 465);
            canvas.context.beginPath();
            canvas.context.arc(512, 166, 119, 0, Math.PI * 2, true);
            canvas.context.closePath();
            canvas.context.clip();
            await Canvas.loadImage(member.user.displayAvatarURL({ extension: 'png', size: 1024 }))
                .then(img => {
                    canvas.context.drawImage(img, 393, 47, 238, 238);
                })
            const attachment = new AttachmentBuilder(canvas.create.toBuffer(), {
                name: 'welcome.png'
            });

            const embed = new EmbedBuilder()
                .setColor(client.color.discord.Eucalyptus)
                .setImage(`attachment://${attachment.name}`)
                .setTimestamp()
                .setFooter({ text: `ID: ${member.user.id}` })
                .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
                .setTitle('Member joined')
                .setDescription(`${member} ${OrdinalSuffixOf(member.guild.memberCount)} to join`)
                .addFields(
                    {
                        name: 'Joined Discord on',
                        value: `\`${moment(member.user.createdAt).format('LLLL')}\` which was \`${moment(member.user.createdAt).startOf('year month week isoWeek day hour minute second').fromNow()}\``
                    }
                )
        
            try {
                const Channel = client.channels.cache.get(Welcomer.Channel);
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