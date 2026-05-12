const { EmbedBuilder } = require('discord.js')
const db = require('../../database')
module.exports = {
    ad:'afk',
    kategori: 'user',
    async execute(message,args){
        if (!db.bul('afk' + message.member.id)) {
            const messageArray = message.content.split(" ");
            const secondWord = messageArray[1];
            if (!secondWord) return message.reply('⛔ Bir sebep yazmalısın');
            const afksayi = db.bul('afksayı'+message.guild.id);
        let afk
        if (afksayi === undefined) {
         db.yaz('afksayı'+message.guild.id,1)
         afk = 1
        } else {
         db.topla('afksayı'+message.guild.id, 1)
         afk = db.bul('afksayı'+message.guild.id)
        }
          db.yaz('afkid'+db.bul('afksayı'+message.guild.id)+message.guild.id, message.member.id)
          db.yaz('afk' + message.member.id+message.guild.id, secondWord);
          db.yaz('afknumber'+message.member.id+message.guild.id, afk)
        
            const embed = new EmbedBuilder()
              .setDescription(`<@${message.member.id}> **AFK** olarak ayarlandı`)
              .addFields(
                { name: 'Sebep:', value: `\`${secondWord}\``, inline: true }
              )
              .setColor('Orange');
        
            message.channel.send({ embeds: [embed] });
            
        
        
        
        
          }
    }
}