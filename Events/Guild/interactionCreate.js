const { EmbedBuilder } = require("discord.js");
const client = require("../../index");

module.exports = {
    name: "interactionCreate"
};

client.on('interactionCreate', async (interaction) => {
    if (interaction.isChatInputCommand()) {
        const command = client.slash_commands.get(interaction.commandName);

        if (!command) return;

        try {
            command.run(client, interaction, client.config, client.db);
        } catch (e) {
            console.error(e)
        };
    };
});
