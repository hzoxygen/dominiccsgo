const Discord = require('discord.js');
const client = new Discord.Client();
const CSGO = require("csgo-api")
const srv = new CSGO.Server('185.193.165.132', '27015')
	let query = require("source-server-query")

exports.run = async function(client, message, args) {
	const players = await srv.getPlayerCount();
	const serverName = await srv.getServerName();
	const map = await srv.getMap();
	const platform = await srv.getPlatform();
	const maxplayers = await srv.getMaxPlayers();
	const game = await srv.getGame();
	const vac = await srv.getVacEnabled();
  
  const embed = new Discord.MessageEmbed()
  .setAuthor(serverName, client.user.avatarURL())
  .setThumbnail(client.user.avatarURL())
  .setColor('PURPLE')
  .addField('🗺️ Harita',map, true)
  .addField('👥 Oyuncu Sayısı',players+"/"+maxplayers, true)
  .addField('📍 IP - Tıkla Bağlan',"185.193.165.132 - steam://connect/185.193.165.132:27015")
  	var data = await query.players("185.193.165.132", 27015, 1000),
		    text = ``,
		    decode = require("utf8");
  for (let i of data) {
		text += !i.name ? `BOT\n` : decode.decode(i.name)+ "\n";
	}
  embed.addField('✅ Oyuncular', "```\n"+text+"```")
  message.channel.send(embed)
  .catch(e =>console.log(e))
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['durum'],
  permLevel: 0
};

exports.help = {
  name: 'durum',
  description: 'CS:GO Sunucusunun durumunu gösterir.',
  usage: 'durum'
};

console.log