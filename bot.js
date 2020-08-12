const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');


var prefix = ayarlar.prefix;

var slog = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    slog(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        console.log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});






client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//---------------------------------KOMUTLAR---------------------------------\\
client.on("message", msg => {
    if (msg.content.includes(`<@${client.user.id}>`) || msg.content.includes(`<@!${client.user.id}>`) )   
     msg.channel.send(`**Prefixim:** ${ayarlar.prefix} \n**Yardım İçin:** ${ayarlar.prefix}yardım`) 
 
   
});
client.on("guildMemberAdd", async member => {
  let rol = db.fetch(`otorol_${member.guild.id}`)
  let kanal = db.fetch(`otorollog_${member.guild.id}`)

if (!rol) return;

member.roles.add(rol)

client.channels.cache.get(kanal).send(`${member} Adlı Kullanıcıya Başarılyla Rolu Verildi<a:tik:707512368107880490>`)
})

///sa-as
client.on("message", async (msg, member, guild) => {
    let i = await db.fetch(`saas_${msg.guild.id}`);
    if (i === "açık") {
      if (msg.content.toLowerCase() === "sa") {
        msg.reply("**Aleyküm Selam Hoşgeldin.**");
      }
    }
  });
client.on("message", async (msg, member, guild) => {
    let i = await db.fetch(`saas_${msg.guild.id}`);
    if (i === "açık") {
      if (msg.content.toLowerCase() === "Selamun Aleykum") {
        msg.reply("**Aleyküm Selam Hoşgeldin.**");
      }
    }
  });
////yavaş-mod
client.on("message", async msg => {
  const request = require("node-superfetch");
  const db = require("quick.db");
  const ms = require("parse-ms");
  let zaman = db.fetch(`${msg.guild.id}.slowmode`);
  if (zaman === undefined) zaman = 0;
  let timeout = zaman;
  let dakdest = await db.fetch(`slowmodee_${msg.author.id}`);

  if (dakdest !== null && timeout - (Date.now() - dakdest) > 0) {
    let time = ms(timeout - (Date.now() - dakdest));
    msg.delete();
    msg.channel
      .send("**Bu kanalda yavaş mod açık mesaj atmadan beklemen gerek!**")
      .then(message => message.delete(2000));
  } else {
    if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
      if (msg.content.length > 0) {
        db.set(`slowmodee_${msg.author.id}`, Date.now());
      }
    }
  }
});
/////sayaç
client.on("guildMemberAdd", async member => {
    let sayı = await db.fetch(`SayaçSayı_${member.guild.id}`)  
    let kanal = await db.fetch(`SayaçKanal_${member.guild.id}`)  
    if(!sayı || !kanal) return
    let sonuç = sayı - member.guild.memberCount
    client.channels.cache.get(kanal).send(`<a:geld:735801155019341865>${member}, Aramıza katıldı! **${sayı}** kişiye ulaşmak için **${sonuç}** kişi kaldı`)
    return
    })
    client.on("guildMemberRemove", async member => {
    let sayı = await db.fetch(`SayaçSayı_${member.guild.id}`)  
    let kanal = await db.fetch(`SayaçKanal_${member.guild.id}`)  
    if(!sayı || !kanal) return
    let sonuç = sayı - member.guild.memberCount
      
    client.channels.cache.get(kanal).send(`<a:gt:735801185256079380>${member}, Aramızdan ayrıldı! **${sayı}** kişiye ulaşmak için **${sonuç}** kişi kaldı`)
    return
    })
/////

/////reklam
client.on("message", msg => {
 if(!db.has(`reklam_${msg.guild.id}`)) return;
        const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg",];
        if (reklam.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                    return msg.reply('**Bu Sunucudca** `Reklam Engelle`** Aktif Reklam Yapmana İzin Vermem İzin Vermem ? !**').then(msg => msg.delete(3000));
   
 
  msg.delete(3000);                              
 
            }              
          } catch(err) {
            console.log(err);
          }
        }
    });

//////afk
client.on("message" , async msg => {
  if(msg.content.startsWith(ayarlar.prefix+"afk")) return;
 
  let afk = msg.mentions.users.first()
 
  const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)
 
  const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
 if(afk){
   const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
   const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
   if(msg.content.includes(kisi3)){
 const scinely = new Discord.MessageEmbed()
 .setDescription(`Kral Etiketledin Reis Afk Sebebi İse ${sebep}`)
.setColor('BLACK')
 
 msg.reply(scinely)
   }
 }
 
  //eventse atılcak


//util/eventLoader.js ye ise   client.on('guildMemberAdd', reqEvent('5-otoTag')); yazın

  if(msg.author.id === kisi){
 const çıkış =  new Discord.MessageEmbed()
 .setDescription(`Afk'lıktan Çıktınız`)
 msg.channel.send(çıkış)
  db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
  db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
  db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)
   msg.member.setNickname(isim)
   
 }
 
});
/////ototag
client.on('guildMemberAdd', async (member, guild, message) => {

    let ototag = await db.fetch(`ototag_${member.guild.id}`);
    let kanal = await db.fetch(`ototagKanal_${member.guild.id}`)
    let kayıt = await db.fetch(`kayıt_${member.guild.id}`)
    
    if (!ototag) return
    try {
    member.setNickname(`${ototag} ${member.user.username}`)
    if (!kanal) return
    member.guild.channels.cache.get(kanal).send(`<a:tik:707512368107880490>Sunucuya Yeni Gelen ${member}'a [**${ototag}**] tagını verdim.`)
    } catch(e) {
    }
    
  });

const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube('AIzaSyBNv7r7njLNxLGTEglWVKent2hc_RkEMR0');
const queue = new Map();

client.on('message', async msg => {

	if (msg.author.bot) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);
	let command = msg.content.toLowerCase().split(' ')[0];

	if (command === 's!çal') {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send(new Discord.MessageEmbed()
      .setColor('RANDOM')
    .setDescription('❎ | Lütfen Seli Bir Kanala Giriş Yapınız!'));
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.send(new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle('❎ | Lütfen Seli Bir Kanala Giriş Yapınız!'));
		}
		if (!permissions.has('SPEAK')) {
			 return msg.channel.send(new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle('❎ | Şarkıyı Çalamıyorum Bu Kanalda Konuşma Yetkim Yok!'));
        }

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			 return msg.channel.sendEmbed(new Discord.MessageEmbed)
      .setTitle(`✅** | **${playlist.title}** Adlı Şarkı Kuyruğa Eklendi!**`)
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
          
				 msg.channel.send(new Discord.MessageEmbed()                  
         .setTitle('Şarkı Seçimi')
         .setDescription(`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`)
         .setFooter('Lütfen 1-10 Arasında Bir Rakam Seçiniz 10 Saniye İçinde Liste İptal Edilecektir!')
	 .setFooter('Örnek Kullanım 1')
         .setColor('0x36393E'));
          msg.delete(5000)
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						 return msg.channel.send(new Discord.MessageEmbed()
            .setColor('0x36393E')
            .setDescription('❎ | **10 Saniye İçinde Şarkı Seçmediğiniz İçin seçim İptal Edilmiştir!**.'));
                    }
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.send(new Discord.MessageEmbed()
          .setColor('0x36393E')
          .setDescription('❎ | YouTubede Böyle Bir Şarkı Yok !**'));
                }
            }
			return handleVideo(video, msg, voiceChannel);
      
		}
	} else if (command === 's!gir') {
		return new Promise((resolve, reject) => {
			const voiceChannel = msg.member.voiceChannel;
			if (!voiceChannel || voiceChannel.type !== 'voice') return msg.reply('Kanalda Kimse Olmadığından Çıkıyorum!');
			voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
		});
	} else if (command === 's!geç') {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.send(new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setDescription('❎ | Lütfen Seli Bir Kanala Giriş Yapınız!'));
		if (!serverQueue) return msg.channel.send(new Discord.MessageEmbed()
     .setColor('RANDOM')
     .setTitle('❎ **Şu An Zaten Şarkı Çalmıyorum!'));                                              
		serverQueue.connection.dispatcher.end('**Sıradaki Şarkıya Geçildi!**');
		return undefined;
	} else if (command === 's!durdur') {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.send(new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setDescription('❎ | Lütfen Seli Bir Kanala Giriş Yapınız!'));
		if (!serverQueue) return msg.channel.send(new Discord.MessageEmbed()
     .setColor('RANDOM')
     .setTitle('❎ | Şu An Zaten Şarkı Çalmıyorum!'));                                              
		msg.channel.send(`:stop_button: **${serverQueue.songs[0].title}** Adlı Şarkı Durduruldu`);
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('**Şarkı Bitti**');
		return undefined;
	} else if (command === 's!ses') {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.send(new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setDescription('❎ | Lütfen Seli Bir Kanala Giriş Yapınız!'));
		if (!serverQueue) return msg.channel.send(new Discord.MessageEmbed()
     .setColor('RANDOM')
     .setTitle('❎ | Çalmayan Müziğin Sesine Bakamam'));                                              
		if (!args[1]) return msg.channel.send(new Discord.MessageEmbed()
   .setTitle(`:loud_sound: Şuanki Ses Seviyesi: **${serverQueue.volume}**`)
    .setColor('RANDOM'))
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.send(new Discord.MessageEmbed()
    .setTitle(`:loud_sound: Ses Seviyesi Ayarlanıyor: **${args[1]}**`)
    .setColor('RANDOM'));                             
	} else if (command === 's!çalan') {
		if (!serverQueue) return msg.channel.send(new Discord.MessageEmbed()
    .setTitle("❎ | Şu An Şarkı Çalınmıyor!")
    .setColor('RANDOM'));
		return msg.channel.send(new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle("Çalan")                            
    .addField('Başlık', `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`, true)
    .addField("Süre", `${serverQueue.songs[0].durationm}:${serverQueue.songs[0].durations}`, true))
	} else if (command === 's!sıra') {
    let index = 0;
		if (!serverQueue) return msg.channel.send(new Discord.MessageEmbed()
    .setTitle("❎ | **Şarkı Kuyruğunda Şarkı Bulunmamakta**")
    .setColor('RANDOM'));
		  return msg.channel.send(new Discord.MessageEmbed()
    .setColor('RANDOM')
     .setTitle('Şarkı Kuyruğu')
    .setDescription(`${serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join('\n')}`))
    .addField('Şu Anda Çalınan: ' + `${serverQueue.songs[0].title}`);
	} else if (command === 's!duraklat') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send(new Discord.MessageEmbed()
      .setTitle("**:pause_button: Şarkı Durduruldu!**")
      .setColor('RANDOM'));
		}
		return msg.channel.send('❎ | **Şarkı Çalmıyor Şu An**');
	} else if (command === 's!devam') {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send(new Discord.MessageEmbed()
      .setTitle("**:arrow_forward: Şarkı Devam Ediyor!**")
      .setColor('RANDOM'));
		}
		return msg.channel.send(new Discord.MessageEmbed()
    .setTitle("**❎ | Şu An Şarkı Çalınmıyor!**")
    .setColor('RANDOM'));
	}
  

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
    const serverQueue = queue.get(msg.guild.id);
    console.log(video);
    const song = {
        id: video.id,
        title: video.title,
        url: `https://www.youtube.com/watch?v=${video.id}`,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
        durations: video.duration.seconds,
    views: video.views,
    };
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`❎ | **Şarkı Sisteminde Problem Var Hata Nedeni: ${error}**`);
			queue.delete(msg.guild.id);
			return msg.channel.send(new Discord.MessageEmbed()
      .setTitle(`❎ | **Şarkı Sisteminde Problem Var Hata Nedeni: ${error}**`)
      .setColor('RANDOM'))
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		return msg.channel.send(new Discord.MessageEmbed()
    .setTitle(`✅ | **${song.title}** Adlı Şarkı Kuyruğa Eklendi!`)
    .setColor('RANDOM'))
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === '❎ | **Yayın Akış Hızı Yeterli Değil.**') console.log('Şarkı Bitti.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	 serverQueue.textChannel.send(new Discord.MessageEmbed()                                   
  .setTitle("**🎙 Şarkı Başladı**",`https://i.hizliresim.com/RDm4EZ.png`)
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
  .addField('\nBaşlık', `[${song.title}](${song.url})`, true)
  .addField("\nSes Seviyesi", `${serverQueue.volume}%`, true)
  .addField("Süre", `${song.durationm}:${song.durations}`, true)
  .setColor('RANDOM'));
}
/////Güvenlik
client.on("guildMemberAdd", async member => {
  let user = client.users.cache.get(member.id);
  let channels = client.channels.cache.get(db.fetch(`guvenlik${member.guild.id}`));
  const Canvas = require("canvas");
  const canvas = Canvas.createCanvas(360, 100);
  const ctx = canvas.getContext("2d");

  const resim1 = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/591299755976425493/614151181752860672/yhosgeldirrn.png"
  );
  const resim2 = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/591299755976425493/614164419768877056/yhosgeldirrn.png"
  );
  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const gün = moment.duration(kurulus).format("D");
  var kontrol;
  if (kurulus > 2629800000) kontrol = resim2;
  if (kurulus < 2629800000) kontrol = resim1;

  const background = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/591299755976425493/614164413318168606/Adsz.png"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL({format: "png"}));
  ctx.drawImage(kontrol, 0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(180, 46, 36, 0, 2 * Math.PI);
  ctx.clip();
  ctx.drawImage(avatar, 143, 10, 73, 72);

  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "sss-güvenlik.png"
  );
  channels.send(attachment);
});

//////////eklednim-atıldım
client.on("guildCreate", async function(guild) {
const owner = client.users.cache.get(guild.ownerID)
const kanal = "739796633805389904" //Eklendim mesajının atılacağı kanal ID'sini giriniz.
const darkcode = new Discord.MessageEmbed()
.setTitle(`Yeni bir sunucuya eklendim`)
.setColor("BLACK")
.addField(`Sunucu Adı`, guild.name)
.addField(`Sunucu Sahibi`, owner.username + "#" +owner.discriminator)
.addField(`Sunucu Üye Sayısı`, guild.memberCount)
client.channels.cache.get(kanal).send({embed: darkcode}).catch(err => console.log("Kanala mesaj atamıyorum!"))
})
//
  //Darkcode
//Atıldım
client.on("guildDelete", async function(guild) {
const owner = client.users.cache.get(guild.ownerID)
const kanal = "739796633805389904" //Atıldım mesajının atılacağı kanal ID'sini giriniz.
const darkcode = new Discord.MessageEmbed()
.setTitle(`Bir sunucudan atıldım`)
.setColor("BLACK")
.addField(`Sunucu Adı`, guild.name)
.addField(`Sunucu Sahibi`, owner.username + "#" + owner.discriminator)
.addField(`Sunucu Üye Sayısı`, guild.memberCount)
client.channels.cache.get(kanal).send({embed: darkcode}).catch(err => console.log("Kanala mesaj atamıyorum!"))
})
/////
client.on("guildMemberAdd", (member, message) => {
let guild = member.guild;
  let kanal = db.fetch(`kayıthg_${member.guild.id}`)
  
  
 let aylartoplam = {
    "01": "Ocak",
        "02": "Şubat",
        "03": "Mart",
        "04": "Nisan",
        "05": "Mayıs",
        "06": "Haziran",
        "07": "Temmuz",
        "08": "Ağustos",
        "09": "Eylül",
        "10": "Ekim",
        "11": "Kasım",
        "12": "Aralık"
  }
 let aylar = aylartoplam 

let user = client.users.cache.get(member.id);
require("moment-duration-format");

   const kurulus = new Date().getTime() - user.createdAt.getTime();
    const gün = moment.duration(kurulus).format("D")   
   var kontrol = [];

if(gün < 7) {
 kontrol = '**Şüpheli**<a:off:739938567434010704>' 
} if(gün > 7) {
kontrol = '**Güvenilir**<a:onn:739938568214020177>' 
} 

 if(!kanal) return;
  
    const embed = new Discord.MessageEmbed()
    .setColor('GREY')
    .setThumbnail(user.avatarURL({ dynamic: true, format: 'gif', format: 'png', format: 'jpg', size: 2048}))
    .setDescription(`<a:hg:739783864754503773> **Hoşgeldin!** ${member.user}, seninle beraber **${guild.memberCount}** kişi olduk! \n <a:sonsuzz:739720941763952680> Kaydının yapılması için  **İsim** ve **Yaş** Yazman Gerek. \n <a:Ayar:739394196124860498> Hesap Kuruluş: **${moment(user.createdAt).format('DD')} ${aylar[moment(user.createdAt).format('MM')]} ${moment(user.createdAt).format('YYYY HH:mm:ss')}** \n <a:loadingg:739533577481355315> Bu vatandaş: ${kontrol} \n <a:sonsuzz:739720941763952680> Kayıt yetkilileri seninle ilgilenecektir.`)
    .setImage("")
client.channels.cache.get(kanal).send(embed)

});

client.on("message", async (message, member, guild) => {
  let tag = db.fetch(`kayıttag_${message.guild.id}`)
  if (tag == null) tag = 'Tag Belirlenmemiş'
  if (message.content.toLowerCase() === 'tag') {
    message.channel.send(`\`${tag}\``)
  }
});