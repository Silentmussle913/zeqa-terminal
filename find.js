const axios = require('axios');

// Region and lobby configuration
const servers = {
    as: {
        name: 'Asia',
        ip: 'as.zeqa.net',
        lobbies: {
            1: 10001,
            2: 10002,
            3: 10003,
            4: 10004,
            5: 10005
        }
    },
    eu: {
        name: 'Europe',
        ip: 'eu.zeqa.net',
        lobbies: {
            1: 10001,
            2: 10002,
            3: 10003,
            4: 10004,
            5: 10005
        }
    },
    na: {
        name: 'North America',
        ip: 'na.zeqa.net',
        lobbies: {
            1: 10001,
            2: 10002,
            3: 10003,
            4: 10004,
            5: 10005
        }
    }
};

// Get the player name from command-line arguments
const [,, playerName] = process.argv;

if (!playerName) {
    console.error('Error: Missing player name.');
    console.error('Usage: node find <PlayerName>, e.g. "node find Silentmussle913"');
    process.exit(1);
}

/**
 * Check if the player is online across all servers
 * @param {string} playerName - The player name to search for
 */
async function findPlayer(playerName) {
    console.log(`Searching for player "${playerName}" across all Zeqa servers...`);

    for (const regionKey in servers) {
        const region = servers[regionKey];
        for (const lobby in region.lobbies) {
            const serverIp = region.ip;
            const serverPort = region.lobbies[lobby];

            try {
                const response = await axios.get(`https://api.mcsrvstat.us/2/${serverIp}:${serverPort}`);
                const data = response.data;

                if (data.online) {
                    const onlinePlayers = data.players ? data.players.list : [];
                    if (onlinePlayers.includes(playerName)) {
                        console.log(`Player "${playerName}" is online in ${region.name} Lobby ${lobby}.`);
                        return; // Exit once the player is found
                    }
                }
            } catch (error) {
                console.error(`Error checking ${region.name} Lobby ${lobby}: ${error.message}`);
            }
        }
    }

    console.log(`Player "${playerName}" is not online on any Zeqa server.`);
}

// Call the function with the provided player name
findPlayer(playerName);
