module.exports = {
    clear: function(config, msg, args){
        try{
            msg.channel.bulkDelete(Number(args[1])+1);
            msg.channel.send(
              {embed: {
                color: 8311585,
                description: `There are ${args[1]} messages deleted by ${msg.author}`
              }
            }).then(msg => msg.delete(10000));
        }catch(error) {
            msg.channel.send(
                {embed: {
                color: 15934014,
                description: `How many messages do you want to remove? \n Use: ${config.prefix}clear (amount)`
              }
            });
            return;
        }
    }
}