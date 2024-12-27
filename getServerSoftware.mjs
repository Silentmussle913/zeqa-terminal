import fs from 'fs';
import https from 'https';
import path from 'path';

// Get the version, operating system, and preview option from command-line arguments
const [,, version, os, preview] = process.argv;

// List of downloadable versions
const availableVersions = [
  "1.21.51.02", "1.21.51.01", "1.21.50.10", "1.21.44.01", "1.21.43.01", "1.21.42.01", "1.21.41.01", 
  "1.21.40.03", "1.21.31.04", "1.21.30.03", "1.21.23.01", "1.21.22.01", "1.21.20.03", "1.21.3.01", 
  "1.21.2.02", "1.21.1.03", "1.21.0.03", "1.20.81.01", "1.20.80.05", "1.20.73.01", "1.20.72.01", 
  "1.20.71.01", "1.20.70.05", "1.20.62.03", "1.20.62.02", "1.20.61.01", "1.20.51.01", "1.20.50.03", 
  "1.20.41.02", "1.20.40.01", "1.20.32.03", "1.20.31.01", "1.20.30.02", "1.20.15.01", "1.20.14.01", 
  "1.20.13.01", "1.20.12.01", "1.20.11.01", "1.20.10.01", "1.20.1.02", "1.20.0.01", "1.19.83.01", 
  "1.19.81.01", "1.19.80.02", "1.19.73.02", "1.19.72.01", "1.19.71.02", "1.19.70.02", "1.19.63.01", 
  "1.19.62.01", "1.19.61.01", "1.19.60.04", "1.19.52.01", "1.19.51.01", "1.19.50.02", "1.19.41.01", 
  "1.19.40.02", "1.19.31.01", "1.19.30.04", "1.19.22.01", "1.19.21.01", "1.19.20.02", "1.19.11.01", 
  "1.19.10.03", "1.19.2.02", "1.19.1.01", "1.18.33.02", "1.18.32.02", "1.18.31.04", "1.18.30.04", 
  "1.18.12.01", "1.18.11.01", "1.18.2.03", "1.18.1.02", "1.18.0.02", "1.17.41.01", "1.17.40.06", 
  "1.17.34.02", "1.17.33.01", "1.17.32.02", "1.17.31.01", "1.17.30.04", "1.17.11.01", "1.17.10.04", 
  "1.17.2.01", "1.17.1.01", "1.17.0.03", "1.16.221.01", "1.16.220.02", "1.16.210.06", "1.16.210.05", 
  "1.16.201.03", "1.16.201.02", "1.16.200.02", "1.16.101.01", "1.16.100.04", "1.16.40.02", "1.16.20.03", 
  "1.16.1.02", "1.16.0.2", "1.14.60.5", "1.14.32.1", "1.14.30.2", "1.14.21.0", "1.14.20.1", "1.14.1.4", 
  "1.14.0.9", "1.13.3.0", "1.13.2.0", "1.13.1.5", "1.13.0.34", "1.12.1.1", "1.12.0.28", "1.11.4.2", 
  "1.11.2.1", "1.11.1.2", "1.11.0.23", "1.10.0.7", "1.9.0.15", "1.8.1.2", "1.8.0.24", "1.7.0.13", 
  "1.6.1.0"
];

// Function to split the available versions into chunks of 6 versions each
function chunkVersions(versions, chunkSize) {
  const result = [];
  for (let i = 0; i < versions.length; i += chunkSize) {
    result.push(versions.slice(i, i + chunkSize).join(' '));
  }
  return result;
}

// Validate the input
if (!version || !os) {
  console.log(chunkVersions(availableVersions, 6).join('\n'));
  console.error('Usage: node getServerSoftware <version> <operating-system> [<preview>]');
  console.error('Operating System: "win" for Windows, "linux" for Linux.');
  console.error('Preview: Leave empty for normal download or type "preview" for preview version.');
  process.exit(1);
}

// Set the base URL based on the operating system and preview option
let baseUrl = '';
if (os === 'win') {
  baseUrl = preview === 'preview' ? `https://www.minecraft.net/bedrockdedicatedserver/bin-win-preview/bedrock-server-${version}.zip` : `https://www.minecraft.net/bedrockdedicatedserver/bin-win/bedrock-server-${version}.zip`;
} else if (os === 'linux') {
  baseUrl = preview === 'preview' ? `https://www.minecraft.net/bedrockdedicatedserver/bin-linux-preview/bedrock-server-${version}.zip` : `https://www.minecraft.net/bedrockdedicatedserver/bin-linux/bedrock-server-${version}.zip`;
} else {
  console.error('Error: Invalid operating system. Use "win" for Windows or "linux" for Linux.');
  process.exit(1);
}

/**
 * Function to download the file from the URL to the Downloads folder.
 * Shows progress percentage.
 * @param {string} url - The URL to download the file from.
 * @param {string} destination - The path to save the downloaded file.
 */
function downloadFile(url, destination) {
  console.log(`\nDownloading Bedrock Server Software of Version ${version} From Official Mojang DataBase`);
  const file = fs.createWriteStream(destination);
  https.get(url, (response) => {
    if (response.statusCode !== 200) {
      console.error(`Failed to download file. HTTP Status Code: ${response.statusCode}`);
      response.resume(); // Consume response data to free up memory
      process.exit(1);
    }
    const totalSize = parseInt(response.headers['content-length'], 10);
    let downloadedSize = 0;
    response.on('data', (chunk) => {
      downloadedSize += chunk.length;
      const percentage = ((downloadedSize / totalSize) * 100).toFixed(2);
      process.stdout.write(`\rProgress: ${percentage}%`);
    });
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`\nDownload complete. File saved to: ${destination}`);
    });
  }).on('error', (err) => {
    fs.unlink(destination, () => {}); // Delete the file if an error occurs
    console.error(`Failed to download file: ${err.message}`);
    process.exit(1);
  });
}

// Determine the Downloads folder and set the destination path
const downloadsFolder = path.join(process.env.HOME || process.env.USERPROFILE, 'Downloads');
const destinationPath = path.join(downloadsFolder, `bedrock-server-${version}.zip`);

// Call the function to download the file
downloadFile(baseUrl, destinationPath);
