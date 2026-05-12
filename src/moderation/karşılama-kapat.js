const { EmbedBuilder } = require('discord.js')
const db = require('../../database')
module.exports = {
    ad:'karşılama-kapat',
    kategori:'moderation',
      async execute(message,args){
      const prefix = db.bul('prefix'+message.guild.id)
      if(!db.bul('karşılama'+ message.guildId)) return message.reply(`Reklam engel açık değil. Ayarlamak için**${prefix}reklamengel**`)
       db.sil('karşılama'+ message.guildId)
       const embed = new EmbedBuilder()
       .setTitle('Reklam engelleyici kapatıldı')
       .setColor("Orange")
       message.channel.send({embeds:[embed]})
    }
}