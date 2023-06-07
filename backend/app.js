require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const app = express()

const Mail = require('./models/Mail')
const User = require('./models/User')

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).json({msg: "Bem vindo a nossa API!"})
})

app.post('/insert', async (req, res) => {
    const {email} = req.body
    if(!email) {
        return res.status(422).json({msg: 'O e-mail é obrigatório'})
    }
    const emailExists = await Mail.findOne({email})
    if(emailExists) {
        return res.status(422).json({msg: 'Este e-mail já está cadastrado!'})
    }
    const mail = new Mail({email: email})
    try {
        await mail.save()
        res.status(201).json({msg: 'E-mail cadastrado com sucesso!'})
    } catch(error) {
        res.status(500).json({msg: 'Aconteceu um erro no servidor, tente novamente mais tarde'})
    }
})

app.post('/auth/register', async (req, res) => {
    const {username, email, password, confirmpassword} = req.body
    if(!username) {
        return res.status(422).json({msg: 'O nome de usuário é obrigatório!'})
    }
    if(!email) {
        return res.status(422).json({msg: 'O e-mail é obrigatório!'})
    }
    if(!password) {
        return res.status(422).json({msg: 'A senha é obrigatória!'})
    }
    if(password !== confirmpassword) {
        return res.status(422).json({msg: 'As senhas não conferem!'})
    }
    const emailExists = await User.findOne({email})
    if(emailExists) {
        return res.status(422).json({msg: 'Este e-mail já está sendo utilizado!'})
    }
    const userExists = await User.findOne({username})
    if(userExists) {
        return res.status(422).json({msg: 'Este nome de usuário já está sendo utilizado!'})
    }
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)
    const user = new User({
        username,
        email,
        password: passwordHash
    })
    try {
        await user.save()
        res.status(201).json({msg: 'Usuário cadastrado com sucesso!'})
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
