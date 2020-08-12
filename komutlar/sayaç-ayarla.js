const Discord = require('discord.js'),
      db = require('quick.db'),
      ayarlar = require('../ayarlar.json'),
      prefix = ayarlar.prefix
exports.run = async (client, message, args) => {
  
const sayı = args[1]
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
const kanal = message.mentions.channels.first()
if(!sayı || !kanal) return message.reply(`<a:dikkat:739388861469163521>Sayaç Sistemini Ayarlamak İçin Lütfen Sayı ve Kanal Belirtiniz. **Örn** : \`${prefix}sayaç #kanal 100\``)
if(isNaN(sayı)) return message.reply(`<a:dikkat:739388861469163521>Sayaç Sistemini Ayarlamak İçin Sayıyı Sadece Rakamlardan Yazmalısın!`)
  
await db.set(`SayaçSayı_${message.guild.id}`,sayı)  
await db.set(`SayaçKanal_${message.guild.id}`,kanal.id)  
  
message.reply(`<a:yavas_tik:739389270216802324>Sayaç Başarıyla Ayarlandı! Kapatmak için **${prefix}sayaç-sıfırla**`)
};
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};
exports.help = {
  name: 'sayaç',
  description: 'Sayaç Sistemi',
  usage: 'sayaç <sayı> <#kanal>'
};
