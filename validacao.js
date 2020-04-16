const mongoose = require('mongoose')
require('./models/Usuario')
const Usuario = mongoose.model('usuarios')

function Categoria(body) {
    var erros = []

    if (!body.nome || typeof body.nome == undefined || body.nome == null) {
        erros.push({
            texto: 'Nome da categoria inválido.'
        })
    } else if (body.nome.length < 2 ) {
        erros.push({
            texto: 'Nome da categoria muito pequeno.'
        })
    }

    if (!body.slug || typeof body.slug == undefined || body.slug == null) {
        erros.push({
            texto: 'Slug da categoria inválido.'
        })
    }

    return erros;
}

function Postagem(body) {
    var erros = []

    if (!body.titulo || typeof body.titulo == undefined || body.titulo == null) {
        erros.push({
            texto: 'Título da postagem inválido.'
        })
    } else if (body.titulo.length < 2 ) {
        erros.push({
            texto: 'Título da postagem muito pequeno.'
        })
    }

    if (!body.slug || typeof body.slug == undefined || body.slug == null) {
        erros.push({
            texto: 'Slug da postagem inválido.'
        })
    }
    
    if (!body.descricao || typeof body.descricao == undefined || body.descricao == null) {
        erros.push({
            texto: 'Descricao da postagem inválida.'
        })
    }

    if (!body.conteudo || typeof body.conteudo == undefined || body.conteudo == null) {
        erros.push({
            texto: 'Conteudo da postagem inválida.'
        })
    }

    if (body.categoria == "0") {
        erros.push({
            texto: 'Categoria da postagem inválida.'
        })
    }
    return erros;
}

function Usuarios(body) {
    
    var erros = []

    if (!body.nome || body.nome == undefined || body.nome == null) {
        erros.push({texto: 'Nome de usuário inválido.'})
    } else if (body.nome.length < 2) {
        erros.push({texto: 'Tamanho do nome de usuário invalido.'})
    }

    if (!body.email || body.email == undefined || body.email == null || !body.email.includes('@') || !body.email.includes('.') ) {
        erros.push({texto: 'Email do usuário inválido.'})
    }
    
    if (!body.senha || body.senha == undefined || body.senha == null) {
        erros.push({texto: 'Senha do usuário inválido.'})
    }

    if (!body.senha2 || body.senha2 == undefined || body.senha2 == null) {
        erros.push({texto: 'Confirmação de senha do usuário inválido.'})
    }

    if (body.senha.length < 4) {
        erros.push({texto: 'Senha muito curta.'})
    }

    if (body.senha2 != body.senha) {
        erros.push({texto: 'As senhas são diferentes.'})
    }

    return erros;
}

module.exports = {
    Categoria,
    Postagem,
    Usuarios
}
