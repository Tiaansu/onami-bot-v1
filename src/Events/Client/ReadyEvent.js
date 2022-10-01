const {
    Client,
    ActivityType
} = require('discord.js');

const {
    loadCommands
} = require('../../Handlers/CommandHandler');

const Logger = require("../../Functions/LoggerFunction");

module.exports = {
    name: "ready",
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    async execute(client) {
        Logger.log("The client is now ready.");
        loadCommands(client);


        const totalGuilds = await client.shard.fetchClientValues('guilds.cache.size').then(results => results.reduce((acc, guildCount) => acc + guildCount, 0)).catch(console.error);

        const OnamiCustomStatus = [
            `Type /help for help.`,
            `with ${totalGuilds} server(s)`
        ];

        function SetBotPresence() {
            client.user.setPresence(
                {
                    activities: [
                        {
                            name: `${OnamiCustomStatus[Math.floor(Math.random() * OnamiCustomStatus.length)]}`,
                            type:  ActivityType.Streaming,
                            url: client.development.url
                        }
                    ]
                }
            )
        }

        SetBotPresence();

        setInterval(() => {
            SetBotPresence();
        }, 60000);
    }
}