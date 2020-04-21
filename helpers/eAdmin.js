module.exports = {
    
    eAutenticado: function(req, res, next) {
        if (req.isAuthenticated() ) {
            return next();
        }
        
        req.flash('error_msg', 'Faça o login para acessar o conteúdo!')
        res.redirect('/login')
    },
    eAdmin: function(req, res, next) {
        if (req.isAuthenticated() && req.user.eAdmin == 1) {
            return next();
        }

        if (!req.isAuthenticated()) {
            req.flash('error_msg', 'Faça o login para acessar o conteúdo!')
            res.redirect('/login')
        } else if (req.user.eAdmin == 0) {
            req.flash('error_msg', 'Necessário ser Administrador para ter acesso a esta opção!')
            res.redirect('/')
        }
    }
}