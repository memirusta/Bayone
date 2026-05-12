module.exports = {
    ad:'sahtemesaj',
    kategori: 'fun',
    async execute(message,args){
        const user = message.mentions.users.first()
        if(!user) return message.reply('Lütfen birini etiketle.')
        if(!args[1]) return message.reply('Bir sahte mesaj mesajsız olmaz ki.')
        if(user.bot) return message.reply('Etiketlediğin kişi bir bot olamaz.')
        const mesaj = args.slice(1).join(" ")
        const webhook = await message.channel.createWebhook({
          name:user.displayName,
          reason:"Eğlence",
          avatar:user.displayAvatarURL()
        })
        webhook.send(mesaj)
        setTimeout(()=>{
          webhook.delete()
        }, 1000)
    }
}