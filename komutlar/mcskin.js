const Discord = require(`discord.js`);
 
exports.run = (client, message, args) => {
 let oyuncu = args.slice(0).join(' ');
 let member = message.mentions.members.first();
 let body = 'https://mc-heads.net/body/' + oyuncu
 if (oyuncu.length < 1) return message.reply('bir oyuncu adı belirtmelisin.');
 if (oyuncu == member) {
    message.reply('kullanıcı değil, bir oyuncu adı belirtmelisin :/')
 } else {
 const mcbody = new Discord.MessageEmbed()
   .setColor('#ffa200')
   .setTitle('Oyuncu: ' + oyuncu)
 .setDescription(`<:altnelma:739534189874905090> Oyuncunun Mc Skini`)
   .setImage(body)
 message.channel.send(mcbody);
 }
};
 
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['mcskin'],
 permLevel: 0
};
 
exports.help = {
 name: 'minecraft-skin',
 description: 'Oyuncunun SİKİNİ Gösterir',
 usage: 'mcbody <oyuncu>'
};