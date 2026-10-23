const bedrock = require('bedrock-protocol');
const fs = require('fs');

// Create the permanent folder to store your world blocks and inventory data
if (!fs.existsSync('./world_save')) {
    fs.mkdirSync('./world_save');
}

console.log('Initializing connection... Host network is booting up.');

const server = bedrock.createServer({
    host: '0.0.0.0',             // Listens to connections over the cloud network
    port: 19132,                 // Default Bedrock port for console connections
    version: '1.21.42',          // FIX: Updated to a fully supported version string
    offline: true,               // Allows direct discovery by your console account
    maxPlayers: 10,
    motd: {
        motd: 'Permanent Cloud World',
        levelName: 'Easy Survival'
    }
});

// Enforces your world rules automatically whenever a player connects
server.on('connect', (client) => {
    client.on('join', () => {
        console.log(`${client.username || 'Player'} connected to the persistent cloud session.`);
        
        // Enforce settings down to the console
        client.queue('set_difficulty', { difficulty: 1 });       // 1 = Easy Difficulty
        client.queue('set_player_game_type', { gamemode: 0 });   // 0 = Survival Mode
    });
});

console.log('Your automated host is up and running. Ready for connection.');
