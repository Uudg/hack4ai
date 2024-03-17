module.exports = async(fastify, opts) => {
    fastify.post("/image", async(request, reply) => {
        const prompt = request.body.prompt;
        const img = await fastify.openai.create_img(prompt);
        reply.send(img.data[0].url);
    });
}