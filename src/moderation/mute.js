// moderation/mute.js
module.exports = {
  ad: "mute",
  kategori: "moderation",
  async execute(message, args, client) {
    if(!message.member.permissions.has("MuteMembers")) return message.reply("Bu komutu kullanmak için yetkin yok.");

    const user = message.mentions.members.first();
    if (!user) return message.reply("Lütfen susturulacak kullanıcıyı etiketle.");

    const duration = args[1];
    if (!duration) return message.reply("Lütfen süre belirt (örn: 10m, 1h, 30s).");

    // Susturmak için sunucuda 'Muted' rolü olmalı
    let muteRole = message.guild.roles.cache.find(r => r.name === "Muted");
    if (!muteRole) {
      try {
        muteRole = await message.guild.roles.create({
          name: "Muted",
          permissions: []
        });

        message.guild.channels.cache.forEach(channel => {
          channel.permissionOverwrites.edit(muteRole, {
            SendMessages: false,
            AddReactions: false,
            Speak: false,
          });
        });
      } catch (err) {
        return message.reply("Mute rolü oluşturulurken bir hata oluştu.");
      }
    }

    if (user.roles.cache.has(muteRole.id)) return message.reply("Kullanıcı zaten susturulmuş.");

    await user.roles.add(muteRole);

    message.reply(`${user} başarıyla susturuldu! Süre: ${duration}`);

    // Süre sonunda mute kaldırma
    const ms = parseDuration(duration);
    if (ms) {
      setTimeout(() => {
        if(user.roles.cache.has(muteRole.id)) user.roles.remove(muteRole);
      }, ms);
    }
  }
};

// Basit süre parse fonksiyonu: "10m" -> milisaniye
function parseDuration(str) {
  const match = str.match(/^(\d+)(s|m|h|d)$/);
  if (!match) return null;
  const amount = parseInt(match[1]);
  const unit = match[2];
  switch(unit) {
    case 's': return amount * 1000;
    case 'm': return amount * 60 * 1000;
    case 'h': return amount * 60 * 60 * 1000;
    case 'd': return amount * 24 * 60 * 60 * 1000;
    default: return null;
  }
}
