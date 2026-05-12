const db = require('../../database')
module.exports = {
    name:'messageDelete',
    async execute(message, member, client){
  const length = db.bul("level" + message.guildId); // Seviye sayısı veya toplam XP'yi buluyoruz
  if(!length) return
  const user = message.author
  const userId = user.id + message.guildId + "level";
  const currentLevelXP = db.bul(userId) || 0; // Kullanıcının mevcut XP'sini alıyoruz

  db.çıkar(userId, length * message.content.length);
    }
}