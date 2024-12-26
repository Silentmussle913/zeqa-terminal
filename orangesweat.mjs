// Import the child_process module
import { exec } from 'child_process';

// Minecraft URI
const minecraftUri = 'minecraft://connect?serverUrl=150.136.220.216&serverPort=19132';

// Function to open the Minecraft URI on Windows
function openMinecraftUriWindows() {
  console.log(`Attempting to connect using: ${minecraftUri}`);

  // Use "start" command to open the URI
  exec(`start "" "${minecraftUri}"`, (error) => {
    if (error) {
      console.error('Failed to open Minecraft URI on Windows:', error.message);
    } else {
      console.log('Minecraft URI opened successfully! Minecraft should now launch.');
    }
  });
}

// Call the function
openMinecraftUriWindows();
