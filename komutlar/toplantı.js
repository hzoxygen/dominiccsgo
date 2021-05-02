const discord = require("discord.js")
const db = require("quick.db")




exports.run = async(client, message, args) => {
  const sebep = db.get(`sebep1-${message.author.id}`) || 0
    if(!message.member.roles.cache.get("modrolid") && !message.member.hasPermission('ADMINISTRATOR')) return  
let yetkili = message.guild.roles.cache.get("800993989025071104") // yetkili rolü
let mazeretli = "838377443579396106" //mazeretli rolü

if (args[0]==="başlat"){
if(!message.member.hasPermission('ADMINISTRATOR')) return  message.react('<a:dh10:796159136945405994>')
message.delete()
const embed = new discord.MessageEmbed()
.setColor("RANDOM")
.setTitle(`Toplantı başlıyor`)
.setDescription('<@&yetkilirolid> Toplantı Birazdan Başlayacak, Eğer Katılmayacaksanız Katılmama Sebebi Girmeniz Gerekir `!toplantı sebep` Yazarak Sebebinizi Belirtebilirsiniz')
message.channel.send(embed)
message.guild.members.cache.forEach(a => {
    if(a.roles.cache.has("800993989025071104")) { // yetkili rol ıd
     a.roles.add("838377921365671957")//burada herkese katılmadı ekliyoruz toplantının ortasında yapacağımız +toplantı yoklama ile toplantıdakilere zaten katıldı rolünü vereceğiz
    }
    });
}
   

if (args[0]==="sebep"){
let sebep3 = args.slice(1).join(" ");
let yazar = message.author
let katılmadıcı = "838377921365671957"//katılmadı rolü 
if (!sebep3) return message.channel.send("Lütfen Sebep Belirtin");
const embed = new discord.MessageEmbed()
.setColor("RANDOM")
.setTitle(`Toplantı başlıyor`)
.setDescription(`${yazar}  **${sebep3}** Sebebiyle Toplantıya Katılmadın. ${sebep} Uyarın Oldu! Eğer Başka Daha Katılmazsan Yetkin Gidebilir.`)
message.channel.send(embed)
db.add(`sebep1-${yazar.id}`, 1);
message.guild.member(yazar).roles.add(mazeretli)
message.guild.member(yazar).roles.remove(katılmadıcı)
}

   if (args[0]==="yoklama") {
let noirvoice = "836946065809866772" //stafflarımızın toplanacağı voice kanalı 
let noirkatıldı = "838382070237233193" // listeleyeceğiz rol ben katıldı rolü yaptım
let noirinkatılmadı = "838377921365671957" // listeleyeceğimiz rol2 ben katılmadı rolü yaptım

message.guild.members.cache.filter(x => x.voice.channel && x.voice.channel.id === noirvoice).forEach(m => m.roles.add(noirkatıldı) && m.roles.remove(noirinkatılmadı))
message.channel.send
const embed = new discord.MessageEmbed()
.setColor("RANDOM")
.setTitle(`${message.guild.roles.cache.get(noirkatıldı).members.cache.size} Kadar Kullanıcı Toplantıya Katıldı.\n${message.guild.roles.cache.get(noirinkatılmadı).members.cache.size} Kadar Kullanıcı Toplantıya Katılmadı\n${message.guild.roles.cache.get(mazeretli).members.cache.size} Kadar Kişi Mazeret Bildirdi`) 
message.channel.send(embed)

   }
if (args[0]==="bitir") {
    let noirvoice = "836946065809866772" //stafflarımızın toplanacağı voice kanalı 
    let noirkatıldı = "838382070237233193" // listeleyeceğiz rol ben katıldı rolü yaptım
    let noirinkatılmadı = "838377921365671957" // listeleyeceğimiz rol2 ben katılmadı rolü yaptım
    message.guild.members.cache.filter(x => (x.voice.channel) && (x.voice.channel.id === noirvoice)).map(x => x.voice.setChannel(null))
message.guild.members.cache.filter(x => x.voice.channel && x.voice.channel.id === noirvoice).forEach(m => m.roles.romove(noirkatıldı) && m.roles.remove(noirinkatılmadı))
message.channel.send
const embed = new discord.MessageEmbed()
.setColor("RANDOM")
.setTitle(`${message.guild.roles.cache.get(noirkatıldı).members.cache.size} Kadar Kullanıcı Toplantıya Katıldı.\n${message.guild.roles.cache.get(noirinkatılmadı).members.cache.size} Kadar Kullanıcı Toplantıya Katılmadı\n${message.guild.roles.cache.get(mazeretli).members.cache.size} Kadar Kişi Mazeret Bildirdi`) 
message.channel.send(embed)

  

}


};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['toplantı'],
  };
  
  exports.help = {
    name: 'toplantı',
    usage: 'toplantı',
  };