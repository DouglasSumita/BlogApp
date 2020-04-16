const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')
require('../models/Postagem')
const Postagem = mongoose.model('postagens')
const validaCampos = require('../validacao')

// Inicial
router.get('/', function(req, res) {
    res.render('./admin/index')
})

// POSTAGENS
router.get('/postagens', function(req, res) {
    Postagem.find().populate('categoria').sort({data: 'desc'}).lean().then(function(postagens) {
        res.render('./admin/postagens', {postagens: postagens})
    }).catch(function(err) {
        req.flash('error_msg', 'Houve um erro ao listar as postagens!')
        res.redirect('/')
    })
})

router.get('/postagens/add', function(req, res) {
    Categoria.find().sort('nome').lean().then(function(categorias) {
        res.render('./admin/addpostagens', {categorias: categorias})
    }).catch(function(err) {
        req.flash('error_msg', 'Erro ao carregar as categorias!')
        res.redirect('/postagens')
    })
})

router.post('/postagem/nova', function(req, res) {
    let erros = validaCampos.Postagem(req.body)

    if (erros.length > 0) {
        res.render('./admin/addpostagens', {erros: erros})
    } else {
        const novaPostagem = {
            titulo: req.body.titulo,
            slug: req.body.slug,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria
        }
        new Postagem(novaPostagem).save().then(function() {
            req.flash('success_msg', 'Postagem criada com Sucesso!')
            res.redirect('/postagens')
        }).catch(function(err) {
            req.flash('error_msg', 'Houve um erro ao salvar a postagem, tente novamente!')
            res.redirect('/')
        })
    }
})

//EDITAR POSTAGEM
router.get('/postagens/editar/:id', function(req, res) {
    Postagem.findOne({_id: req.params.id}).populate('categoria').lean().then(function(postagem) {
        Categoria.find().sort('nome').lean().then(function(categorias) {   
            res.render('./admin/editarpostagem', {postagem: postagem, categorias: categorias})
        }).catch(function(err) {
            req.flash('error_msg', 'Erro ao carregar as categorias')
            res.redirect('/postagens')
        })
    }).catch(function(err) {
        req.flash('error_msg', 'Postagem não encontrada!')
        res.redirect('/postagens')
    })
})

//DELETAR POSTAGEM
router.get('/postagens/deletar/:id', function(req, res) {
    Postagem.findOneAndRemove({_id: req.params.id}).lean().then(function(postagem) {
        req.flash('success_msg', 'Postagem deletada com sucesso!')
        res.redirect('/postagens')
    }).catch(function(err) {
        req.flash('error_msg', 'Postagem não encontrada!')
        res.redirect('/postagens')
    })
})

router.post('/postagens/editarpostagem', function(req, res) {
    
    let erros = validaCampos.Postagem(req.body)

    if (erros.length > 0) {
        Postagem.findOne({_id: req.body.id}).populate('categoria').lean().then(function(postagem) {
            Categoria.find().sort('nome').lean().then(function(categorias) {   
                res.render('./admin/editarpostagem', {erros: erros, postagem: postagem, categorias: categorias})
            }).catch(function(err) {
                req.flash('error_msg', 'Erro ao carregar as categorias')
                res.redirect('/postagens')
            })
        })
    } else {
        let filter = { _id: req.body.id }
        let update = { 
            titulo: req.body.titulo,
            slug: req.body.slug,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria
        }
        Postagem.findOneAndUpdate(filter, update).then(function() {
            req.flash("success_msg", "Postagem atualizada com sucesso!")
            res.redirect('/postagens')
        }).catch(function(err) {
            req.flash("error_msg", "Erro ao atualizar postagem!")
        })
    }
})

// LISTA DE CATEGORIAS
router.get('/categorias', function(req, res) {
    Categoria.find().sort({nome: 'asc'}).lean().then(function(categorias) {
        res.render('./admin/categorias', {categorias: categorias})
    }).catch(function(err) {
        req.flash('error_msg', 'Houve um erro ao listar as categorias!')
        res.redirect('/')
    })
})

router.get('/categorias/add', function(req, res) {
    res.render('./admin/addcategorias')
})

//EDITAR CATEGORIA
router.get('/categorias/editar/:id', function(req, res) {
    Categoria.findOne({_id: req.params.id}).lean().then(function(categoria) {
        res.render('./admin/editarcategoria', {categoria: categoria})
    }).catch(function(err) {
        req.flash('error_msg', 'Categoria não encontrada!')
        res.redirect('/categorias')
    })
})

router.post('/categorias/editarcategoria', function(req, res) {
    
    let erros = validaCampos.Categoria(req.body)

    if (erros.length > 0) {
        Categoria.findOne({_id: req.body.id}).lean().then(function(categoria) {
            res.render('./admin/editarcategoria', {erros: erros, categoria: categoria})
        })
    } else {
        let filter = { _id: req.body.id }
        let update = { 
            nome: req.body.nome,
            slug: req.body.slug 
        }
        Categoria.findOneAndUpdate(filter, update).then(function() {
            req.flash("success_msg", "Categoria atualizada")
            res.redirect('/categorias')
        }).catch(function(err) {
            req.flash("error_msg", "Erro ao atualizar categoria")
        })
    }
})

//DELETAR CATEGORIA
router.get('/categorias/deletar/:id', function(req, res) {
    Categoria.findOneAndRemove({_id: req.params.id}).lean().then(function(categoria) {
        req.flash('success_msg', 'Categoria deletada com sucesso!')
        res.redirect('/categorias')
    }).catch(function(err) {
        req.flash('error_msg', 'Categoria não encontrada!')
        res.redirect('/categorias')
    })
})

// ADD CATEGORIAS
router.post('/categorias/nova', function(req, res) {
    
    let erros = validaCampos.Categoria(req.body)

    if (erros.length > 0) {
        res.render('./admin/addcategorias', {erros: erros})
    } else {
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }
        new Categoria(novaCategoria).save().then(function() {
            req.flash('success_msg', 'Categoria criada com Sucesso!')
            res.redirect('/categorias')
        }).catch(function(err) {
            req.flash('error_msg', 'Houve um erro ao salvar a categoria, tente novamente!')
            res.redirect('/')
        })
    }
})

module.exports = router