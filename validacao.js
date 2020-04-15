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

module.exports = {
    Categoria,
    Postagem
}
