# Steps To Install the Program
*just Clone the repository by Running `git clone https://github.com/Silentmussle913/zeqa-terminal` in your terminal*
now after finishing the cloning process just go inside the **zeqa-terminal** Folder and click the `Start Program.bat` file it will have a built in help menu which u can run and get again by doing `node adv-help`

***How to use the program:***

***1. Get Online Players from a Minecraft Server:***
   *Command: node mcStatusPlayers <serverIp> <serverPort>*
   Description: Fetches the list of online players from the specified Minecraft server IP and port.
   **Example: node mcStatusPlayers as.zeqa.net 10001**

***2. Get Server Details:***
   *Command: node serverdetails <server.ip> [<port>]*
   Description: Fetches and displays online players, server version, MOTD, and plugins.
   **Example: node serverdetails play.example.com 19132**

***3. Get Bedrock Server Download Link:***
   *Command: node getServerSoftware.mjs <version> <operating-system> [<preview>]*
   Description: Opens a new tab with the download link for the specified Bedrock server version.
   Operating System: "win" for Windows, "linux" for Linux.
   Preview: Leave empty for normal download or type "preview" for preview version.
   **Example: node getServerSoftware.mjs 1.18.12.01 win**

***4. Check Player Status from Zeqa Network:***
   *Command: node players <region><lobby>*
   Description: Fetches the list of online players from the specified Zeqa lobby.
   **Example: node players as1  // for Asia Lobby 1**

***5. Find Player on Zeqa Network:***
   *Command: node find <PlayerName>*
   Description: Searches across all Zeqa regions and lobbies to check if the specified player is online.
   **Example: node find Silentmussle913**
