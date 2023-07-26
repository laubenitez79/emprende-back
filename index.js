require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT

app.use(express.static('public'))

app.get('/' , (req, res)=>{
    res.send('Hello world')
})
app.get('/users' , (req, res)=>{
    res.send([{name: "Lautaro"}, {name: "Pedro"}])
})

app.listen(port ,() => {
    console.log("App escuchando en el puerto " + port)
})