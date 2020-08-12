const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')



exports.run = async(client, message, args) => {
  
  let prefix = db.fetch(`prefix_${message.guild.id}`)
  if (prefix == null) prefix = 's!'

        const yardim = new Discord.MessageEmbed()

             .setColor('')
              .setTitle(``)
             .setAuthor(`Shark Bot`, client.user.avatarURL()) 
             .setThumbnail(client.user.avatarURL())//bi komutta name kısmı yok
        .setDescription(`<a:AyarGif:739534298100662382> Moderasyon Komutları \n **${prefix}oto-rol**  Oto Rol Ayarlarsınız \n **${prefix}oto-rol sıfırla** Oto Rolu Sıfırlarsınız \n**${prefix}ban-log** Ban Log Kanalını Ayarlarsınız \n **${prefix}ban** Kullanıcıyı Banlarsın \n **${prefix}ban-say** Sunucudaki Banlı Sayısını Gösteriri \n **${prefix}sa-as** Sa-As Sistemini Açarsınız \n **${prefix}yavaş-mod** Yavaş Modu Ayarlasınız \n **${prefix}sil** Beriltiniz Kadar Mesaj Siler \n **${prefix}say** Sunucuyu Sayarsınız \n **${prefix}sayaç** Sayacı Ayarlasınız \n **${prefix}sayaç-sıfırla** Sayacı Sıfırlarsınız \n **${prefix}reklam-engelle** Reklam Koruma Sistemini Açarsınız \n **${prefix}oto-tag** Oto-tagı Ayarlasınız \n **${prefix}oto-tag-kanal** Oto-tag Kanalını Ayarlasınız \n **${prefix}oto-tag-kapat** Oto-tagı Kapatırsınız \n **${prefix}güvenlik** Güvenlik Kanalını Ayarlasınız \n **${prefix}prefix** Botun Prefix(Ön Ek)ini Değiştirir!`)
             .setFooter(`${message.author.username} Tarafından İstendi`, message.author.avatarURL())
            
        return message.channel.send(yardim);
}

exports.conf = {
    enabled : true,
    guildOnly : false,
    aliases : [],
    permLevel : 0
}

exports.help = {
    name : 'yardım-moderasyon',
    description : 'Komut Gösterir atar',
    usage : '-yardım'
}
