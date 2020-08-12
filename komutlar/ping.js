const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = async(client, message, args) => {

        const ping = new Discord.MessageEmbed()

             .setColor('')
              .setTitle(`<a:load:707525639422476318>Anlık Geçikme Süresi<a:load:707525639422476318>`) 
             .setDescription(`Ping: ${client.ws.ping}ms`)
            
        return message.channel.send(ping);
}

exports.conf = {
    enabled : true,
    guildOnly : false,
    aliases : [],
    permLevel : 0
}

exports.help = {
    name : 'ping',
    description : 'pingi gösterisi',
    usage : '-ping'
}
