const Discord = require("discord.js");
 
exports.run = function(client, message, args) {
  var öneri = args.slice(0).join(" ");
 
  var guildID = "739769920774078484"; // Sunucu ID
 
  var channelID = "740100640700629002"; // Kanal ID
 
  if (!öneri) {
    return message.reply(
      "Bir mesaj belirtin! Doğru kullanım: **-öneri <mesaj>**"
    );
  } else {
    var embed = new Discord.MessageEmbed()
 
      .setTimestamp()
 
      .setColor("RANDOM")
 
      .addField("İşlem", "Öneri")
 
      .addField("Öneride Bulunan", message.author.tag)
 
      .addField("Öneride Bulunanın İd si", message.author.id)
 
      .addField("Öneri", öneri);
 
   

   client.channels.cache.get(channelID).send(embed)
 
    message.channel.send("Öneriniz alınmıştır! Sharkla Kal! Mutlu Kal!");
  }                    
};
 
exports.conf = {
  enabled: true,
 
  guildOnly: false,
 
  aliases: ["istek"],
 
  permLevel: 0
};
 
exports.help = {
  name: "öneri",
 
  description: "Bot hakkındaki önerilerinizi bot sahibine ulaştırır.",
 
  usage: "öneri <mesaj>"
};
 
