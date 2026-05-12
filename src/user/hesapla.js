const { evaluate } = require('mathjs');
const { Message } = require('discord.js')

module.exports = {
    ad: 'hesapla',
    kategori:'user',
    async execute(message, args) {
        try {
            const expression = args.join(' ');
            if(!expression) return message.reply('Lütfen bir işlem girin')
            const result = evaluate(expression);
            message.reply(`Sonuç: ${result}`);
        } catch (error) {
            message.reply('Geçersiz ifade, lütfen doğru bir matematiksel ifade girin.');
        }
    }
}
