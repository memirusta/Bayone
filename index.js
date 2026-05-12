require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const db = require('./database');

// Environment kontrolü
if (!process.env.TOKEN) throw new Error("TOKEN eksik!");
if (!process.env.CLIENT_ID) throw new Error("CLIENT_ID eksik!");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

// Komut koleksiyonları
const prefixCommands = new Collection();
const slashCommands = new Collection();
const slashCommandData = [];

// Prefix komutlarını yükle
const loadPrefixCommands = () => {
  const commandFolders = ['fun', 'moderation', 'user'];
  
  for (const folder of commandFolders) {
    const commandsPath = path.join(__dirname, 'src', folder);
    if (!fs.existsSync(commandsPath)) continue;
    
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const command = require(path.join(commandsPath, file));
      if (command.ad) {
        prefixCommands.set(command.ad, command);
        console.log(`[Prefix Komut] ${command.ad} yüklendi`);
      }
    }
  }
};

// Slash komutlarını yükle
const loadSlashCommands = () => {
  const slashCommandsPath = path.join(__dirname, 'src', 'slashCommands');
  if (!fs.existsSync(slashCommandsPath)) {
    console.log('[!] Slash komut klasörü bulunamadı, atlanıyor...');
    return;
  }

  const commandFiles = fs.readdirSync(slashCommandsPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(path.join(slashCommandsPath, file));
    if (command.data && command.execute) {
      slashCommands.set(command.data.name, command);
      slashCommandData.push(command.data.toJSON());
      console.log(`[Slash Komut] ${command.data.name} yüklendi`);
    }
  }
};

// Slash komutları Discord'a kaydet
const registerSlashCommands = async () => {
  if (slashCommandData.length === 0) return;

  try {
    console.log('[🔄] Slash komutlar Discord\'a kaydediliyor...');
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: slashCommandData }
    );
    console.log('[✅] Slash komutlar başarıyla kaydedildi');
  } catch (error) {
    console.error('[❌] Slash komut kaydı başarısız:', error);
  }
};

// Event'leri yükle
const loadEvents = () => {
  const eventsPath = path.join(__dirname, 'src', 'events');
  if (!fs.existsSync(eventsPath)) {
    console.log('[!] Events klasörü bulunamadı, atlanıyor...');
    return;
  }

  const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

  for (const file of eventFiles) {
    const event = require(path.join(eventsPath, file));
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }
    console.log(`[Event] ${event.name} yüklendi`);
  }
};

// Botu başlat
const initialize = async () => {
  loadPrefixCommands();
  loadSlashCommands();
  await registerSlashCommands();
  loadEvents();

  // Prefix komut işleyici
  client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (!message.guild) return;

    // Prefix'i veritabanından al veya fallback kullan
    const prefix = db.bul(`prefix${message.guild.id}`) || process.env.DEFAULT_PREFIX || '!';
    
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = prefixCommands.get(commandName);
    if (!command) return;

    try {
      console.log(`[Komut Çalıştır] ${commandName} - ${message.author.tag}`);
      await command.execute(message, args, client);
    } catch (error) {
      console.error(`[HATA] ${commandName}:`, error);
      await message.reply('⚠️ Komut çalıştırılırken bir hata oluştu!').catch(console.error);
    }
  });

  // Slash komut işleyici
  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = slashCommands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`[HATA] ${interaction.commandName}:`, error);
      await interaction.reply({ 
        content: '⚠️ Komut çalıştırılırken bir hata oluştu!', 
        ephemeral: true 
      }).catch(console.error);
    }
  });

  client.once('ready', () => {
    console.log(`[✅] ${client.user.tag} olarak giriş yapıldı!`);
  });

  await client.login(process.env.TOKEN);
};

initialize().catch(console.error);