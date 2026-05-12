module.exports = {
    ad: 'level-sistem',
    kategori:'moderation',
    async execute(message, args, client) {
        const sunucu = message.guild.id;
        const katsayi = args[1];
        const komut = args[0];
        const db = require('../../database'); // Veritabanı işlemleri için db modülünü kullanıyoruz

        if (!komut) return message.reply('Lütfen "aç" veya "kapat" diye belirtiniz!');

        const members = message.guild.members.cache;

        if (komut === "aç") {
            // Eğer sistem zaten açıksa, uyarı veriyoruz
            if (db.bul("level" + sunucu)) {
                return message.reply('Level sistemi zaten açık!');
            }

            // Eğer katsayı belirtilmişse, onu kaydediyoruz
            if (katsayi) {
                db.yaz("level" + sunucu, katsayi); // Katsayıyı veritabanına kaydediyoruz
                message.reply(`Level sistemi başarıyla açıldı! Katsayı: ${katsayi}`);
            } else {
                db.yaz("level" + sunucu, 1); // Katsayı belirtilmemişse varsayılan değer olarak 1 alır
                message.reply('Level sistemi başarıyla açıldı! Varsayılan katsayı: 1');
            }
        } else if (komut === "kapat") {
            // Level sistemi kapalıysa, uyarı veriyoruz
            if (!db.bul("level" + sunucu)) {
                return message.reply('Level sistemi zaten kapalı!');
            }

            // Level sistemini kapatıyoruz ve veritabanından silme işlemi yapıyoruz
            db.sil("level" + sunucu);
            members.forEach(member => {
                const levelKey = member.id + message.guildId + "level"; // Her üyenin level'ı için anahtar
                db.sil(levelKey);  // Veritabanından bu anahtarı siliyoruz
            });

            message.reply('Level sistemi başarıyla kapandı!');
        } else {
            message.reply('Geçersiz komut! Lütfen "aç" veya "kapat" komutlarını kullanın.');
        }
    }
};
