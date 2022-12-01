const { PermissionsBitField, Routes } = require('discord.js');
const fs = require("fs");

module.exports = (client, config) => {
    console.log("Slash commands Handler:");
    let commands = [];
    fs.readdirSync('./Commands/Slash/').forEach((dir) => {
        console.log('[!] Started loading slash commands...');
        const SlashCommands = fs.readdirSync(`./Commands/Slash/${dir}`).filter((file) => file.endsWith('.js'));
        for (let file of SlashCommands) {
            let pull = require(`../Commands/Slash/${dir}/${file}`);
            if (pull.name, pull.description, pull.type == 1) {
                client.slash_commands.set(pull.name, pull);
                console.log(`[SLASH] Loaded a file: ${pull.name} (#${client.slash_commands.size})`);
                commands.push({
                    name: pull.name,
                    description: pull.description,
                    type: pull.type || 1,
                    options: pull.options ? pull.options : null,
                    default_permission: pull.permissions.DEFAULT_PERMISSIONS ? pull.permissions.DEFAULT_PERMISSIONS : null,
                    default_member_permissions: pull.permissions.DEFAULT_MEMBER_PERMISSIONS ? PermissionsBitField.resolve(pull.permissions.DEFAULT_MEMBER_PERMISSIONS).toString() : null
                });
            } else {
                console.log(`[SLASH] Couldn't load the file ${file}, missing module name value, description, or type isn't 1.`)
                continue;
            };
        };
    });
    if (!process.env.ID) {
        console.log("[CRASH] You need to provide your bot ID in config.js!" + "\n");
        return process.exit();
    };
    (async () => {
        console.log('[HANDLER] Started registering all the application commands.');
        try {
            await client.rest.put(
                Routes.applicationCommands(process.env.ID),
                { body: commands }
            );
            console.log('[HANDLER] Successfully registered all the application commands.');
        } catch (err) {
            console.log(err);
        }
    })();
};