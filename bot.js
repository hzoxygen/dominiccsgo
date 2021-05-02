const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const Jimp = require("jimp");
const db = require("quick.db");
var prefix = ayarlar.prefix;

client.on("ready", () => {
  console.log(`Bot suan bu isimle aktif: ${client.user.tag}!`);
});

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

///////////// KOMUTLAR BAŞ

client.on("guildMemberAdd", async (member) => {

    const sunucu = client.guilds.cache.get("800993818111377439")//sunucu ıd
    const hoşgeldin_kanalı = client.channels.cache.get("800994041239175168")//mesajın gideceği kanal
    if (member.user.bot) return; // bota mesaj atmama kısmı
    await member.setNickname(`Vice Kayıtsız`)// oto isim kısmı
    const jahkyembed = new Discord.MessageEmbed()
        .setTitle(`<a:giris:832219901863133184> | Vice'a Hoşgeldin`)
        .setDescription(`
        
**<a:emoji_31:834607692008914965> | ${member} Seninle Birlikte ${sunucu.memberCount} Kişiyiz!**

**<a:emoji_32:834607713081753620> | Kayıt olmak için <#800994040181948436> kanalındaki formu doldurup bu kanala atmalısın.**
`)
    .setColor("PURPLE")
.setFooter("Vice Jailbreak","https://i.imgur.com/aOV3PCd.png")
.setImage('')//görsel kısmı gif vesayle koyabilirsiniz sıkıntı çıkmıyor

    hoşgeldin_kanalı.send(jahkyembed)
});


client.on('guildMemberAdd', member => {
  member.roles.add("800994011669725204")
});


////////////////////////////////////////////

client.on("message", async(message) => {
if(message.content === "!dc") {
message.channel.send('https://discord.gg/AQcU6gCqk5')
}
})
//
client.on("message", async(message) => {
if(message.content === "!ip") {
message.channel.send('IP adresimiz; 185.193.165.132 \nTıkla Bağlan; steam://connect/185.193.165.132:27015');
}
})
//
client.on("message", async(message) => {
if(message.content === "!steam") {
message.channel.send('__Steam Topluluğumuz__\nhttps://steamcommunity.com/groups/viceoyuncutoplulugu')
}
})
//
client.on("message", async(message) => {
if(message.content === "!youtube") {
message.channel.send('__Youtube Kanalımız__\nhttps://m.youtube.com/channel/UCn-emvWwzUxNvkRhkzGgZAw')
}
})

////////////////////////////////////////////



require("moment-timezone") 
moment.locale('tr')
client.on('ready', () => {
   setInterval(() => {
  var days = ["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"];
  const d = new Date()
  if(db.get('gün_'+d.getMonth()+"/"+d.getDate())) return;
  if(days[d.getDay()] === "Cuma")  {
    var saat = moment().tz('Europe/Istanbul').format('LT')
    var gerekensaat = "15:50"
    if(saat === gerekensaat) {
      db.set('gün_'+d.getMonth()+"/"+d.getDate(), true)
      client.channels.cache.get('800994045806772245').send('**:loudspeaker: | Toplantı Başlıyooooor !\n<a:siren:832219070073667635> | Tüm Yetkililerin Katılması Zorunludur.\n<a:onayy:832219198741676032> | Sunucu İçerisindeki Şikayet ve Önerilerinizi Gelip Belirtebilirsiniz.\n@everyone**')
    }
  }
   }, 1000)
})


////////////////////////////////////////////


client.on("message", async message => {
  if(!message.guild) return
  let prefix = ayarlar.prefix;

  var id = message.author.id;
  var gid = message.guild.id;

  let xps = await db.fetch(`verilecekxp_${gid}`);
  if (message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  var xp = await db.fetch(`xp_${id}_${gid}`);
  var lvl = await db.fetch(`lvl_${id}_${gid}`);
  var xpToLvl = await db.fetch(`xpToLvl_${id}_${gid}`);

  if (!lvl) {
    if (xps) {
      db.set(`xp_${id}_${gid}`, xps);
    }
    db.set(`xp_${id}_${gid}`, 4);
    db.set(`lvl_${id}_${gid}`, 1);
    db.set(`xpToLvl_${id}_${gid}`, 100);
  } else {
    if (xps) {
      db.add(`xp_${id}_${gid}`, xps);
    }
    db.add(`xp_${id}_${gid}`, 4);

    if (xp > xpToLvl) {
      db.add(`lvl_${id}_${gid}`, 1);
      db.add(
        `xpToLvl_${id}_${gid}`,
        (await db.fetch(`lvl_${id}_${gid}`)) * 100
      );

client.channels.cache.get("830900587163942932").send(`<@${message.author.id}> Seviye atladı **${lvl || "0"}**`)

      
    }

  }
  
});


////////////////////////////////////////////


////////////// KOMUTLAR SON
////////////// ALTI ELLEME
require("./util/eventLoader")(client);


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}`);
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
  if (ayarlar.sahip.includes(message.author.id)) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.on("ready", () => {
  client.channels.cache.get("837158155523194910").join();
});

client.login(process.env.token)
console.log