const { EmbedBuilder } = require('discord.js');
const db = require('../../database');

module.exports = {
    ad: "level-bilgi",
    kategori:'user',
    async execute(message, args, client) {
        // Sunucunun prefix'ini veritabanından alıyoruz
        const prefix = db.bul('prefix' + message.guild.id);

        // Embed mesajını oluşturuyoruz
        const embed = new EmbedBuilder()
            .setTitle("Seviye Sistemi Komutu - Yardım")
            .setDescription(`
                **Seviye Sistemi** komutu, sunucudaki her kullanıcı için bir seviye sistemi sağlar.
                Bu komut, kullanıcının mevcut seviyesini ve XP'sini görüntülemenize olanak tanır.

                **Kullanım:**
                - **${prefix}level-sistem aç/kapat (XP katsayısı)**: Sunucunun seviye sistemini ayarlar.

                **Seviye Sistemi Nedir?**
                Seviye sistemi, kullanıcılara sunucuda aktif oldukça XP (Deneyim Puanı) kazandırır. XP miktarı arttıkça kullanıcılar seviyelerini yükseltir.
                
                **Seviye ve XP Hesaplama:**
                - Her 10000 XP, 1 seviye anlamına gelir.
                - Level, XP miktarına göre hesaplanır ve her seviyenin ilerlemesi daha fazla XP gerektirir.

                **Not:**
                - Seviye sistemi, sunucuda aktifse kullanılabilir.
                - Eğer seviye sistemi kapalıysa, komut çalışmaz.
                - Eğer mesaj silinirse o mesajdan gelen xp'ler de silinir

                **Örnekler:**
                -**${prefix}level**: Kendi seviye bilginizi öğrenirsiniz.
                - **${prefix}level @Kullanıcı**: Belirttiğiniz kullanıcının seviye bilgisini öğrenirsiniz.
            `)
            .setColor("Orange") // Embed rengini belirliyoruz
            .setFooter({ text: "Seviye sistemi hakkında daha fazla bilgi için yetkiliye başvurun.", iconURL: message.author.displayAvatarURL() });

        // Mesajı kullanıcıya gönderiyoruz
        message.reply({ embeds: [embed] });
    }
};
