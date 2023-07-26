const http = require("http");
const fs = require("fs");

function requestController(req, res) {
    const url = req.url;
    const method = req.method;
    console.log({ url, method });

    if (method === "GET" && url === "/") {
        res.setHeader("Content-type", "text/html; charset=utf-8");
        fs.readFile("./public/index.html", function (err, file) {
        if (err) {
            console.log("Hubo un error al leer el archivo:", err);
            res.statusCode = 500;
            res.write("<h1>Error interno del servidor</h1>");
            res.end();
            return;
        }
        res.write(file);
        res.end();
        });
        return;
    }

    if (method === "GET" && url === "/about") {
        res.setHeader("Content-type", "text/html; charset=utf-8");
        fs.readFile("./public/about.html", function (err, file) {
        if (err) {
            console.log("Hubo un error al leer el archivo:", err);
            res.statusCode = 500;
            res.write("<h1>Error interno del servidor</h1>");
            res.end();
            return;
        }
        res.write(file);
        res.end();
        });
        return;
    }

    res.setHeader("Content-type", "text/html; charset=utf-8");
    res.write("<h1>Pagina no encontrada</h1>");
    res.end();
}

const PORT = process.env.PORT 

const server = http.createServer(requestController);

server.listen(PORT, function () {
    console.log("Aplicacion corriendo en el puerto " + PORT);
});
