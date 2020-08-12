const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')

exports.run = async(client, message, args) => {
  let prefix = db.fetch(`prefix_${message.guild.id}`)
  if (prefix == null) prefix = 's!'

        const yardim = new Discord.MessageEmbed()

             .setColor('')
              .setTitle(`Yardım-Menusu`)
             .setAuthor(`Shark Bot`, client.user.avatarURL()) 
             .setThumbnail(client.user.avatarURL())
             .addField(`<a:AyarGif:739534298100662382> Moderasyon-Komutları`,`**${prefix}yardım-moderasyon**`)
        .addField(`<a:gd:737565113325715486>Kullanıcı-Komutları`,`**${prefix}yardım-kullanıcı**`)
        .addField(`<:discord_2:739721009220812851> Eğlence-Komutları`,`**${prefix}yardım-eğlence**`)
        .addField(`<a:hg:739783864754503773> Kayıt-Komutları`, `**${prefix}yardım-kayıt**`)
             .setFooter(`${message.author.username} Tarafından İstendi`, message.author.avatarURL())
            
        return message.channel.send(yardim);
}

exports.conf = {
    enabled : true,
    guildOnly : false,//<a:gd:737565113325715486>
    aliases : ['y'],
    permLevel : 0
}

exports.help = {
    name : 'yardım',
    description : 'Komut Gösterir atar',
    usage : '-yardım'
}
