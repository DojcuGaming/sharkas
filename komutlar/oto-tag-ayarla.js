const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args, member) => {
   if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
     let mesaj = args.join(' ');
     if (!mesaj) return message.channel.send("<a:dikkat:739388861469163521>Ototag ayarlamak için bir değer belirtmelisiniz. `s!oto-tag || - `"); 
     if (message.channel.type === "dm") return;
     if (message.author.bot) return;
      await db.set(`ototag_${message.guild.id}`, mesaj)
	  	  const embed = new Discord.MessageEmbed()
        
  .setDescription(`<a:yavas_tik:739389270216802324>Ototag Sistemi Başarıyla Açıldı Tag \`${mesaj}\` Olarak Ayarlandı!` + "\n\n Kapatmak için **`s!oto-tag-kapat`** Yazabilirsiniz! Ototag Kanal Ayarlamyı Unutmayın! **Not** Botun Rolu En üste olması lazım")
    .setColor("#F0C30D")
    .setTimestamp();
  message.channel.send(embed);

}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'oto-tag',
  description: 'nblm',
  usage: 'ototag'
};
