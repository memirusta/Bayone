const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const db = require('../../database')// Kendi veri tabanını burada kullanıyorsun

module.exports = {
  data: new SlashCommandBuilder()
    .setName('prefix')
    .setDescription('Sunucudaki prefixi görüntüle veya değiştir.')
    .addStringOption(option =>
      option.setName('change')
        .setDescription('Yeni prefixi gir. (Boş bırakılırsa mevcut prefix gösterilir)')
        .setRequired(false)
    ),

  async execute(interaction) {
    const t = interaction.options.getString('change');
    const guildId = interaction.guildId;
    const prefix = db.bul("prefix" + guildId);

    if (!t) {
      if (prefix) {
        const embed = new EmbedBuilder()
          .setTitle(`🔧 Şu anki prefix: \`${prefix}\``)
          .setDescription(`Yeni bir prefix ayarlamak için: \`/prefix change: yeni-prefix\``)
          .setColor('Orange');
        return interaction.reply({ embeds: [embed] });
      } else {
        return interaction.reply('❗ Henüz bir prefix ayarlanmamış. Ayarlamak için: `/prefix change: !` gibi bir komut kullan.');
      }
    } else {
      // Değiştirme işlemi
      if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
        return interaction.reply({ content: '❌ Bu komutu sadece **Yönetici** olanlar kullanabilir.', ephemeral: true });
      }

      if (t === '/') {
        return interaction.reply({ content: '⚠️ Prefixi `/` olarak ayarlayamazsınız.', ephemeral: true });
      }

      if (prefix) {
        const eski = db.bul("prefix" + guildId);
        db.sil("prefix" + guildId);
        db.yaz("prefix" + guildId, t);
        const embed = new EmbedBuilder()
          .setTitle('✅ Prefix güncellendi!')
          .addFields(
            { name: 'Yeni Prefix', value: `\`${t}\``, inline: true },
            { name: 'Eski Prefix', value: `\`${eski}\``, inline: true }
          )
          .setColor('Orange');
        return interaction.reply({ embeds: [embed] });
      } else {
        db.yaz("prefix" + guildId, t);
        const embed = new EmbedBuilder()
          .setTitle(`✅ Prefix ayarlandı!`)
          .setDescription(`Yeni prefix: \`${t}\``)
          .setColor('Orange');
        return interaction.reply({ embeds: [embed] });
      }
    }
  }
};
