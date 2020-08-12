const Discord = require('discord.js');

const db = require('quick.db');

exports.run = async(client, message, args, guild) => {
  
  const hesap = await db.fecth(`hesap_${message.author.id}`);

  const hesapdurum = await db.fecth(`hesapdurum_${message.author.id}`);
  
  const hesapisim = await db.fecth(`hesapisim_${message.author.id}`);
  
  let kontrol  = await db.fecth(`hesapisim_${message.author.id}`);
  
  if (!kontrol) return message.chnnel.send('Zaten Bir Hesabın Var')
  
let isim = args.slice(0).join(' ')
if (!isim) return message.channel.send("Bir İsim Gir")

db.set(`hesap-${message.author.id}`,"Hesap Açıldı")
  db.set(`hesapisim_${message.author.id}`,isim)
  db.add(`para_${message.author.id}`, 20)
  if(!hesap) return message.channel.send("Başarılı Hesap Açtın Sana Hesap Actıgından Dolayı 20Tl Verıyorum") 
  
}  
exports.conf = {
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: "hesap-aç"
};