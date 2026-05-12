// src/user/ping.js
module.exports = {
  ad: 'ping', // Komut adı
  kategori: 'user', // Kategori (opsiyonel)
  description: 'Botun ping değerini gösterir', // Açıklama (opsiyonel)
  
  async execute(message, args) {
    try {
      // Ölçüm mesajını gönder
      const msg = await message.channel.send('🏓 Ping ölçülüyor...');
      
      // Ping hesapla (mesaj gecikmesi)
      const ping = msg.createdTimestamp - message.createdTimestamp;
      
      // API gecikmesi (WebSocket ping)
      const apiPing = Math.round(message.client.ws.ping);
      
      // Sonucu düzenle
      await msg.edit(`
        🏓 Pong!
        📨 Mesaj Gecikmesi: ${ping}ms
        📶 Discord API: ${apiPing}ms
      `);
    } catch (error) {
      console.error('Ping komutunda hata:', error);
      message.reply('Ping ölçülürken bir hata oluştu!').catch(console.error);
    }
  }
};