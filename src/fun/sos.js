const {EmbedBuilder} = require('discord.js')
const {TicTacToe} = require('discord-gamecord')
module.exports = {
    ad:'sos',
    kategori: 'fun',
    async execute(message,args){
        if(!message.mentions.users.first()) return message.reply('Lütfen oynamak istediğiniz kişiyi etiketleyin')
  const Game = new TicTacToe({
    message: message,
    isSlashGame: false,
    opponent: message.mentions.users.first(),
    embed: {
      title: 'X-O-X',
      color: '#FFA500',
      statusTitle: 'Status',
      overTitle: 'Oyun Bitti'
    },
    emojis: {
      xButton: '❌',
      oButton: '🔵',
      blankButton: '➖'
    },
    mentionUser: true,
    timeoutTime: 60000,
    xButtonStyle: 'DANGER',
    oButtonStyle: 'PRIMARY',
    turnMessage: "{emoji} | **{player}**.",
    winMessage: '{emoji} | **{player}** kazandı.',
    tieMessage: 'Oyun berabere! Kimse kazanamadı!',
    timeoutMessage: 'Oyun Bitirlmedi! Kimse kazanamadı!',
    playerOnlyMessage: 'Sadece {player} ve {opponent} butonları kullanabilir.'
  });
  
  Game.startGame();
  Game.on('gameOver', result => {
  });
    }
}