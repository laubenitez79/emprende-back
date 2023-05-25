const http = require("http")
const exportsFromAnother = require("./another")

console.log({exportsFromAnother});

function requestController() {
    console.log("hola mundo");
}

const server = http.createServer(requestController)

server.listen(4000)