const { EmbedBuilder } = require('discord.js');
const db = require('../../database');

module.exports = {
    name: 'guildMemberAdd', // Event adı düzeltildi
    async execute(member) { // Parametreler düzeltildi
        try {
            // Karşılama mesajı kontrolü
            const kanalId = db.bul(`karşılama${member.guild.id}`);
            if (!kanalId) return;

            const kanal = member.guild.channels.cache.get(kanalId);
            if (!kanal) {
                console.error(`❌ Karşılama kanalı bulunamadı: ${kanalId}`);
                return;
            }

            // Tarih formatlama
            const date = new Date();
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');

            // Embed oluşturma
            const embed = new EmbedBuilder()
                .setTitle(`🎉 ${member.user.tag} aramıza katıldı!`)
                .setDescription('Sunucumuza hoş geldin! Kuralları okumayı unutma 😊')
                .addFields(
                    { name: 'Toplam Üye', value: `${member.guild.memberCount}`, inline: true },
                    { name: 'Hesap Oluşturulma', value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`, inline: true }
                )
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setFooter({ text: `${day}/${month}/${year} ${hours}:${minutes}` })
                .setColor('#00FF00');

            // Mesaj gönderme
            await kanal.send({ 
                content: `${member}`, 
                embeds: [embed] 
            });

            console.log(`✅ ${member.user.tag} için karşılama mesajı gönderildi`);

        } catch (error) {
            console.error('❌ Karşılama mesajı gönderilirken hata:', error);
        }

        // Otorol kısmı (ayrı try-catch ile)
        try {
            const rolAdi = db.bul(`otorol${member.guild.id}`);
            if (!rolAdi) return;

            const rol = member.guild.roles.cache.find(r => r.name === rolAdi);
            if (!rol) {
                console.error(`❌ Otorol bulunamadı: ${rolAdi}`);
                return;
            }

            await member.roles.add(rol);
            console.log(`✅ ${member.user.tag} kullanıcısına ${rol.name} rolü verildi`);

        } catch (error) {
            console.error('❌ Otorol verme hatası:', error);
        }
    }
};