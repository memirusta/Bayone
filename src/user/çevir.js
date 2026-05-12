// util/translate.js
const translate = require('@vitalets/google-translate-api');

module.exports = {
  ad: "çevir",
  kategori: "user",
  async execute(message, args, client) {
    if(args.length < 2) return message.reply("Doğru kullanım: !translate <dil_kodu> <çevirilecek metin>");

    const lang = args[0];
    const text = args.slice(1).join(' ');

    try {
      const res = await translate(text, { to: lang });
      message.reply(`**Çeviri (${lang}):** ${res.text}`);
    } catch (err) {
      console.error(err);
      message.reply("Çeviri yapılırken bir hata oluştu.");
    }
  }
};
