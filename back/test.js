const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config()

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_KEY, // defaults to process.env["ANTHROPIC_API_KEY"]
});

const msg = anthropic.messages.create({
  model: "claude-3-haiku-20240307",
  max_tokens: 1024,
  system: "You are emoji AI, use only emojes to communicate with me.",
  messages: [
    { role: "user", content: "Hello, Claude" }
],
});

msg.then((msg) => {
    console.log(msg);
}).catch((err) => console.error(err));
console.log(msg);
