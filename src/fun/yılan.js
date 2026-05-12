const { EmbedBuilder } = require('discord.js')
const {Snake} = require('discord-gamecord')
module.exports = {
    ad:'yılan',
    kategori: 'fun',
    async execute(message,args){
        const Game = new Snake({
            message: message,
            isSlashGame: false,
            embed: {
              title: 'Yılan Oyunu',
              overTitle: 'Oyun Bitti',
              color: '#FFA500'
            },
            emojis: {
              board: '⬛',
              food: '🍎',
              up: '⬆️', 
              down: '⬇️',
              left: '⬅️',
              right: '➡️',
            },
            snake: { head: '🟢', body: '🟩', tail: '🟢', skull: '💀' },
            foods: ['🍎', '🍇', '🍊', '🫐', '🥕', '🥝', '🌽'],
            stopButton: 'Bitir',
            timeoutTime: 60000,
            playerOnlyMessage: 'Sadece {player} butonları kullanabilir.'
          });
          
          Game.startGame();
          Game.on('gameOver', result => {
          });
         
    }
}