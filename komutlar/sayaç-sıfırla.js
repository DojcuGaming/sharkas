const Discord = require('discord.js'),
      db = require('quick.db'),
      ayarlar = require('../ayarlar.json'),
      prefix = ayarlar.prefix
exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
let sayı = await db.fetch(`SayaçSayı_${message.guild.id}`)  
let kanal = await db.fetch(`SayaçKanal_${message.guild.id}`)  
 
if(!sayı && !kanal) return message.reply(`<a:dikkat:739388861469163521>Sayaç Sistemi Zaten Ayarlı Değil! **Ayarlamak İçin** : \`${prefix}sayaç #kanal 100\``)
db.delete(`SayaçSayı_${message.guild.id}`) 
db.delete(`SayaçKanal_${message.guild.id}`) 
message.reply(`<a:yavas_tik:739389270216802324>Sayaç Başarıyla Sıfırlandı`)
};
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};
exports.help = {
  name: 'sayaç-sıfırla',
  description: 'Sayaç Sistemi',
  usage: 'sayaç-sıfırla'
};
