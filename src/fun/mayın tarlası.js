const { EmbedBuilder } = require('discord.js')
const { Minesweeper } = require('discord-gamecord')
module.exports = {
    ad:'mayıntarlası',
    kategori: 'fun',
   async execute(message,args){
    const Game = new Minesweeper({
        message: message,
        isSlashGame: false,
        embed: {
          title: 'Mayın Tarlası',
          color: '#FFA500',
          description: 'Blokları ortaya çıkarmak için butonlara bas.'
        },
        emojis: { flag: '🚩', mine: '💣' },
        mines: 5,
        timeoutTime: 60000,
        winMessage: 'Oyunu kazandın!.',
        loseMessage: 'Oyunu kaybettin! Bir dahakine mayınlara dikkat et.',
        playerOnlyMessage: 'Sadece {player} butonları kontrol edebilir.'
      });
      
      Game.startGame();
      Game.on('gameOver', result => {
      });
   } 
}