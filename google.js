const axios = require('axios');

// Check if a search query is provided as a command-line argument
const [,, ...searchQuery] = process.argv;

if (searchQuery.length === 0) {
    console.error('Error: Missing search query.');
    console.error('Usage: node google.js <search query>');
    process.exit(1);
}

// Combine the search query into a single string
const query = searchQuery.join(' ');

/**
 * Function to perform a DuckDuckGo search using the Instant Answer API
 * @param {string} query - The search query
 */
async function searchDuckDuckGo(query) {
    try {
        // DuckDuckGo Instant Answer API endpoint
        const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1&no_html=1&skip_disambig=1`;

        console.log(`Searching DuckDuckGo for: "${query}"...`);

        // Send GET request to DuckDuckGo API
        const response = await axios.get(url);
        const data = response.data;

        // Display the search result (related topics or abstract)
        if (data.AbstractText) {
            console.log(`Result: ${data.AbstractText}`);
        } else if (data.RelatedTopics && data.RelatedTopics.length > 0) {
            console.log('Related Topics:');
            data.RelatedTopics.forEach((topic, index) => {
                if (topic.Text) {
                    console.log(`${index + 1}. ${topic.Text}`);
                }
            });
        } else {
            console.log('No results found for this query.');
        }
    } catch (error) {
        console.error('Error occurred while fetching search results:', error.message);
    }
}

// Call the function with the provided search query
searchDuckDuckGo(query);
