import fs from 'fs';
import https from 'https';
import path from 'path';

// Get the version, operating system, and preview option from command-line arguments
const [,, version, os, preview] = process.argv;

// Validate the input
if (!version) {
    console.error('Error: Missing version argument.');
    console.error('Usage: node getServerSoftware <version> <operating-system> [<preview>]');
    console.error('Operating System: "win" for Windows, "linux" for Linux.');
    console.error('Preview: Leave empty for normal download or type "preview" for preview version.');
    process.exit(1);
}

// Set the base URL based on the operating system and preview option
let baseUrl = '';
if (os === 'win') {
    baseUrl = preview === 'preview'
        ? `https://www.minecraft.net/bedrockdedicatedserver/bin-win-preview/bedrock-server-${version}.zip`
        : `https://www.minecraft.net/bedrockdedicatedserver/bin-win/bedrock-server-${version}.zip`;
} else if (os === 'linux') {
    baseUrl = preview === 'preview'
        ? `https://www.minecraft.net/bedrockdedicatedserver/bin-linux-preview/bedrock-server-${version}.zip`
        : `https://www.minecraft.net/bedrockdedicatedserver/bin-linux/bedrock-server-${version}.zip`;
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
