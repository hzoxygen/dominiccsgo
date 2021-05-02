const Discord = require('discord.js');

exports.run = async(client , message , args) => {
  let member = message.mentions.members.first()
  if(!message.member.roles.cache.has("832059620934680607") &&
(!message.member.roles.cache.has("ID")&& 
(!message.member.roles.cache.has("ID")) 
  ))return message.channel.send(`Yetkin Yetmiyor!`) 

  if(!member) return message.channel.send("Bir üye etiketlemelisin")
  let isim = args[1]
  let isim2 = args[2]

  if(!isim) return message.channel.send("Bir isim girmelisin Örnek; Vortex Onur")
  
  member.setNickname(`${isim} | ${isim2}`)
  member.roles.add("834729016765448232")
  member.roles.remove("800994011669725204")
  const embed = new Discord.MessageEmbed()
  .setTitle("<a:onayy:832219198741676032> | Kayıt Başarılı!")
  .setDescription(`**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n<a:giris:832219901863133184> | Kayıt edilen oyuncu: ${member} \n<a:emoji_32:834607713081753620>Kayıt eden yetkili: <@${message.author.id}>\n<a:onayy:832219069750444072> | İsmini \`${isim} | ${isim2}\` olarak ayarladım.\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)  
  .setColor("PURPLE")
  .setTimestamp()
  .setFooter("Vice Jailbreak","https://i.imgur.com/aOV3PCd.png")
  message.channel.send(embed)  
  }

exports.conf = {
  aliases: [],
  permLevel: 0
};
exports.help = { 
  name: 'kayıt'
};