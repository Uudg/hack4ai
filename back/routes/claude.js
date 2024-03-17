const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

module.exports = async(fastify, opts) => {
    fastify.post("/ai", async(request, reply) => {
        const {prompt, style, person} = request.body;
        const model = 'haiku';
        const claude_response = await fastify.claude.ai(prompt, model)
        const to_parse = claude_response.content[0].text;
        const parsed = JSON.parse(to_parse);
        const image_prompt = `Create an image of this story ${parsed.Title} in this mood - ${parsed.Mood.join(', ')} and in this style - ${style}, if it required information the story author is a ${person.gender} ${person.age} years old, 4k`;

        const img = await fastify.openai.image(image_prompt);
        const imageUrl = img.data[0].url;

        // Download the image
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'binary');

        // Ensure the 'images' directory exists
        const dirPath = path.join(__dirname, '../images');
        await fs.mkdir(dirPath, { recursive: true });

        // Generate a unique ID for the image
        const imageId = uuidv4();

        // Save the image to a file
        const imagePath = path.join(dirPath, `${imageId}.jpg`);

        const resimage = `${imageId}.jpg`;
        await fs.writeFile(imagePath, buffer);

        // Send the path to the image file in the response
        reply.send({
            image: resimage,
            title: parsed.Title
        })
    });
}