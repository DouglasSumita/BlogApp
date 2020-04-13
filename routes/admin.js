const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')

// Inicial
router.get('/', function(req, res) {
    res.render('./admin/index')
})

// Posts
router.get('/posts', function(req, res) {
    res.send('Página de Posts')
})

// Categorias
router.get('/categorias', function(req, res) {
    res.render('./admin/categorias')
})

router.get('/categorias/add', function(req, res) {
    res.render('./admin/addcategorias')
})

router.post('/categorias/nova', function(req, res) {
    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    }
    new Categoria(novaCategoria).save().then(function() {
        console.log('Categoria salva com sucesso!')
    }).catch(function(err) {
        console.log('Erro ao cadastrar categoria: ' + err)
    })
    
})

router.delete('/', function(req, res) {

} )

module.exports = router