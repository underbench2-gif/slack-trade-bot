# Slack Trade Bot

A lightweight Node.js bot that monitors market prices and sends real-time alerts to a Slack channel.

## Features

- **Real-time Monitoring**: Fetches the latest price data from public APIs (defaulting to CoinGecko).
- **Slack Integration**: Automatically posts updates and alerts to your designated Slack channel.
- **Configurable**: Easily change the monitored symbols, alert intervals, and more via environment variables.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- A Slack Bot Token with `chat:write` permissions.
- A Slack Channel ID where the bot will post alerts.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/underbench2-gif/slack-trade-bot.git
   cd slack-trade-bot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your configuration:
   ```env
   SLACK_BOT_TOKEN=xoxb-your-bot-token
   SLACK_CHANNEL_ID=C0123456789
   MONITOR_SYMBOL=bitcoin
   MONITOR_INTERVAL_MINUTES=5
   ```

## Usage

Start the bot:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## License

MIT
