// Carregando modulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routes/admin')
const path = require('path')
const mongoose = require('mongoose')

//Configurações - body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Configurações - handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//Configurações - mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blogapp', {useNewUrlParser: true, useUnifiedTopology: true}).then(function() {
    console.log('Conectado ao MongoDB com sucesso')
}).catch(function(err) {
    console.log('Erro ao se conectar ao MongoDB: ' + err)
})

//Configurações - public
app.use(express.static(path.join(__dirname, 'public')))

// Rotas
app.use('/', admin)

// Outros
const PORT = 8081
app.listen(PORT, function() {
    console.log('Servidor rodando!')
})