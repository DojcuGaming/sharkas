const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, params, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
     let otoTagkanal = message.mentions.channels.first();
     if (!otoTagkanal) return message.channel.send('<a:dikkat:739388861469163521>Otomatik tag komudunun log kanalını ayarlamak için bir kanal etiketlemeniz gerekli. `s!oto-tag-kanal #kanal`')
     db.set(`ototagKanal_${message.guild.id}`, message.mentions.channels.first().id)
     let i = await db.fetch(`ototagKanal_${message.guild.id}`)
            	  	  const embed = new Discord.MessageEmbed()
  .setDescription(`<a:yavas_tik:739389270216802324>Ototag Kanalı Başarıyla Ayarlandı Kanal <#${i}> Olarak Ayarlandı!` + "\n\n Kapatmak için **`s!oto-tag-kapat`** Yazabilirsiniz!")
    .setColor("#F0C30D")
    .setTimestamp();
  message.channel.send(embed);
};

exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: [],
 permLevel: 0
};

exports.help = {
 name: 'oto-tag-kanal',
 description: 'neblm',
 usage: 'ototagkanal'
};
