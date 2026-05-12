const {EmbedBuilder} =require('discord.js')
module.exports = {
    ad:'ban',
    kategori:'moderation',
    execute(message, args){
        if (!message.member.permissions.has("Administrator") && !message.member.permissions.has("BanMembers")) {
            return message.reply('Bir kullanıcıyı yasaklamak için gerekli yetkilere sahip değilsiniz.');
          }    
            const secondWord = message.mentions.members.first();
            const messageArray = message.content.split(" ");
            if (secondWord) {
              const reason = messageArray.slice(2).join(" ");
              const reasonMessage = reason ? ` Sebep: ${reason}` : '';
              secondWord.ban({ reason: reason });
              const embed = new EmbedBuilder()
              .setTitle(`Kullanıcı @${secondWord.user.displayName} sunucudan yasaklandı.`)
              .setDescription(`**${reasonMessage}**`)
              .setColor("Orange")
              message.channel.send({embeds: [embed]})
            } else {
              message.reply('Lütfen bir kullanıcı etiketleyin.');
            }
    }
}