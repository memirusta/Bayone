const { EmbedBuilder } = require('discord.js')
const db = require('../../database.js')
module.exports = {
    ad:'otorol-kapat',
    kategori:'moderation',
        async execute(message,args){
        const prefix = db.bul('prefix'+message.guildId)
        if(!db.bul('otorol'+ message.guildId)) return message.reply(`Otorol açık değil. Ayarlamak için**${prefix}otorol**`)
        db.sil('otorol'+ message.guildId)
        const embed = new EmbedBuilder()
        .setTitle('Otorol kapatıldı')
        .setDescription(`Açmak için:**${prefix}otorol**`)
        .setColor("Orange")
        message.channel.send({embeds:[embed]})
    }
}