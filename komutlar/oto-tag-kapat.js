const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args, member) => {
     if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`); 
     if (message.channel.type === "dm") return;
     if (message.author.bot) return;
  let otorol= db.fetch(`ototag_${message.guild.id}`)
  
  if(!otorol) {
      message.channel.send(`<a:dikkat:739388861469163521>Bu sunucuda ototag ayarlanmamış.`)
      return
    } 
    db.delete(`ototag_${message.guild.id}`)
    db.delete(`ototagKanal_${message.guild.id}`)
		  	  const embed = new Discord.MessageEmbed()
  .setDescription(`<a:yavas_tik:739389270216802324>Ototag Sistemi Başarıyla Kapatıldı` )
    .setColor("#F0C30D")
    .setTimestamp();
  message.channel.send(embed);
}



exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['ototag kapat'],
  permLevel: 0
};

exports.help = {
  name: 'oto-tag-kapat',
  description: 'nblm',
  usage: 'ototag'
};
