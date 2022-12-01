const { REST, Client, Collection } = require('discord.js');
const { QuickDB } = require('quick.db');
class Lysh extends Client {
    constructor(options) {
        super(options);
        this.db = new QuickDB({ filePath: './Data/SqlData.sqlite' });
        this.rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
        this.prefix_commands = new Collection();
        this.slash_commands = new Collection();
        this.events = new Collection();
        this.config = require('../Data/Config');
        this.inv = this.db.table('Inventory');
        this.mpf = this.db.table('MineProfile')
    }
}

module.exports = Lysh