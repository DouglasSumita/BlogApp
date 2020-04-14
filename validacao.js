var verificar = function validaCampos(body) {
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

module.exports = verificar
