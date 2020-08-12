const Discord = require("discord.js");
const moment = require("moment");
const os = require("os");
require("moment-duration-format");

exports.run = async (client, message, args) => {
  const msg = new Discord.MessageEmbed()
    .setColor("")
    .setFooter(client.user.tag, client.user.avatarURL())
  .setThumbnail(client.user.avatarURL())
    .setTitle(`Shark İstatistik`)
    .addField(
      "<a:ates_kral:739389826427650078> **Shark Ana Sahipleri**", "<@699268065472413779> ve <@581795132081176578>",
      false
    )
    .addField(
      ":blond_haired_person:  **Hizmet Verdiği Kullanıcı Sayısı:**",
      client.guilds.cache
        .reduce((a, b) => a + b.memberCount, 0)
        .toLocaleString(),
      false
    )
    .addField(
      "<a:nitromoruq:739394196124860498> **Hizmet Verdiği Sunucu Sayısı:**",
      client.guilds.cache.size.toLocaleString(),
      false
    )
    .addField(
      "<a:krmzyldz:739389012275494954> **Hizmet Verdiği Kanal Sayısı:**",
      client.channels.cache.size.toLocaleString(),
      false
    )
    .addField("<a:hy:739531916629245973> **Botun Discord.JS sürüm:**", "v" + Discord.version, false)
    .addField("<a:hy:739531916629245973> **Botun Node.JS sürüm:**", `${process.version}`, false)
    .addField("<a:ping:739533577481355315> **Ping:**", client.ws.ping + " ms", false)
  .addField("Linkler", `[Destek  Sunucusu](https://discord.gg/MXnT6d3) | [Davet Linki](https://discordapp.com/oauth2/authorize?client_id=739124270940028948&scope=bot&permissions=8)`)
  return message.channel.send(msg);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [ 'i'],
    permLevel: 0
  };
   
  exports.help = {
    name: "istatistik",
    description: "Bot i",
    usage: "istatistik"
  };