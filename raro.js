const fs = require('fs')
const random = require('random')

const pathToLists = 'lists/'

module.exports = {

    getRandomItem: function (fileName, callback) {
        const foldedFileName = pathToLists + fileName + '.txt'
        fs.readFile(foldedFileName, 'utf8', (err, contents) => {
            if (err) {
                console.log(err)
                throw err
            }
            callback(contents)
        })
    },
    parseListToArray: function (list) {
        const listAsArray = list.split(/\r?\n/)
        // console.log(listAsArray)
        return listAsArray
    },
    selectRandomItem: function (arrayList) {
        let randomInt = random.int(min = 0, max = --arrayList.length)
        return arrayList[randomInt]
    }
}