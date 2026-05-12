const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const db = require('../../database.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Shows all commands.')
    .addStringOption(option =>
      option.setName('categories')
        .setDescription('Choose which command list you want.')
        .addChoices(
          { name: 'Moderation', value: 'moderation' },
          { name: 'Fun', value: 'fun' },
          { name: 'User', value: 'user' }
        )
    ),
  
  async execute(interaction) {
    const option = interaction.options.getString('categories');
    let prefix = db.bul('prefix' + interaction.guildId) || 'Prefix tanımlanmadı, tanımlamak için: **/prefix**';

    const baseEmbed = new EmbedBuilder()
      .setAuthor({ name: `BayoneBot'u Kullandığınız için teşekkür ederiz. 😊` })
      .setTitle(typeof prefix === "string" ? prefix : '')
      .setColor("Orange");

    if (!option) {
      baseEmbed.setDescription('**| Moderasyon:** Moderasyon komutlarını gösterir.\n**| Eğlence:** Eğlence komutlarını gösterir.\n**| Kullanıcı:** Kullanıcı komutlarını gösterir.');
      return interaction.reply({ embeds: [baseEmbed] });
    }

    if (option === 'moderation') {
      baseEmbed.setDescription("Botta bulunan **moderasyon komutları**:")
        .addFields(
          { name: 'kick', value: `${prefix}kick @kullanıcıetiketi "sebep"` },
          { name: 'ban', value: `${prefix}ban @kullanıcıetiketi "sebep"` },
          { name: 'unban', value: `${prefix}unban kullanıcıid "sebep"` },
          { name: 'reklamengel', value: `Reklam engelleyiciyi açar` },
          { name: 'reklamengel-kapat', value: 'Reklam engelleyiciyi kapatır' },
          { name: 'otorol', value: 'Sunucuya girenlere otomatik rol verir' },
          { name: 'otorol-kapat', value: 'Otorol sistemini kapatır' },
          { name: 'sil', value: 'Belirtilen kadar mesaj siler' },
          { name: 'karşılama', value: 'Sunucuya girenleri karşılar' },
          { name: 'karşılama-kapat', value: 'Karşılama sistemini kapatır' }
        );
    } else if (option === 'fun') {
      baseEmbed.setDescription("Botta bulunan **eğlence komutları**:")
        .addFields(
          { name: 'adamasmaca', value: 'Adam asmaca oyununu başlatır' },
          { name: '2048', value: '2048 oyununu başlatır' },
          { name: 'yılan', value: 'Yılan oyununu başlatır' },
          { name: 'mayıntarlası', value: 'Mayın tarlası oyununu başlatır' },
          { name: 'sos', value: 'XOX oyunu oynarsınız' },
          { name: 'taş-kağıt-makas', value: 'Taş-kağıt-makas oynarsınız' },
          { name: 'sahtemesaj', value: 'Sahte mesaj oluşturur' }
        );
    } else if (option === 'user') {
      baseEmbed.setDescription("Botta bulunan **kullanıcı komutları**:")
        .addFields(
          { name: 'istatistik', value: 'Bot istatistiğini gösterir' },
          { name: 'avatar', value: 'Etiketlenen kişinin avatarını gösterir' },
          { name: 'sunucu-bilgi', value: 'Sunucu bilgilerini gösterir' },
          { name: 'kullanıcı-bilgi', value: 'Kullanıcı bilgilerini gösterir' },
          { name: 'ping', value: 'Botun pingini gösterir' },
          { name: 'hava-durumu', value: 'Hava durumunu gösterir' },
          { name: 'level-bilgi', value: 'Level sistemini anlatır' }
        );
    }

    return interaction.reply({ embeds: [baseEmbed] });
  }
};
