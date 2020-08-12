
const Discord = require('discord.js');

const ayarlar = require('../ayarlar.json');

const db = require('quick.db');

const ms = require('ms')

exports.run = async (client, message, args) => {
  
 var espriler = ['500','80','150','200','250','53','750','1000'];
      var espri = espriler[Math.floor(Math.random() * espriler.length)];

  let yavaşmod = 8.64e+7, // 24 Saat

        amount = Math.floor(Math.random() * 1000) + 4000;      


    let lastDaily = await db.fetch(`günlükbea_${message.guild.id}`);

    if (lastDaily !== null && yavaşmod - (Date.now() - lastDaily) > 0) {

        let timeObj = ms(yavaşmod - (Date.now() - lastDaily));

 let time = ms(yavaşmod - (Date.now() - lastDaily));



      return message.reply( `24 Saate Sadece 1 Ödül Alabilirsiniz!`)

      

    } else {

      db.add(`para_${message.author.id}`, espri)
const ek = new Discord.MessageEmbed()

.setDescription(`${espri} Lira Çıktı, Güle Güle Kullan`)
.setColor('BLACK')
message.channel.send(ek)
}
       db.set(`günlükbea_${message.guild.id}`, Date.now());

    }




exports.conf = {
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'günlük-para'
};

