const { EmbedBuilder } = require('discord.js');
const Discord = require('discord.js')
const moment = require('moment')
require('moment-duration-format')
const os = require('os');
const { uptime } = require('process');
const db = require('../../database')
module.exports = {
    ad:'istatistik',
    kategori:'user',
    async execute(message, args, client){
      var prefix = db.bul('prefix' + message.guild.id);
      const dizi =[]
  client.guilds.cache.forEach((item,i) => {
    dizi.push(item.memberCount)
  });
  var toplam =0
  for(var i = 0; i < dizi.length; i++){
    if(isNaN(dizi[i])){
      continue;
    }
    toplam += Number(dizi[i]);
  }
  const uptime = moment.duration(client.uptime).format("M [ay] W [hafta] D [gün], H [saat], m [dakika], s [saniye]")
  const tarih = new Date(client.user.createdAt).toLocaleDateString("tr-TR")
  const sahipID = "676292780611338251"
  const sahips = client.users.cache.find((sahip) => sahip.id === sahipID)
  const startUsage = process.cpuUsage();
  const endUsage = process.cpuUsage();
  const userUsage = endUsage.user - startUsage.user;
  const systemUsage = endUsage.system - startUsage.system;
  const totalUsage = userUsage + systemUsage;
  const cpuUsagePercent = ((userUsage + systemUsage) / 1000) * 100;
  const embed = new EmbedBuilder()
  .setTitle('Bot İstatistiği:')
  .setDescription(`**Prefix**:\`${prefix}\``)
  .addFields(
    { name:'»Botu Kullanan Kullanıcı Sayısı:', value: `${toplam}`,inline: false},
    { name:'»Botun Bulunduğu Sunucu Sayısı:', value:` ${client.guilds.cache.size}`,inline: false},
    { name:'»Kanal Sayısı', value: `${client.channels.cache.size}`},
    { name:'»Çalışma Süresi:', value: `${uptime}`,inline: false},
    { name:'»Gecikme Süresi:', value:`${client.ws.ping} ms`},
    { name:'»Ram Kullanımı:', value:`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB (${(process.memoryUsage().heapUsed / 1024 / 1024/ 1024).toFixed(2)} GB)`},
    { name: '»İşlemci Kullanımı:', value:`${cpuUsagePercent.toFixed(2)}%`},
    { name:'»Sahip Olunan İşlemci:', value:`\`${os.cpus().map(i => i.model)[0]}\``},
    { name:'»İşlemci Biti:', value:`\`${os.arch()}\``},
    { name:'»İşletim Sistemi:', value:`\`${os.platform()}\``},
    { name:'»Bot Kütüphanesi:', value:`discord.js`},
    { name:'»Discord.js Versiyonu:', value:`${Discord.version}`},
    { name:'»Node.js Versiyonu:', value:`${process.version}`,inline: false},
    { name:'»Oluşturulma Tarihi:', value:`${tarih}`},
    { name:'»Bot Sahibi:', value:`${sahips.username}`},

  )
  .setColor('Orange')
  .setFooter({
    text:'Bayone Bot', iconURL:client.user.displayAvatarURL()
  })
  message.channel.send({embeds:[embed]})
    }
}
