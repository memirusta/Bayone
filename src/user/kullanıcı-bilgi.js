const { EmbedBuilder } = require('discord.js');

module.exports = {
    ad: 'kullanıcı-bilgi',
    kategori:'user',
    async execute(message, args, client) {
        const user = message.mentions.members.first() || message.guild.members.cache.get(message.author.id);
        

        const roles = user.roles.cache
            .filter(role => role.name !== '@everyone') // @everyone rolünü filtrele
            .map(role => role.toString()) // Her rolü mention haline getir
            .join(', ') || 'Rol bulunamadı'; // Roller yoksa "Rol bulunamadı" yaz

        let status = user.presence?.status || 'offline'; // Eğer presence bilgisi yoksa 'offline' kullan
        let durum;
        
        switch (status) {
            case 'idle':
                durum = '🌙 Boşta'; // Hilal ay
                break;
            case 'dnd':
                durum = '⛔ Rahatsız Etmeyin'; // DND (Do Not Disturb)
                break;
            case 'online':
                durum = '🟢 Çevrimiçi'; // Yeşil nokta
                break;
            case 'offline':
                durum = '⚫ Çevrimdışı'; // Gri nokta
                break;
            default:
                durum = '❓ Bilinmiyor'; // Bilinmeyen durum
                break;
        }

        const embed = new EmbedBuilder()
            .setTitle(`**${user.displayName}** Bilgileri:`)
            .addFields(
                {name:"Kullanıcı Tag'i:", value: user.user.tag},
                {name:"Kullanıcı ID'si:", value: user.id},
                {name:"Hesap Oluşturulma Tarihi:", value: user.user.createdAt.toLocaleDateString("tr-TR")},
                {name:"Sunucuya Katılma Tarihi:", value: user.joinedAt ? user.joinedAt.toLocaleDateString("tr-TR") : 'Sunucuya katılmamış'},
                {name: "Kullanıcı Durumu:", value: durum},                
                {name: "Kullanıcı'nın Rolleri:", value: roles}, // Eğer roller bulunmazsa "Rol bulunamadı" yazılır
            )
            .setColor('Orange')
            .setFooter({
                text: user.displayName,
                iconURL: user.displayAvatarURL({ dynamic: true })
            });

        message.channel.send({ embeds: [embed] });
    }
};
