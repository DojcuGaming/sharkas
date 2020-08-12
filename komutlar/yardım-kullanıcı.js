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
             .setDescription(`<a:gd:737565113325715486>Kullanıcı Komutları \n **${prefix}avatar** Kullanıcın Avatarını Gösterir \n **${prefix}korona** Güncel Korona Bilgisi Verir \n **${prefix}ping** Botun Pingini Gösteriri \n **${prefix}afk** Afk Olursunzu \n **${prefix}istatistik** Botun istatistik Gösterir \n **${prefix}çeviri** İstediğiniz Bir Kelimeyi Çevirir! \n **${prefix}öneri** Bot İçin Öneride Bulunursunuz!`)
             .setFooter(`${message.author.username} Tarafından İstendi`, message.author.avatarURL())
            
        return message.channel.send(yardim);
}

exports.conf = {
    enabled : true,
    guildOnly : false,//<a:gd:737565113325715486>
    aliases : [],
    permLevel : 0
}

exports.help = {
    name : 'yardım-kullanıcı',
    description : 'Komut Gösterir atar',
    usage : '-yardım'
}
