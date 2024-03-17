const AutoLoad = require('@fastify/autoload')
const path = require('path')
const fastify = require('fastify')(
    {logger: true}
)
require('dotenv').config()

fastify
    .register(require('@fastify/cors'), {
        origin: '*',
        methods: ['GET', 'POST']
    })
    .register(require('@fastify/static'), {
        root: path.join(__dirname, 'images'),
        prefix: '/images'
    })
    .register(AutoLoad, {
        dir: path.join(__dirname, 'plugins'),
        options: Object.assign({})
    })
    .register(AutoLoad, {
        dir: path.join(__dirname, 'routes'),
        options: Object.assign({})
    })
    .ready(() => start())


const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3000})
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}