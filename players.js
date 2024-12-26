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

// Get region and lobby from command-line arguments
const [,, regionLobby] = process.argv;

if (!regionLobby || !/^(as|eu|na)[1-5]$/.test(regionLobby)) {
    console.error('Error: Invalid or missing region/lobby information.');
    console.error('Usage: node players <region><lobby>, e.g. "node players as1"');
    process.exit(1);
}

// Extract region and lobby number from the input
const region = regionLobby.substring(0, 2);
const lobby = parseInt(regionLobby.charAt(2), 10);

if (!servers[region] || !servers[region].lobbies[lobby]) {
    console.error('Error: Invalid region or lobby number.');
    process.exit(1);
}

// Get the corresponding IP and port
const serverIp = servers[region].ip;
const serverPort = servers[region].lobbies[lobby];

/**
 * Fetch and display the online players for the specified region and lobby
 * @param {string} ip - The IP address of the Minecraft server
 * @param {number} port - The port number of the Minecraft server
 */
async function getOnlinePlayers(ip, port) {
    try {
        console.log(`Fetching data for server ${ip}:${port} (Region: ${servers[region].name}, Lobby: ${lobby})...`);
        const response = await axios.get(`https://api.mcsrvstat.us/2/${ip}:${port}`);
        const data = response.data;

        if (data.online) {
            console.log(`Server is online!`);
            const onlinePlayers = data.players ? data.players.list : [];

            const playerEntryWidth = 30; // Width for each player entry
            const maxColumnsPerRow = 4; // Max columns per row
            const totalWidth = 65; // Total width of the table including margins

            let playerList = '+-----------------------------------------------------------------------------------------------------------------------------------------------------+\n';
            playerList += `|                                                                  Player List                                                                       |\n`;
            playerList += '+-----------------------------------------------------------------------------------------------------------------------------------------------------+\n';

            for (let i = 0; i < onlinePlayers.length; i++) {
                if (i % (maxColumnsPerRow * 4) === 0 && i > 0) {
                    playerList += '+-----------------------------------------------------------------------------------------------------------------------------------------------------+\n'; // 3-pixel line separator stretching the full width
                }

                playerList += `| ${String(i + 1).padEnd(3)}. ${onlinePlayers[i].padEnd(playerEntryWidth)} `;

                if ((i + 1) % maxColumnsPerRow === 0 || i === onlinePlayers.length - 1) {
                    playerList += '|\n';
                }
            }

            playerList += '+-----------------------------------------------------------------------------------------------------------------------------------------------------+\n';
            playerList += `|                                                                     Total Players: ${onlinePlayers.length.toString().padEnd(21)}                                            |\n`;
            playerList += `|                                                                     Server: ${servers[region].name}-${lobby}                                                                  |\n`;
            playerList += '+-----------------------------------------------------------------------------------------------------------------------------------------------------+\n';

            console.log(playerList);
        } else {
            console.log(`Server is offline. Please verify the server IP and port.`);
        }
    } catch (error) {
        if (error.response) {
            console.error(`Server responded with a status code ${error.response.status}: ${error.response.statusText}`);
        } else if (error.request) {
            console.error('No response received from the server. Please check the server address or network connection.');
        } else {
            console.error('Error in request setup:', error.message);
        }
    }
}

// Call the function with the provided IP and port
console.log(`Starting Minecraft server status check...`);
getOnlinePlayers(serverIp, serverPort);
