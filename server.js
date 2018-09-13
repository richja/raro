const fastify = require('fastify')()
const raro = require('./raro.js')
const imageSearch = require('first-image-search-load')

fastify.register(require('point-of-view'), {
    engine: {
        handlebars: require('handlebars'),
    },
    templates: 'templates'
})

const PORT = process.env.PORT || 3000
const availableViews = ['simple', 'plain', 'day']
const defaultView = availableViews[0]

fastify.get('/', async (request, reply) => {
    return 'hello world'
    // TODO display here available list and simple example how to use it including slack
})

fastify.get('/random/:listName/:format', getSimpleRandomRouteHandler)

fastify.get('/random/:listName', getSimpleRandomRouteHandler)

function getSimpleRandomRouteHandler(request, reply) {
    // TODO provide view based on param
    /*if (request.params.format) {
        switch (request.params.format) {
            case:

        }
        console.log(request.params.format)
    }
    else {

    }*/
    // TODO sanitize the input and do whitelisting based on available lists
    raro.getRandomItem(request.params.listName, (data) => {
        const listArray = raro.parseListToArray(data)
        const pickedItem = raro.selectRandomItem(listArray)
        let imageUrl = false

        switch (getTemplateType(request.params.format)) {
            case 'day':
            case 'plain':
                reply.send(pickedItem)
                break
            default:
                //try to get an image from google images search to the view
                imageSearch.getFirstImageURL(pickedItem).then((result) => {
                    imageUrl = result
                }).finally((result) => {
                    reply.view('simple.hbs', {
                        item: pickedItem,
                        listName: request.params.listName,
                        listSize: listArray.length,
                        image: imageUrl
                    })
                })
        }
    })
}

function getTemplateType(format) {
    console.log((!format || availableViews.indexOf(format) === -1) ? defaultView : format)
    return (!format || availableViews.indexOf(format) === -1) ? defaultView : format
}

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