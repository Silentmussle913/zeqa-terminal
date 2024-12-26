#!/usr/bin/env node

function displayHelpMenu() {
    console.log('=== Advanced Help Menu ===\n');

    console.log('1. Get Online Players from a Minecraft Server:');
    console.log('   Command: node mcStatusPlayers <serverIp> <serverPort>');
    console.log('   Description: Fetches the list of online players from the specified Minecraft server IP and port.');
    console.log('   Example: node mcStatusPlayers as.zeqa.net 10001\n');

    console.log('2. Get Server Details:');
    console.log('   Command: node serverdetails <server.ip> [<port>]');
    console.log('   Description: Fetches and displays online players, server version, MOTD, and plugins.');
    console.log('   Example: node serverdetails play.example.com 19132\n');

    console.log('3. Get Bedrock Server Download Link:');
    console.log('   Command: node getServerSoftware.mjs <version> <operating-system> [<preview>]');
    console.log('   Description: Opens a new tab with the download link for the specified Bedrock server version.');
    console.log('   Operating System: "win" for Windows, "linux" for Linux.');
    console.log('   Preview: Leave empty for normal download or type "preview" for preview version.');
    console.log('   Example: node getServerSoftware.mjs 1.18.12.01 win \n');

    console.log('4. Check Player Status from Zeqa Network:');
    console.log('   Command: node players <region><lobby>');
    console.log('   Description: Fetches the list of online players from the specified Zeqa lobby.');
    console.log('   Example: node players as1  // for Asia Lobby 1\n');

    console.log('5. Find Player on Zeqa Network:');
    console.log('   Command: node find <PlayerName>');
    console.log('   Description: Searches across all Zeqa regions and lobbies to check if the specified player is online.');
    console.log('   Example: node find Silentmussle913\n');

    console.log('6. Connects you to OrangeCheats Server:');
    console.log('   Command: node orangesweat.mjs ');
    console.log('   Description: Connects you to GameParrots OrangeCheats Server.');
    console.log('   Example: node orangesweat.mjs\n');

 

    console.log('=== End of Help Menu ===');
}

// Display the help menu
displayHelpMenu();
