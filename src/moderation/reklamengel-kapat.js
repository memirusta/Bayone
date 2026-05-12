const { EmbedBuilder } = require('discord.js')
const db = require('../../database.js');
module.exports = {
    ad:'reklamengel-kapat',
    kategori:'moderation',
        async execute(message,args){
     if (!message.member.permissions.has("Administrator")) return message.reply('Bu komudu kullanmanız için yetkiniz yoktur.');
     const prefix = db.bul('prefix' + message.guild.id);
        if(!db.kontrol('reklamengel'+ message.guildId,'kapat')){
            message.reply(`Reklam engel zaten kapalı.Açmak için: ${prefix}reklamengel`)
          } else {
          const embed = new EmbedBuilder()
          .setTitle('Reklam Engel başarıyla kapandı')
          .setDescription(`Açmak için: **${prefix}reklamengel**`)
          .setColor('Orange')
          message.channel.send({embeds:[embed]})
         await db.sil('reklamengel'+ message.guildId, 'açık');
          }
    }
}