const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Usuario')
const Usuario = mongoose.model('usuarios')
const validaCampos = require('../validacao')
const bcrypt = require('bcryptjs')

//ROTAS
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
                req.flash('error_msg', 'Ja existe uma conta com esse e-mail cadastrado no sistema!')
                res.redirect('/registro')
            } else {
                const novoUsuario = {
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha
                }
                
                bcrypt.genSalt(10, function(erro, salt) {
                    bcrypt.hash(novoUsuario.senha, salt, function(erro, hash) {
                        if (erro) {
                            req.flash('error_msg', 'Erro ao cadastrar usuário.')
                            res.redirect('/registro')
                        } else {
                            novoUsuario.senha = hash

                            new Usuario(novoUsuario).save().then(function() {
                                req.flash('success_msg', 'Usuario criado com Sucesso!')
                                res.redirect('/registro')
                            }).catch(function(err) {
                                req.flash('error_msg', 'Houve um erro ao registrar o Usuario, tente novamente!')
                                res.redirect('/registro')
                            })
                        }
                    })    
                })


            }

        }).catch(function(err) {
            req.flash('error_msg', 'Erro ao consultar email.')
            res.redirect('/registro')
        })
    }
})

module.exports = router;