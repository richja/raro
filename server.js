const fastify = require('fastify')()
const fs = require('fs')
const random = require('random')

const pathToLists = './lists/'

// Declare a route
fastify.get('/', async (request, reply) => {
    return 'hello world'
    // TODO display here available list and simple example how to use it including slack
})

fastify.get('/random/:listName', (request, reply) => {
    // TODO sanitize the input and do whitelisting based on available lists
    let list = getList(request.params.listName, reply)
})

// Run the server!
const start = async () => {
    try {
        await fastify.listen(3000, '0.0.0.0')
        // fastify.log.info(`server listening on ${fastify.server.address().port}`)
        console.log(`server listening on ${fastify.server.address().address + ':' + fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()

function getList(fileName, reply) {
    let foldedFileName = pathToLists + fileName + '.txt'

    fs.readFile(foldedFileName, 'utf8', function(err, contents) {
        if (err) throw err

        parseListToArray(contents, reply)
    })
}

function parseListToArray(list, reply) {
    listAsArray = list.split('\r\n')
    selectRandomAndSend(listAsArray, reply)
}

function selectRandomAndSend(arrayList, reply) {
    randomInt = random.int(min = 0, max = --arrayList.length)
    reply.send(arrayList[randomInt])
}