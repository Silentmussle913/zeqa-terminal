const axios = require('axios');

// Get IP and port from command-line arguments, with port defaulting to 19132
const [,, serverIp, serverPort = 19132] = process.argv;

if (!serverIp) {
    console.error('Error: Missing server IP address.');
    console.error('Usage: node serverdetails <server.ip> <port (optional, default: 19132)>');
    process.exit(1);
}

/**
 * Fetch and display server details including online players, server version, MOTD, and plugins.
 * @param {string} ip - The IP address of the Minecraft server.
 * @param {number} port - The port number of the Minecraft server.
 */
async function getServerDetails(ip, port) {
    try {
        console.log(`Fetching details for server: ${ip}:${port}...`);
        const response = await axios.get(`https://api.mcsrvstat.us/2/${ip}:${port}`);
        const data = response.data;

        if (data.online) {
            console.log(`\nServer is online! Details for ${ip}:${port}:\n`);

            // Display server MOTD
            console.log(`MOTD: ${data.motd.clean.join(' ')}\n`);

            // Display server version
            console.log(`Server Version: ${data.version}\n`);

            // Display online players
            const onlinePlayers = data.players ? data.players.list : [];
            console.log(`Online Players (${onlinePlayers.length}):`);
            if (onlinePlayers.length > 0) {
                onlinePlayers.forEach((player, index) => {
                    console.log(`  ${index + 1}. ${player}`);
                });
            } else {
                console.log('  No players are currently online.');
            }
            console.log();

            // Display plugins
            const plugins = data.plugins ? data.plugins.raw : [];
            console.log(`Server Plugins (${plugins.length}):`);
            if (plugins.length > 0) {
                plugins.forEach((plugin, index) => {
                    console.log(`  ${index + 1}. ${plugin}`);
                });
            } else {
                console.log('  No plugins are currently installed or visible.');
            }
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
console.log(`Starting Minecraft server details check...`);
getServerDetails(serverIp, serverPort);
