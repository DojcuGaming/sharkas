
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
const ms = require('ms')
exports.run = async (client, message, args) => {
let kişi = message.mentions.users.first() || message.author

let parapara = await db.fetch(`para_${kişi.id}`) || 0  

  const ek = new Discord.MessageEmbed()
  .setThumbnail(`${message.author.avatarURL()}`)
 .setDescription(`${parapara} Kadar Paran Var Aferim Lan \n \n[Buradan Beni Ekle](https://discordapp.com/oauth2/authorize?client_id=739124270940028948&scope=bot&permissions=8) \n [Buradan Destek Sunucuma Gel](https://discord.gg/MXnT6d3)`)
.setFooter(`Sharkla Kal! Mutlu Kal!`)
  .setColor('BLACK')
  message.channel.send(ek)
};
exports.conf = {
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'para'
};

