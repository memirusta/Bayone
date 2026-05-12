const { EmbedBuilder } = require('discord.js')
const { TwoZeroFourEight } = require('discord-gamecord')
module.exports = {
    ad:'2048',
    kategori: 'fun',
    async execute(message,args){
        const Game = new TwoZeroFourEight({
            message: message,
            isSlashGame: false,
            embed: {
              title: '2048',
              color: '#FFA500'
            },
            emojis: {
              up: '⬆️',
              down: '⬇️',
              left: '⬅️',
              right: '➡️',
            },
            timeoutTime: 60000,
            buttonStyle: 'PRIMARY',
            playerOnlyMessage: 'Sadece ${player} bu butonları kullanabilir.'
          });
          
          Game.startGame();
          Game.on('gameOver', result => {
            console.log(result);  // =>  { result... }
          });
    }
}