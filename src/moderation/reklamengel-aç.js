const { EmbedBuilder } = require('discord.js')
const db = require('../../database.js');
module.exports = {
    ad:'reklamengel',
    kategori:'moderation',
        async execute(message,args){
        const prefix = db.bul('prefix' + message.guild.id);
        if (!message.member.permissions.has("Administrator")) return message.reply('Bu komudu kullanmanız için yetkiniz yoktur.');
        if(db.kontrol('reklamengel'+ message.guildId,'açık')){
            message.reply(`Reklam engel zaten ayarlı.Kapatmak için: ${prefix}reklamengel-kapat`)
          } else {
          const embed = new EmbedBuilder()
          .setTitle('Reklam Engel başarıyla ayarlandı')
          .setDescription(`Kapatmak için: **${prefix}reklamengel-kapat**`)
          .setColor('Orange')
          message.channel.send({embeds:[embed]})
         await db.yaz('reklamengel'+ message.guildId, 'açık');
          }
    }
}