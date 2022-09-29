const {
    Client,
    GatewayIntentBits,
    Partials,
    Collection
} = require("discord.js");

require('dotenv').config();

const {
    Guilds,
    GuildMembers,
    GuildMessages
} = GatewayIntentBits;

const {
    User,
    Message,
    GuildMember,
    ThreadMember
} = Partials;

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages],
    partials: [User, Message, GuildMember, ThreadMember]
});

const {
    loadEvents
} = require("./Handlers/eventHandler");

client.events = new Collection();
loadEvents(client);

client.login(process.env.TOKEN);