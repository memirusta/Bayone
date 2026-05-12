const { EmbedBuilder } = require('discord.js')
const db = require('../../database.js')
module.exports = {
    ad:'otorol',
    kategori:'moderation',
      async execute(message,args){
    const prefix = db.bul('prefix' + message.guild.id);
    const rol = message.mentions.roles.first();
  if(!rol) return message.reply('Lütfen bir rol etiketleyin')
  if(db.kontrol("otorol" + message.guildId)){
    message.reply(`Otorol zaten açık. Kapatmak için ${prefix}otorol-kapat`)
  } else {
    db.yaz('otorol'+message.guildId, rol.name)
    const embed = new EmbedBuilder()
  .setTitle(`Otorol ayarlandı. Rol:**${rol.name}**`)
  .setDescription(`Kapatmak için:**${prefix}otorol-kapat**`)
  .setColor('Orange');
  message.channel.send({embeds:[embed]})
  }
}
}