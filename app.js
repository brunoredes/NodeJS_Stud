const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const config = require('./config/config')

const indexRoute = require('./Routes/index')
const usersRoute = require('./Routes/users')

const url = config.database_str
const options = { /*reconnectTries: Number.MAX_VALUE, reconnectInterval: 500,*/ poolSize: 5, useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }

mongoose.connect(url, options)
mongoose.set('useCreateIndex', true)
mongoose.connection.on('error', (err) => {
    console.error('Erro na conexão com o banco de dados! ' + err)
})
mongoose.connection.on('disconnected', () => {
    console.error('Aplicação desconectada do banco de dados')
})
mongoose.connection.on('connected', () => {
    console.log('Aplicação conectada ao banco de dados')
})

//body-parser: Padrão em envios de requisição (aquele jasao bonito)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', indexRoute)
app.use('/users', usersRoute)

app.listen(3000)

module.exports = app
