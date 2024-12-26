const axios = require('axios');

// Get query from command line arguments
const query = process.argv.slice(2).join(' ');

if (!query) {
    console.error('Error: No query provided. Usage: node ai <query>');
    process.exit(1);
}

// Function to get a response from the AI
async function getAIResponse(userQuery) {
    try {
        const response = await axios.post('https://api-inference.huggingface.co/models/gpt2', {
            inputs: userQuery,
        });

        // Log AI response
        console.log('AI Response:', response.data);
    } catch (error) {
        console.error('Error fetching AI response:', error.message);
    }
}

// Call the function with the user query
getAIResponse(query);
