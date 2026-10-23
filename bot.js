const bedrock = require('bedrock-protocol');

const bot = bedrock.createClient({
  // YOUR TARGET SERVER INFO
  host: 'OPBLOCKS_OR_YOUR_TARGET_IP', // Put the server IP you want to join here
  port: 19132,                        // The port of the remote server, not your local machine
  
  // BOT ACCOUNT INFO
  username: 'your_bot_email@outlook.com', 
  offline: false,                     // Must be false to use Microsoft Auth for the Friends feature
  
  // NETWORK ADJUSTMENTS FOR GITHUB
  concurrency: 1,
  connectTimeout: 30000
});

bot.on('join', () => {
  console.log("The bot has successfully joined the network and is ONLINE!");
});

bot.on('error', (err) => {
  console.log("Connection issue: ", err);
});
