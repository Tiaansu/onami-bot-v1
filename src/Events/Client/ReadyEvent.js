const { Client, ActivityType } = require("discord.js");
const { loadCommands } = require("../../Handlers/CommandHandler");

module.exports = {
    name: "ready",
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    execute(client) {
        console.log("The client is now ready.");

        setInterval(async () => {
            const totalGuilds = await client.shard.fetchClientValues('guilds.cache.size').then(results => results.reduce((acc, guildCount) => acc + guildCount, 0)).catch(console.error);

            const OnamiCustomStatus = [
                `Type /help for help.`,
                `with ${totalGuilds} server(s)`
            ];

            client.user.setPresence(
                {
                    activities: [
                        {
                            name: `${OnamiCustomStatus[Math.floor(Math.random() * OnamiCustomStatus.length)]}`,
                            type: ActivityType.Streaming,
                            url: 'https://www.youtube.com/watch?v=SKUN0CXo1_M'
                        }
                    ]
                }
            )
        }, 60000);

        loadCommands(client);
    }
}