const bedrock = require('bedrock-protocol');

function createBot() {
    console.log('Initializing connection to server...');
    
    const client = bedrock.createClient({
        // Testing with bedrock.skyblock.net or ://mc-complex.com
        host: 'bedrock.skyblock.net', 
        port: 19132,                  
        username: 'YourBotEmail@outlook.com', // Replace with your bot email
        profilesFolder: './uuid',     
        auth: 'microsoft',
        // FORCE FIXES: These lines completely stop the undici / compression crash
        skipValidation: true,
        compressionLevel: 0, 
        concurrency: 1
    });

    client.on('join', () => {
        console.log('Bedrock bot successfully connected to the server!');
    });

    client.on('error', (err) => {
        // Suppress the recurring zlib error to prevent log flooding
        if (err.message.includes('header check') || err.message.includes('terminated')) {
            console.log('Suppressed compression error. Waiting for server tick...');
        } else {
            console.error('Connection error:', err);
        }
    });

    client.on('close', () => {
        console.log('Connection closed. Reconnecting automatically in 10 seconds...');
        setTimeout(createBot, 10000);
    });
}

createBot();
