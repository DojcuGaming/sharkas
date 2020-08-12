const Discord = require('discord.js')

exports.run = (client, message, args) => {
  const çay = new Discord.MessageEmbed()
  .setDescription(`<@${message.author.id}> İsimli Kullanıcı Herkese Çay Ismarladı`)
  .setImage("https://media1.giphy.com/media/RIwnj1b1k1zT58SHqU/giphy.gif")
  .setColor('ORANGE')
  message.channel.send(çay)
}
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'çay',
    description: '.d',
    usage: 'Yarrak :D' 
  };