const openai = require('openai')
const fp = require('fastify-plugin')
require('dotenv').config();

const ai = new openai({
    apiKey: process.env.OPENAI_KEY,
})

const create_img = async (prompt) => {
        const response = await ai.images.generate({
                model: "dall-e-3",
                prompt: prompt,
                n: 1,
                size: "1024x1024",
        });
        return response;
}

// Create a Fastify plugin
function openaiPlugin(fastify, options, next) {
    // Decorate the Fastify instance with an `openai` object
    fastify.decorate('openai', {
        image: create_img
    });

    next();
}

module.exports = fp(openaiPlugin);