const { EmbedBuilder, ChannelType } = require('discord.js');
module.exports = {
    ad: 'sunucu-bilgi',
    kategori:'user',
    async execute(message, args) {
        const tarih = new Date(message.guild.createdAt).toLocaleDateString("tr-TR");

        // Yazı, ses ve kategori kanallarını filtreleyin
        const textChannels = message.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildText).size;
        const voiceChannels = message.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildVoice).size;
        const categoryChannels = message.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildCategory).size;

        // Üye sayısını al
        await message.guild.members.fetch(); // Bu, tüm üyeleri cache'e yükler
        const memberCount = message.guild.memberCount;

        const embed = new EmbedBuilder()
            .setTitle(`${message.guild.name} | Sunucu Bilgileri:`)
            .addFields(
                { name: '👑 Sunucu Sahibi', value: `<@${message.guild.ownerId}>` },
                { name: '🆔 Sunucu ID', value: `${message.guild.id}` },
                { name: '📅 Oluşturulma Tarihi', value: `${tarih}` },
                { name: `📜 Kanal Sayısı [${message.guild.channels.cache.size}]`, value: `${textChannels} Yazı | ${voiceChannels} Ses | ${categoryChannels} Kategori` },
                { name: '👥 Üye Sayısı', value: `${memberCount}` },
                { name: '🔮 Rol Sayısı', value: `${message.guild.roles.cache.size}` },
                { name: '🚀 Boost Sayısı', value: `${message.guild.premiumSubscriptionCount}` },
            )
            .setColor('Orange');
        
        message.channel.send({ embeds: [embed] });
    }
};
