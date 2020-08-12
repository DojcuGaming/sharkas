const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Sen Kimin Prefixini Değiştirion?')
  let prefix = args.slice(0).join(" ");
  if (!prefix) {
    const embed = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(`Lütfen bir prefix belirtiniz!`)
      .setFooter(`${client.user.username} | Prefix Değiştir Sistemi!`);

    message.channel.send(embed);
    return;
  }
  const embed = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(`Prefix; \`${prefix}\` olarak ayarlandı!`)
      .setFooter(`${client.user.username} | Prefix Değiştir Sistemi!`);

    message.channel.send(embed);
  db.set(`prefix_${message.guild.id}`, prefix)
};

module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0,
  kategori: "sunucu"
};

module.exports.help = {
  name: "prefix",
  description: "prefix",
  usage: "prefix"
};