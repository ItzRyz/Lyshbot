const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "mine",
    description: "Mining minigames.",
    type: 1,
    options: [],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config, db) => {
        const Pickaxes = client.inv.get(`pickaxe.${interaction.user.id}`);
        if (!Pickaxes || Pickaxes === null || Pickaxes === undefined) await interaction.reply({ content: `**${interaction.user.tag}** you don't have a pickaxe, please type **/start mine** to get starter item.`, fetchReply: true })
    },
};