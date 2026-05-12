const { EmbedBuilder } = require('discord.js')
const { Hangman } = require('discord-gamecord')
module.exports = {
    ad:'adamasmaca',
    kategori: 'fun',
    async execute(message, args){
        const Game = new Hangman({
            message: message,
            isSlashGame: false,
            embed: {
              title: 'Adam Asmaca',
              color: '#FFA500'
            },
            hangman: { hat: '🎩', head: '😟', shirt: '👕', pants: '🩳', boots: '👞👞' },
            timeoutTime: 60000,
            theme: 'nature',
            winMessage: 'Kazandın!.',
            loseMessage: 'Kaybettin! Kelime:  **{word}**.',
            playerOnlyMessage: 'Sadece {player} bu butonları kullanabilir.'
          });
          
          Game.startGame();
          Game.on('gameOver', result => {
             // =>  { result... }
          });
    }
}