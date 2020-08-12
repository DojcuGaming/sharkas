const db = require('quick.db')
const Discord = require('discord.js')
 let ayarlar = ['aç','kapat']
exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  if (!args[0]) return message.channel.send('<a:dikkat:739388861469163521> Hey Bu Ayarı Kullanabilmek için `aç` yada `kapat` yazmalısın.')
  if(!ayarlar.includes(args[0])) return message.channel.send(`Geçerli parametreleri kullanmalısın.\nParametreler: ${ayarlar.join(' - ')}`)
  
 
  if (args[0] == 'aç') {
    if(db.has(`reklam_${message.guild.id}`)) return message.channel.send(`<a:dikkat:739388861469163521>Sistem zaten açık.`)
    db.set(`reklam_${message.guild.id}`, 'acik')
      message.channel.send('<a:yavas_tik:739389270216802324> Reklam Engel başarıyla açıldı! `Üyeleri Yasakla` yetkisine sahip olanların reklamı engellenmicektir.')
  }
  if (args[0] == 'kapat') {
        if(!db.has(`reklam_${message.guild.id}`)) return message.channel.send(`<a:dikkat:739388861469163521>Sistem zaten kapalı.`)
    db.delete(`reklam_${message.guild.id}`)
      message.channel.send('<a:yavas_tik:739389270216802324> Reklam Engel başarıyla kapatıldı! Artık herkes reklam yapabilir.')
  }
 
};
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['advertisement','reklam'],
  permLevel: 0
};
 
exports.help = {
  name: 'reklam-engelle',
  description: 'Reklam Sistemini Akif Eder',
  usage: 'reklam-engelle'
};
