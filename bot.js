const bedrock = require('bedrock-protocol');

function createBot() {
    console.log('Initializing connection to server...');
    
    const client = bedrock.createClient({
        // CRUCIAL: Must be a pure domain string with no trailing slashes or colons
        host: 'bedrock.skyblock.net', 
        port: 19132,                  
        username: 'Potato_man2397.9@proton.me', // Your bot email
        profilesFolder: './uuid',     
        auth: 'microsoft',
        skipValidation: true 
    });

    client.on('join', () => {
        console.log('Bedrock bot successfully connected to the server!');
    });

    client.on('error', (err) => {
        if (err.message.includes('header check') || err.message.includes('terminated')) {
            console.log('Server rejected compression header. Safe-reconnecting...');
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
