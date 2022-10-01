const {
    Client,
    GatewayIntentBits,
    Partials,
    Collection
} = require('discord.js');

require('dotenv').config();

const {
    Guilds,
    GuildMembers,
    GuildBans,
    GuildEmojisAndStickers,
    GuildIntegrations,
    GuildWebhooks,
    GuildInvites,
    GuildVoiceStates,
    GuildPresences,
    GuildMessages,
    GuildMessageReactions,
    GuildMessageTyping,
    DirectMessages,
    DirectMessageReactions,
    DirectMessageTyping,
    MessageContent,
    GuildScheduledEvents
} = GatewayIntentBits;

const {
    User,
    Channel,
    GuildMember,
    Message,
    Reaction,
    GuildScheduledEvent,
    ThreadMember,
} = Partials;

const client = new Client({
    intents: [
        Guilds,
        GuildMembers,
        GuildBans,
        GuildEmojisAndStickers,
        GuildIntegrations,
        GuildWebhooks,
        GuildInvites,
        GuildVoiceStates,
        GuildPresences,
        GuildMessages,
        GuildMessageReactions,
        GuildMessageTyping,
        DirectMessages,
        DirectMessageReactions,
        DirectMessageTyping,
        MessageContent,
        GuildScheduledEvents
    ],
    partials: [
        User,
        Channel,
        GuildMember,
        Message,
        Reaction,
        GuildScheduledEvent,
        ThreadMember,
    ]
});

const config = require('./Assets/Onami/onami.json');
client.emotes = config.emoji;
client.color = config.color;
client.development = config.development;

const { loadEvents } = require('./Handlers/EventHandler');

client.commands = new Collection();
client.subCommands = new Collection();
client.events = new Collection();

module.exports.client = client;
require('./Mongo')();

loadEvents(client);

if(process.env.BETA_STATUS === 'true') {
    client.login(process.env.BETA_TOKEN);
} else {
    client.login(process.env.TOKEN);
}