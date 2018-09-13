const fastify = require('fastify')()
const raro = require('./raro.js')

const PORT = process.env.PORT || 3000;

fastify.get('/', async (request, reply) => {
    return 'hello world'
    // TODO display here available list and simple example how to use it including slack
})

fastify.get('/random/:listName', (request, reply) => {
    // TODO sanitize the input and do whitelisting based on available lists
    raro.getRandomItem(request.params.listName, (data) => {
        const listArray = raro.parseListToArray(data)
        const pickedItem = raro.selectRandomItem(listArray)
        reply.send(pickedItem)
    })
})

// Run the server!
const start = async () => {
    try {
        await fastify.listen(PORT, '0.0.0.0')
        // fastify.log.info(`server listening on ${fastify.server.address().port}`)
        console.log(`server listening on ${fastify.server.address().address + ':' + fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()