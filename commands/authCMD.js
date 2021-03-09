module.exports = {
    auth: function(config, msg, args){
        // If there is no key given
        if(args.length <= 1){
            msg.channel.send(
            {embed: {
                color: 15934014,
                description: `Please give your authentication key`
            }
            });
            return;
        }

        // If the given key is not exactly 19 characters long
        if(args[1].length != 19){
            msg.channel.send(
            {embed: {
                color: 15934014,
                description: `The given authentication key is not formed properly`
            }
            });
            return;
        }

        // if(guild.find(x => x.id === msg.guild.id)==null){
        //   msg.channel.send(
        //     {embed: {
        //       color: 15934014,
        //       description: 'Please give your authentication key'
        //     }
        //   });
        // }

        // sqlQuery('SELECT * FROM guilds WHERE guildId = ?', guildId,)
        //   .then(results => {
        //     if(results.length > 0){
        //       guilds.push({
        //         guildId: msg.guild.id,
        //         ownerId : msg.,
        //         id       : 5566,
        //         fullName : function() {
        //           return this.firstName + " " + this.lastName;
        //         }
        //       })
        //     } else {
        //       //Not authed
        //     }
        //   })
        //   .catch(error => {
        //       return Boolean(false);
        //   });
    }
}