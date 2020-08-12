const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require ('quick.db')



exports.run = async(client, message, args) => {
  let prefix = db.fetch(`prefix_${message.guild.id}`)
  if (prefix == null) prefix = 's!'

        const yardim = new Discord.MessageEmbed()

             .setColor('')
              .setTitle(`Yardım-Menusu`)
             .setAuthor(`Shark Bot`, client.user.avatarURL()) 
             .setThumbnail(client.user.avatarURL())
  .setDescription(`<:discord_2:739721009220812851> Eğlence Komutları \n **${prefix}duello** Duello Başlatırısınız \n **${prefix}kralol** Kral Olursunuz \n **${prefix}efkar** Efkarınızı Ölçer \n **${prefix}fbi** Fbi Gelir \n **${prefix}çay** Herkese Çay Ismarlarsınız \n **${prefix}yemek** Herkese Yemek İsmarlarsınız \n **${prefix}mcskin** Belirtiğin Kullanıcın Mc Skin Gösteriri \n **${prefix}banner** Banner Oluşturur! \n **${prefix}embed** Bota İstediğin Bir Yazıyı Embed Ve En Gelişmiş Haliyle Yazdırır!`)
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
    name : 'yardım-eğlence',
    description : 'Komut Gösterir atar',
    usage : '-yardım'
}
