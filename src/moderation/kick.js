    const { EmbedBuilder } = require('discord.js')
    module.exports = {
    ad:'kick',
    kategori:'moderation',
        execute(message, args){
        if (!message.member.permissions.has("Administrator" || "KickMembers")) return message.reply('Bir kullanıcıyı atmanız için yetkiniz yoktur.');
        const secondWord = message.mentions.members.first();
        const messageArray = message.content.split(" ");
        if (!secondWord) return message.reply('Lütfen bir hedef belirtin.');
      
      
          if (secondWord) {
            const reason = messageArray.slice(2).join(" ");
            const reasonMessage = reason ? ` Sebep: ${reason}` : '';
            secondWord.kick(reason);
            const embed = new EmbedBuilder()
            .setTitle(`Kullanıcı @${secondWord.user.displayName} sunucudan atıldı.`)
            .setDescription(`**${reasonMessage}**`)
            .setColor("Orange")
            message.channel.send({embeds: [embed]})
          } else {
            message.reply('Kullanıcı bulunamadı.');
          }
      
    },
}