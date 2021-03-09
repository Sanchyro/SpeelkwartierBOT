const Discord = require('discord.js');
const mysql = require('mysql'); 
const client = new Discord.Client(); // Discord client
const config = require('./config.json'); // Load config file
client.config = config; // Config file
const connection = mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
});
var guilds = [];

function sqlQuery(query, params) {
    return new Promise((resolve, reject) => {
        connection.query(
            query, params,
            (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
    });
}

function isAuthorizedGuild(guildId) {
  sqlQuery('SELECT * FROM guilds WHERE guildId = ?', guildId)
    .then(results => {
      console.log("authorized");

      return results.length > 0;
    })
    .catch(error => {
      return Boolean(false);
    });
}
  
/*
 * The message event will run on every single message received, from any channel or DM.
 */

client.on('message', msg => {
    if(msg.guild==null) return; // Ignore if the message is not send in a guild

    // Ignore any message that does not start with the prefix and ignore all bots
    if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;
    
    //Commands
    var args = // Arraylist of words in the command
      msg.content // Get the message
      .replace(config.prefix,'') // Remove the prefix
      .trim() // Remove all unnecessary spaces
      .split(' '); // Split the message between words

    switch(args[0].toLowerCase()){
      case `auth`:
        require(`./commands/authCMD.js`).auth(config, msg, args);
        break;
      case `clear`:
        require(`./commands/clearCMD.js`).clear(config, msg, args);
        break;
    }
});


/*
 * Login, start the bot and set the activity
 */

client.login(config.token);

client.on(`ready`, () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setActivity(`Entertaining ${client.guilds.size} servers`);
});