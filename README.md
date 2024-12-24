```Steps To Install are Just Clone The Repo Using "git clone https://github.com/Silentmussle913/zeqa-terminal" you have to have git installed or just download the repo from here```
``u just have to follow the instructions from the Clickme.txt which is located inside the cloned repo``









1. Get Online Players from a Minecraft Server:
   Command: node mcStatusPlayers <serverIp> <serverPort>
   Description: Fetches the list of online players from the specified Minecraft server IP and port.
   Example: node mcStatusPlayers as.zeqa.net 10001

2. Get Server Details:
   Command: node serverdetails <server.ip> [<port>]
   Description: Fetches and displays online players, server version, MOTD, and plugins.
   Example: node serverdetails play.example.com 19132

3. Get Bedrock Server Download Link:
   Command: node getServerSoftware.mjs <version> <operating-system> [<preview>]
   Description: Opens a new tab with the download link for the specified Bedrock server version.
   Operating System: "win" for Windows, "linux" for Linux.
   Preview: Leave empty for normal download or type "preview" for preview version.
   Example: node getServerSoftware.mjs 1.18.12.01 win preview

4. Check Player Status from Zeqa Network:
   Command: node players <region><lobby>
   Description: Fetches the list of online players from the specified Zeqa lobby.
   Example: node players as1  // for Asia Lobby 1

5. Find Player on Zeqa Network:
   Command: node find <PlayerName>
   Description: Searches across all Zeqa regions and lobbies to check if the specified player is online.
   Example: node find Silentmussle913

6. Search DuckDuckGo:
   Command: node google.js <search query>
   Description: Performs a search on DuckDuckGo and returns the abstract or related topics.
   Example: node google.js "What is Node.js?"

7. Get AI Response:
   Command: node ai <query>
   Description: Sends a query to the AI model and retrieves the response.
   Example: node ai "Tell me a joke."
