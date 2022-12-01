const fs = require("fs");

module.exports = (client, config) => {
    console.log("Prefix Handler:");

    fs.readdirSync('./Commands/Prefix/').forEach(dir => {
        const commands = fs.readdirSync(`./Commands/Prefix/${dir}`).filter(file => file.endsWith('.js'));
        for (let file of commands) {

            let pull = require(`../Commands/Prefix/${dir}/${file}`);
            if (pull.config.name) {
                client.prefix_commands.set(pull.config.name, pull);
                console.log(`[PREFIX] Loaded a file: ${pull.config.name} (#${client.prefix_commands.size})`)
            } else {
                console.log(`[PREFIX] Couldn't load the file ${file}, missing module name value.`)
                continue;
            };

        };
    });
};