const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Usuario')
const Usuario = mongoose.model('usuarios')
const validaCampos = require('../validacao')

router.get('/registro', function(req, res) {
    res.render('./usuarios/registro')
})

router.post('/registrar', function(req, res) {

    const erros = validaCampos.Usuarios(req.body)

    if (erros.length > 0) {
        res.render('./usuarios/registro', {erros: erros})
    } else {
        Usuario.findOne({email: req.body.email}).lean().then(function(usuario) {
            if(usuario) {
                req.flash('error_msg', 'Email ja esta cadastrado!')
                res.redirect('/registro')
            }
        }).catch(function(err) {
            req.flash('error_msg', 'Erro ao consultar email.')
            res.redirect('/registro')
        })

        const novoUsuario = {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
        }
        new Usuario(novoUsuario).save().then(function() {
            req.flash('success_msg', 'Usuario criado com Sucesso!')
            res.redirect('/registro')
        }).catch(function(err) {
            req.flash('error_msg', 'Houve um erro ao registrar o Usuario, tente novamente!')
            res.redirect('/registro')
        })
    }
})

module.exports = router;