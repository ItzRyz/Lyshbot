const { Partials, GatewayIntentBits } = require('discord.js');
require('dotenv').config({ path: './.env' })
const Lysh = require('./Modules/Lysh');
const client = new Lysh({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
        Partials.Reaction
    ],
    presence: {
        activities: [{
            name: "T.F.A is cool!",
            type: 0
        }],
        status: 'dnd'
    }
});
module.exports = client;
require('http').createServer((req, res) => res.end('Ready.')).listen(3000);
const AuthenticationToken = process.env.TOKEN;
if (!AuthenticationToken) {
    console.warn("[CRASH] Authentication Token for Discord bot is required! Use Envrionment Secrets or config.js.")
    return process.exit();
};
["Prefix", "Slash", "Events"].forEach((file) => {
    require(`./handlers/${file}`)(client, client.config);
});
client.login(AuthenticationToken)
    .catch((err) => {
        console.error("[CRASH] Something went wrong while connecting to your bot...");
        console.error("[CRASH] Error from Discord API:" + err);
        return process.exit();
    });
process.on('unhandledRejection', async (err, promise) => {
    console.error(`[ANTI-CRASH] Unhandled Rejection: ${err}`.red);
    console.error(promise);
});