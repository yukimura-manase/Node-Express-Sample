const http = require('http')
const fs = require('fs')

const getHtmlClient = (req ,res) => {
    request = req
    response = res
    fs.readFile('./index.html','UTF-8',
        (error, data) => {
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.write(data)
            response.end()
        }
    )
}

let server = http.createServer(getHtmlClient)

server.listen(3001)
console.log('Serve Start2')

