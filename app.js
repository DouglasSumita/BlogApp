// Carregando modulos
const express = require('express')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routes/admin')
const usuarios = require('./routes/usuario')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')

//Configurações:
//  Sessão
app.use(session({
    secret: 'blogapp.DouglasSumita',
    resave: true,
    saveUninitialized: true
}))

//  Flash
app.use(flash())

//Middleware
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
})

// body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// handlebars
app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
app.set('view engine', 'handlebars')

// Criação de Helpers customizados 
var handlebarsCreate = handlebars.create({})
// verificar se valores são iguais
handlebarsCreate.handlebars.registerHelper('if_eq', function(a, b, opts) {
    if (a.toString() == b.toString()) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
})

// mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blogapp', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(function() {
    console.log('Conectado ao MongoDB com sucesso')
}).catch(function(err) {
    console.log('Erro ao se conectar ao MongoDB: ' + err)
})

// public
app.use(express.static(path.join(__dirname, 'public')))

// Rotas
app.use('/', admin)
app.use('/', usuarios)

// Outros
const PORT = 8081
app.listen(PORT, function() {
    console.log('Servidor rodando!')
})