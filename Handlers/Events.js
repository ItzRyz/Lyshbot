const fs = require("fs");

module.exports = (client) => {
    console.log("Events Handler:");
    fs.readdirSync('./Events/').forEach(dir => {
        const commands = fs.readdirSync(`./Events/${dir}`).filter(file => file.endsWith('.js'));
        for (let file of commands) {
            let pull = require(`../Events/${dir}/${file}`);
            if (pull.name) {
                client.events.set(pull.name, pull);
                console.log(`[EVENTS] Loaded a file: ${pull.name}`)
            } else {
                console.log(`[EVENTS] Couldn't load the file ${file}. missing name or aliases.`)
                continue;
            }
        }
    });
}