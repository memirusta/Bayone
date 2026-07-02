# Bayone

Bayone is a feature-rich Discord bot built with **discord.js v14**. It supports both **prefix commands** and **slash commands**, and includes moderation tools, mini-games, utility features, and a lightweight JSON-based database for per-server settings.

## Features

### Moderation
- **ban** / **unban** / **kick** — Member management
- **mute** — Timeout members
- **sil** — Bulk message deletion
- **reklamengel** / **reklamengel-kapat** — Ad blocker toggle
- **otorol** / **otorol-kapat** — Auto-role on join
- **karşılama** / **karşılama-kapat** — Welcome messages
- **level** / **level-sistem** — XP and leveling system

### Fun
- **2048** — Play 2048
- **adamasmaca** — Hangman
- **yılan** — Snake game
- **mayın tarlası** — Minesweeper
- **sos** — Tic-tac-toe
- **taş-kağıt-makas** — Rock, paper, scissors
- **sahtemesaj** — Fake message generator

### User / Utility
- **afk** — Set AFK status
- **hava-durumu** — Weather lookup (OpenWeatherMap)
- **çevir** — Text translation
- **ping** — Bot latency
- **avatar** — User avatar
- **sunucu-bilgi** / **kullanıcı-bilgi** — Server and user info
- **istatistik** — Bot statistics
- **hesapla** — Calculator
- **level-bilgi** — Leveling system info

### Slash Commands
- **/help** — Command list by category
- **/prefix** — View or change the server prefix

## Tech Stack

| Technology | Purpose |
|---|---|
| [discord.js](https://discord.js.org/) v14 | Discord API wrapper |
| [dotenv](https://github.com/motdotla/dotenv) | Environment variables |
| [axios](https://axios-http.com/) | HTTP requests (weather API) |
| [@vitalets/google-translate-api](https://github.com/vitalets/google-translate-api) | Translation |
| [discord-gamecord](https://www.npmjs.com/package/discord-gamecord) | Mini-games |
| [canvas](https://www.npmjs.com/package/canvas) / [sharp](https://www.npmjs.com/package/sharp) | Image processing |
| JSON file (`database.json`) | Per-guild settings and data |

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- A [Discord application](https://discord.com/developers/applications) with a bot token
- (Optional) An [OpenWeatherMap API key](https://openweathermap.org/api) for the weather command

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/memirusta/Bayone.git
cd Bayone
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|---|---|---|
| `TOKEN` | Yes | Discord bot token |
| `CLIENT_ID` | Yes | Discord application client ID |
| `DEFAULT_PREFIX` | No | Fallback prefix (default: `!`) |
| `OPENWEATHER_API_KEY` | No | OpenWeatherMap API key for `hava-durumu` |

> **Never commit your `.env` file.** It is listed in `.gitignore`.

### 4. Initialize the database

Copy the example database file:

```bash
cp database.json.example database.json
```

The bot creates and updates keys automatically as features are used (prefix, welcome channel, auto-role, leveling, AFK, etc.).

### 5. Enable Discord intents

In the [Discord Developer Portal](https://discord.com/developers/applications), enable:

- **Message Content Intent**
- **Server Members Intent**

### 6. Run the bot

```bash
# Production
npm test

# Development (auto-restart on file changes)
npm run dev
```

On startup, the bot loads prefix commands, registers slash commands, and connects to Discord.

## Project Structure

```
Bayone/
├── index.js                 # Entry point — command loading, event handlers
├── database.js              # Database module export
├── database/
│   └── index.js             # JSON file database wrapper
├── database.json            # Runtime data (gitignored)
├── database.json.example    # Template for new setups
├── .env                     # Secrets (gitignored)
├── .env.example             # Environment variable template
├── src/
│   ├── fun/                 # Mini-game commands
│   ├── moderation/          # Moderation & server config commands
│   ├── user/                # Utility & info commands
│   ├── slashCommands/       # Slash commands (/help, /prefix)
│   └── events/              # Discord event listeners
└── package.json
```

## Commands Overview

Prefix commands use the server-specific prefix (set via `/prefix` or `DEFAULT_PREFIX`). Slash commands are available globally after registration.

Use `/help` with a category option (`moderation`, `fun`, `user`) to see the full command list in Discord.

## Developer

**Mehmet Emir Usta**

- GitHub: [@memirusta](https://github.com/memirusta)
- LinkedIn: [Mehmet Emir Usta](https://www.linkedin.com/in/mehmet-emir-usta-560831256/)

## License

ISC
