require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const app = express()

const Mail = require('./models/Mail')

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).json({msg: "Bem vindo a nossa API!"})
})

app.post('/register', async (req, res) => {
    const {email} = req.body
    const mail = new Mail({email})
    try {
        await mail.save()
        res.status(201).json({msg: 'E-mail cadastrado com sucesso!'})
    } catch(error) {
        res.status(500).json({msg: 'Aconteceu um erro no servidor, tente novamente mais tarde'})
    }
})

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS
const dbName = process.env.DB_NAME

mongoose
    .connect(
        `mongodb+srv://${dbUser}:${dbPassword}@cluster0.ovynpof.mongodb.net/${dbName}?retryWrites=true&w=majority`
    )
    .then(() => {
        app.listen(3000)
        console.log('Conectado ao banco!')
    })
    .catch((err) => console.log(err))
