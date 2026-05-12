const db = require('../../database');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'messageCreate',
  async execute(message) {
    try {
      if (!message || !message.guild || message.author.bot) return;

      const memberId = message.member.id;
      const guildId = message.guild.id;

      // === [AFK DURUMU KONTROLÜ] ===

      // 1. AFK'dan çıkart
      const afkSebep = db.bul(`afk${memberId}${guildId}`);
      if (afkSebep) {
        db.sil(`afk${memberId}${guildId}`);
        const afkNo = db.bul(`afknumber${memberId}${guildId}`);
        db.sil(`afknumber${memberId}${guildId}`);
        db.sil(`afkid${afkNo}${guildId}`);

        const embed = new EmbedBuilder()
          .setColor('Green')
          .setDescription(`<@${memberId}> artık **AFK** değil.`);

        message.channel.send({ embeds: [embed] });
      }

      // 2. Etiketlenen kişiler AFK mı?
      if (message.mentions.members.size > 0) {
        message.mentions.members.forEach(mentioned => {
          const mentionedId = mentioned.id;
          const mentionedAfk = db.bul(`afk${mentionedId}${guildId}`);
          if (mentionedAfk) {
            const embed = new EmbedBuilder()
              .setColor('Orange')
              .setDescription(`<@${mentionedId}> şu anda **AFK**`)
              .addFields({ name: 'Sebep:', value: `\`${mentionedAfk}\``, inline: true });

            message.channel.send({ embeds: [embed] });
          }
        });
      }

      // === [LEVEL SİSTEMİ] ===

      if (db.bul("level" + guildId)) {
        const length = message.content.length;
        const levelKey = memberId + guildId + "level";
        const levelMultiplier = db.bul("level" + guildId);

        if (db.bul(levelKey)) {
          db.topla(levelKey, length * levelMultiplier);
        } else {
          db.yaz(levelKey, length * levelMultiplier);
        }
      }

    } catch (error) {
      console.error("messageCreate eventinde hata:", error);
    }
  }
};
