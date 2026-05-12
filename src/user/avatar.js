const { EmbedBuilder } = require('discord.js')
module.exports = {
    ad:'avatar',
    kategori:'user',
    async execute(message,args){
        const user = message.mentions.users.first();
        if(!user){
          const avatarURL = message.member.displayAvatarURL({
            format: 'png',
            size: 1024,
          });
          const embed = new EmbedBuilder()
          .setTitle(`**${message.author.username}** Avatarı:`)
          .setImage(avatarURL)
          .setColor('Orange');
        message.channel.send({ embeds: [embed] });
        } else {
          const avatarURL = user.displayAvatarURL({
            dynamic : true,
            size: 1024,
          });
          
          const embed = new EmbedBuilder()
            .setTitle(`${user.username}'nin Avatarı:`)
            .setImage(avatarURL)
            .setColor('Orange');
          message.channel.send({ embeds: [embed] });
        }

    }
}