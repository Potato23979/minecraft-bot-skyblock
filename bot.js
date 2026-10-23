const bedrock = require('bedrock-protocol');

function createBot() {
    const client = bedrock.createClient({
        host: 'play.cosmosmc.org',   // Your OneBlock server IP
        port: 19132,                 // Bedrock port
        username: 'Potato_man2397.9@proton.me', // Your free Family Share email
        profilesFolder: './uuid',    // Saves authentication tokens locally
        auth: 'microsoft'            // Authenticates securely with Microsoft Live
    });

    client.on('join', () => {
        console.log('Bedrock bot successfully connected to the server!');
    });

    client.on('error', (err) => {
        console.error('Connection error:', err);
    });

    client.on('close', () => {
        console.log('Disconnected. Reconnecting in 10 seconds...');
        setTimeout(createBot, 10000);
    });
}

createBot();

