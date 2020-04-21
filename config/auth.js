const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

//Models de Usuário
require('../models/Usuario')

const Usuario = mongoose.model('usuarios')



module.exports = function(passport) {
    
    passport.use(new localStrategy({usernameField: 'email', passwordField: 'password'}, function(email, senha, done) {
        Usuario.findOne({email: email}).lean().then(function(usuario) {
            if(!usuario) {
                return done(null, false, {message: 'Este email de usuário não existe!'})
            }

            bcrypt.compare(senha, usuario.senha, function(erro, sucesso) {
                if (sucesso) {
                    return done(null, usuario)
                } else {
                    return done(null, false, {message: 'Senha incorreta!'})
                }
            })
        })
    }))

    passport.serializeUser(function(usuario, done) {
        done(null, usuario._id)
    })

    passport.deserializeUser(function(id, done) {
        Usuario.findById(id, function(erro, usuario) {
            done(erro, usuario)
        })
    })
}