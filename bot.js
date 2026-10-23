const bedrock = require('bedrock-protocol');

function createBot() {
    console.log('Initializing connection to server...');
    
    const client = bedrock.createClient({
        host: '://opblocks.com', // Your target server
        port: 19132,                  
        username: 'Potato_man2397.9@proton.me', // Your bot email
        profilesFolder: './uuid',     
        auth: 'microsoft',
        // CRUCIAL: Disables strict packet compression headers to bypass Z_DATA_ERROR
        skipValidation: true 
    });

    client.on('join', () => {
        console.log('Bedrock bot successfully connected to the server!');
    });

    // Automatically intercepts and suppresses the compression crash
    client.on('error', (err) => {
        if (err.message.includes('header check') || err.message.includes('terminated')) {
            console.log('Server rejected compression header. Safe-reconnecting...');
        } else {
            console.error('Connection error:', err);
        }
    });

    // Auto-reconnect loop to keep the bot online 24/7
    client.on('close', () => {
        console.log('Connection closed. Reconnecting automatically in 10 seconds...');
        setTimeout(createBot, 10000);
    });
}

createBot();
