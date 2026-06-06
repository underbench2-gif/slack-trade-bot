const { WebClient } = require('@slack/web-api');
const axios = require('axios');
require('dotenv').config();

// Initialize Slack WebClient
const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);
const channelId = process.env.SLACK_CHANNEL_ID;

/**
 * Fetch market data for a given symbol
 * Using a public API like CoinGecko for crypto or Alpha Vantage for stocks
 */
async function getMarketData(symbol = 'bitcoin') {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd&include_24hr_change=true`);
    return response.data[symbol];
  } catch (error) {
    console.error('Error fetching market data:', error.message);
    return null;
  }
}

/**
 * Post an alert to Slack
 */
async function postAlert(message) {
  try {
    await slackClient.chat.postMessage({
      channel: channelId,
      text: message,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Market Alert:* \n${message}`
          }
        }
      ]
    });
  } catch (error) {
    console.error('Error posting to Slack:', error.message);
  }
}

/**
 * Main function to monitor prices
 */
async function monitorMarket() {
  console.log('Starting market monitor...');
  
  const symbol = process.env.MONITOR_SYMBOL || 'bitcoin';
  const data = await getMarketData(symbol);
  
  if (data) {
    const price = data.usd;
    const change = data.usd_24h_change.toFixed(2);
    const message = `The current price of *${symbol.toUpperCase()}* is *$${price}* (${change}% in last 24h).`;
    
    console.log(message);
    if (process.env.SLACK_BOT_TOKEN && process.env.SLACK_CHANNEL_ID) {
      await postAlert(message);
    } else {
      console.log('Slack credentials not configured, skipping post.');
    }
  }
}

// Run every 5 minutes (or as configured)
const interval = (process.env.MONITOR_INTERVAL_MINUTES || 5) * 60 * 1000;
setInterval(monitorMarket, interval);

// Initial run
monitorMarket();

console.log('Slack Trade Bot is running...');
