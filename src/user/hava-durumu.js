const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    ad: 'hava-durumu',
    kategori:'user',
    async execute(message, args) {
        const city = args.join(' ');
        if (!city) return message.reply('Lütfen bir şehir adı girin.');
        
        const apiKey = '775cd164ba1309b61765f463e530e368';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`;
        
        try {
            const response = await axios.get(url);
            const { weather, main, wind } = response.data;

            // Hava durumu açıklamasını baş harfi büyük yapma fonksiyonu
            function capitalizeFirstLetter(str) {
                return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            }

            const capitalizedWeather = capitalizeFirstLetter(weather[0].description);

            // Hava durumu durumuna göre emoji seçimi
            let emoji;
            switch (weather[0].main.toLowerCase()) {
                case 'clear':
                    emoji = '☀️'; // Güneşli
                    break;
                case 'clouds':
                    emoji = '☁️'; // Bulutlu
                    break;
                case 'rain':
                    emoji = '🌧️'; // Yağmurlu
                    break;
                case 'thunderstorm':
                    emoji = '⛈️'; // Fırtınalı
                    break;
                case 'snow':
                    emoji = '🌨️'; // Karlı
                    break;
                default:
                    emoji = '❓'; // Bilinmeyen durum
            }

            const embed = new EmbedBuilder()
                .setTitle(`${city} için Hava Durumu`)
                .setDescription(`${emoji} ${capitalizedWeather}`)
                .addFields(
                    { name: 'Sıcaklık', value: `${main.temp}°C`, inline: true },
                    { name: 'Nem', value: `${main.humidity}%`, inline: true },
                    { name: 'Rüzgar Hızı', value: `${wind.speed} m/s`, inline: true }
                )
                .setColor('Orange');

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.log(error);
            message.reply(`'${city}' adlı şehir bulunamadı.`);
        }
    }
};
