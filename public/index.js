require('dotenv').config()

const http = require("http")
const exportsFromAnother = require("./another")

console.log({exportsFromAnother});

function requestController() {
    console.log("hola mundo!!!");
}

const PORT = process.env.PORT;

const server = http.createServer(requestController)

server.listen(PORT , function () {
    console.log("Aplicacion corriendo en el puerto " + PORT);
})