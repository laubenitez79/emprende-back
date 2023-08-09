require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const mongoose = require("mongoose")
const Schema = mongoose.Schema

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Conexion exitosa a la BBDD")
}).catch((err) => {
    console.log("Hubo un error al conectarnos a la BBDD" , {err})
})

const taskSchema = new Schema({
    name : String,
    done : Boolean,
    // createdBy 
})

const Task = mongoose.model("Task" , taskSchema, "Tasks")

app.use(express.static('public'))

app.use(express.json())

app.use((req, res , next) => {
    next()
})

app.get('/' , (req, res)=>{
    res.send('Hello world')
})

app.get('/users' , (req, res)=>{
    res.send([{name: "Lautaro"}, {name: "Pedro"}])
})

app.get('/api/tasks' , (req, res)=>{
    Task.find().then((tasks) => {
        res.status(200).json({ok : true, data : tasks})
    }).catch((err) => {
        res.status(400).json({ok: false , message : "Hubo un problema al encontrar una tarea"})
    })
    
})

app.post('/api/tasks' , (req, res)=>{
    const body = req.body
    Task.create({
        name : body.text,
        done : false,
        hello: "HOLA",
    }).then((createdTask) => {
        res.status(201)
        .json({
            ok: true,
            message: "Tarea creada con exito",
            data: createdTask
        })
    }).catch((err) => {
        res.status(400).json({ok : false, message : "Error al crear la tarea"})
    })
    
})

app.delete('/api/tasks/:id' , (req, res)=>{
    const id = req.params.id
    Task.findByIdAndRemove(id).then((deleteTask) => {
        res.status(201).json({ ok: true, message: "Tarea borrada con exito", data: deleteTask})
    }).catch((err) => {
        res.status(400).json({ok : false, message : "Error al borrar la tarea"})
    })
    
})

app.put('/api/tasks/:id' , (req, res)=>{
    const body = req.body
    const id = req.params.id
    Task.findByIdAndUpdate(id, {
        name : body.text,
    }).then((updatedTask) => {
        res.status(200).json({ ok: true, message: "Tarea editada con exito", data: updatedTask})
    }).catch((err) => {
        res.status(400).json({ok : false, message : "Error al editar la tarea"})
    })
    
})

app.listen(port ,() => {
    console.log("App escuchando en el puerto " + port)
})