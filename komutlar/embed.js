const Discord = require('discord.js')

exports.run = (client, message, args) => {
  let mesaj = args.slice(0).join(' ')
  if (!mesaj) return message.reply ('Kral Ne Yazacağımı Söylemedin ÖRNEK: s!embed Shark Bot v12')
  const sikinayağı = new Discord.MessageEmbed()
  .setAuthor('Shark Embed Yaz Sistemi')
  .setDescription(mesaj)
  .setFooter(`${message.author.tag} Tarafından Yazıldı`)
  .setThumbnail(client.user.avatarURL())
  message.delete();
  message.channel.send(sikinayağı)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'embed',
  description: 'sa'
  
}