const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');

require('dotenv').config();

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;

const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages],
    partials: [User, Message, GuildMember, ThreadMember]
});

const config = require("./Assets/Onami/onami.json");
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

if(client.development.Beta.status === 'true') {
    client.login(Client.development.Beta.token);
} else {
    client.login(process.env.TOKEN);
}