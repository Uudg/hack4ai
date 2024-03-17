const Anthropic = require('@anthropic-ai/sdk');
const fp = require('fastify-plugin')
require('dotenv').config();

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_KEY, // defaults to process.env["ANTHROPIC_API_KEY"]
});

const claude = async (propmt, model) => {
    let m = ''
    let system = ''
    let max_tokens = 0
    if (model === 'haiku'){
        m = 'claude-3-haiku-20240307'
        system = 'Your task is to create simple and at the same moment eloquent title for provided to you story (up to 5 words). And also define mood of the story. Reponse must be like this: {"Title": "string", "Mood": []}'
        max_tokens = 1024
    }
    if (model === 'opus') {
        propmt = JSON.stringify(propmt)
        m = 'claude-3-opus-20240229'
        system = 'You are given amount of each mood tracked during one month. Your task is to analyze users mood and mental condition based on provided data. Response like a friend not like a doctor, give tips ideas, jokes. Use emojies if appliable. Keep it short but effective'
        max_tokens = 3000
    }

    const response = await anthropic.messages.create({
        model: m,
        max_tokens: max_tokens,
        system: system,
        messages: [
            {
                role: "user",
                content: propmt
            }
        ]
    })

    return response;
}

const claudePlugin = (fastify, options, next) => {
    fastify.decorate('claude', {
        ai: claude
    });

    next();
}

module.exports = fp(claudePlugin);