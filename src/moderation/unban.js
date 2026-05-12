const { EmbedBuilder } = require('discord.js');

module.exports = {
    ad: 'unban', // Komut adı (prefix ile kullanılacak)
    kategori: 'moderation',
    async execute(message, args) {
        // Yetki kontrolü
        if (!message.member.permissions.has("BanMembers")) {
            return message.reply('❌ Bu komutu kullanmak için **Üyeleri Yasakla** yetkisine sahip olmalısınız.');
        }

        // Kullanıcı ID'si veya etiket kontrolü
        const target = args[0] || message.mentions.users.first()?.id;
        if (!target) {
            return message.reply('ℹ️ Lütfen bir kullanıcı **ID**si belirtin veya etiketleyin.\nÖrnek: `!unban 123456789`');
        }

        try {
            // Sunucu yasaklarını kontrol et
            const bans = await message.guild.bans.fetch();
            const bannedUser = bans.find(ban => 
                ban.user.id === target || 
                ban.user.tag.toLowerCase().includes(target.toLowerCase())
            );

            if (!bannedUser) {
                return message.reply('❌ Belirtilen kullanıcı yasaklı değil.');
            }

            // Yasak kaldırma
            await message.guild.bans.remove(bannedUser.user);
            
            // Başarılı embed
            const embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle('✅ Yasağı Kaldırıldı')
                .setDescription(`${bannedUser.user.tag} adlı kullanıcının yasağı kaldırıldı.`)
                .setFooter({ text: `Moderatör: ${message.author.tag}` });
            
            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error('Unban hatası:', error);
            message.reply('⚠️ Bir hata oluştu: ' + error.message);
        }
    }
};