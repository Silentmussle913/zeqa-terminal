const axios = require('axios');

// Get IP and port from command-line arguments
const [,, serverIp, serverPort] = process.argv;

// Validate inputs
if (!serverIp || !serverPort) {
    console.error('Error: Missing server IP or port.');
    console.error('Usage: node mcStatusPlayers <serverIp> <port>');
    process.exit(1);
}

// Function to fetch and display online players
async function getOnlinePlayers(ip, port) {
    try {
        console.log(`Fetching player data for ${ip}:${port}...\n`);
        
        // Fetch data from the server status API
        const response = await axios.get(`https://api.mcsrvstat.us/2/${ip}:${port}`);
        const data = response.data;

        if (data.online) {
            console.log(`Server is online!\n`);

            // Get the list of players
            const players = data.players ? data.players.list : [];

            // Display players or indicate no players are online
            if (players.length > 0) {
                console.log(`Online Players (${players.length}):`);
                players.forEach((player, index) => {
                    console.log(`${index + 1}. ${player}`);
                });
            } else {
                console.log('No players online.');
            }
        } else {
            console.log('Server is offline.');
        }
    } catch (error) {
        console.error('Error fetching player data:', error.message);
    }
}

// Call the function with the provided IP and port
getOnlinePlayers(serverIp, serverPort);
