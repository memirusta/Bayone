const { createCanvas, loadImage, registerFont } = require('canvas');
const { AttachmentBuilder } = require('discord.js');
const db = require('../../database');
const path = require('path');
const sharp = require('sharp');
const axios = require('axios');

// Open Sans fontunu kaydediyoruz
registerFont(path.join(__dirname, 'fonts/OpenSans-Regular.ttf'), { family: 'Open Sans' });

module.exports = {
    ad: "level",
    kategori: "moderation",
    async execute(message, args, client) {
        if (!db.bul("level" + message.guildId)) return message.reply('Seviye sistemi açık değil');

        try {
            const user = message.mentions.users.first() || message.author;
            if (user.bot) return message.reply('Lütfen bot etiketlemeyin.');

            const levelData = db.bul(user.id + message.guildId + "level") || 0;
            const level = Math.floor(levelData / 10000);
            const nextLevelXP = (level + 1) * 10000;
            const currentXP = levelData % 10000;
            const totalXP = levelData;

            const rank = await getRank(user, message.guildId, message);

            const attachment = await createLevelCard(user, level, currentXP, nextLevelXP, totalXP, rank);
            if (attachment) {
                message.reply({ files: [attachment] });
            } else {
                message.reply("Seviye kartı oluşturulamadı.");
            }

        } catch (error) {
            console.error("Seviye komutu hatası:", error);
            message.reply("Seviye kartı oluşturulurken bir hata oluştu.");
        }
    }
};

// Sıralama hesaplama
async function getRank(user, guildId, message) {
    const allUsers = await getAllUserLevels(guildId, message.guild.members.cache);
    const sortedUsers = allUsers.sort((a, b) => b.totalXP - a.totalXP);
    const userRank = sortedUsers.findIndex(u => u.userId === user.id) + 1;
    return userRank;
}

// Veritabanındaki tüm kullanıcıların level verilerini al
async function getAllUserLevels(guildId, members) {
    const allUsers = [];

    for (const member of members.values()) {
        const levelData = db.bul(member.id + guildId + "level") || 0;
        const level = Math.floor(levelData / 10000);
        allUsers.push({
            userId: member.id,
            level,
            totalXP: levelData
        });
    }

    return allUsers;
}

// Seviye kartı oluşturucu
async function createLevelCard(user, level, currentXP, nextLevelXP, totalXP, rank) {
    const canvasWidth = 800;
    const canvasHeight = 250;
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext('2d');

    // Arka plan
    ctx.fillStyle = '#36393f';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Avatarı yükle
    let avatar;
    try {
        const avatarUrl = user.displayAvatarURL({ size: 256 });
        const response = await axios.get(avatarUrl, { responseType: 'arraybuffer' });
        const pngBuffer = await sharp(response.data).png().toBuffer();
        avatar = await loadImage(pngBuffer);
    } catch (error) {
        console.error("Avatar yüklenemedi:", error);
        return null;
    }

    // Avatar çiz
    ctx.drawImage(avatar, 20, 20, 200, 200);

    // Kullanıcı adı
    ctx.fillStyle = '#ffffff';
    ctx.font = '36px "Open Sans"';
    ctx.fillText(user.username, 240, 60);

    // Seviye ve sıralama
    ctx.font = '24px "Open Sans"';
    ctx.fillText(`LVL ${level + 1}`, 240, 100);
    ctx.fillText(`Rank: #${rank}`, 340, 100);

    // Toplam XP
    ctx.fillText(`Total: ${totalXP}`, 240, 140);

    // İlerleme çubuğu
    const progressBarWidth = 500;
    const progressBarHeight = 30;
    const progressBarX = 240;
    const progressBarY = 170;
    const filledWidth = (currentXP / nextLevelXP) * progressBarWidth;

    ctx.fillStyle = '#4f545c';
    ctx.fillRect(progressBarX, progressBarY, progressBarWidth, progressBarHeight);

    ctx.fillStyle = '#5865f2';
    ctx.fillRect(progressBarX, progressBarY, filledWidth, progressBarHeight);

    // XP metni
    ctx.fillStyle = '#ffffff';
    ctx.font = '20px "Open Sans"';
    ctx.fillText(`${currentXP} / ${nextLevelXP}`, progressBarX, progressBarY + progressBarHeight + 25);

    return new AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'level.png' });
}
