const {EmbedBuilder} = require('discord.js')
module.exports = {
    ad:'sil',
    kategori:'moderation',
        async execute(message,args){
        if(!message.member.permissions.has("ManageMessages")) return;


  const messageCount = parseInt(args[0]);

  if (isNaN(messageCount)) {
    return message.reply('Lütfen geçerli bir sayı girin.');
  }

  if (messageCount < 1 || messageCount > 100) {
    return message.reply('Silme işlemi için 1 ile 100 arasında bir sayı belirtin.');
  }

  message.channel.bulkDelete(messageCount)
    .then((messages) => {
      message.channel.send(`Başarıyla ${messages.size} mesaj silindi.`)
        .then((botMessage) => {
          setTimeout(() => {
            botMessage.delete();
          }, 3000);
        });
    })
    .catch((error) => {
      console.error('Mesaj silinirken bir hata oluştu:', error);
      message.reply('Mesajları silerken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    });
    }
}