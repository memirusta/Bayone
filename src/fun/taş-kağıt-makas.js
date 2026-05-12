const { EmbedBuilder } = require('discord.js')
const {RockPaperScissors} = require('discord-gamecord')
module.exports = {
    ad:'taş-kağıt-makas',
    kategori: 'fun',
    async execute(message,args){
        if(!message.mentions.users.first()) return message.reply('Lütfen oynamak istediğiniz kişiyi etiketleyin')
  const Game = new RockPaperScissors({
    message: message,
    isSlashGame: false,
    opponent: message.mentions.users.first(),
    embed: {
      title: 'Taş-Kağıt-Makas',
      color: '#FFA500',
      description: 'Hamlen için butonlara bas.'
    },
    buttons: {
      rock: 'Taş',
      paper: 'Kağıt',
      scissors: 'Makas'
    },
    emojis: {
      rock: '🌑',
      paper: '📰',
      scissors: '✂️'
    },
    mentionUser: true,
    timeoutTime: 60000,
    buttonStyle: 'PRIMARY',
    pickMessage: "{emoji}'ı seçtin.",
    winMessage: '**{player}** oyunu kazandı! Tebrikler!',
    tieMessage: 'Oyun berabere! Kimse kazanamadı!',
    timeoutMessage: 'Oyun bitirilmedi! Kimse kazanmadı!',
    playerOnlyMessage: 'Sadece {player} ve {opponent} butonları kullanabilir.'
  });
  
  Game.startGame();
  Game.on('gameOver', result => {
  });
    }
}