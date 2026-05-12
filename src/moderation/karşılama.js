const { EmbedBuilder } = require('discord.js');
const db = require('../../database.js');

module.exports = {
    ad: 'karşılama',
    kategori: 'moderation',
    async execute(message, args) {
        if (!message.member.permissions.has("Administrator")) {
            return message.reply('❌ Bu komutu kullanmak için **Yönetici** yetkisine sahip olmalısınız.');
        }

        const prefix = db.bul(`prefix${message.guild.id}`) || '!';
        
        // Karşılama zaten açık mı kontrolü
        if (db.bul(`karşılama${message.guild.id}`)) {
            return message.reply(`ℹ️ Karşılama zaten açık! Kapatmak için: \`${prefix}karşılama-kapat\``);
        }

        // Kanal etiket kontrolü
        const kanal = message.mentions.channels.first();
        if (!kanal) {
            return message.reply('❌ Lütfen geçerli bir kanal etiketleyin! Örnek: `!karşılama #hosgeldin-kanali`');
        }

        // Kanal yazma izni kontrolü
        if (!kanal.permissionsFor(message.guild.members.me).has('SendMessages')) {
            return message.reply('❌ Bu kanala mesaj gönderme yetkim yok!');
        }

        // Veritabanına kaydet
        await db.yaz(`karşılama${message.guild.id}`, kanal.id);

        const embed = new EmbedBuilder()
            .setTitle('✅ Karşılama Sistemi Aktif!')
            .setDescription(`Artık yeni üyeler **${kanal.name}** kanalında karşılanacak!`)
            .setColor('Green');
        
        message.channel.send({ embeds: [embed] });
    }
};