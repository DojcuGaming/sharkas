const Discord = require('discord.js')

exports.run = (client, message, args) => {
  const sikineli = new Discord.MessageEmbed()
  .setAuthor(`Shark Bot Davet`, client.user.avatarURL())
  .setThumbnail(client.user.avatarURL())
  .setDescription(`Beni Tercih Etiiğin İçin Teşekkürler  \n Botu Eklemek İçin [Tıkla](https://discordapp.com/oauth2/authorize?client_id=739124270940028948&scope=bot&permissions=8) \n Destek Sunucusuna Gelmek İçin [Tıkla](https://discord.gg/MXnT6d3)`)
.setColor('BLACK')
  .setFooter(`${message.author.username} Tarafından İstendi`, message.author.avatarURL())
  message.channel.send(sikineli)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['ekle'],
  permLevel: 0 //yaptım knk
}

exports.help = {
  name: 'davet',
  description: 'Davet Etmeyeni Sikeler'
  
}