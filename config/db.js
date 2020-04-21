if (process.env.NODE_ENV == 'production') {
    module.exports = {mongoURI: "mongodb+srv://douglassumita:sarandi123@blogapp-prod-9vyhn.mongodb.net/test?retryWrites=true&w=majority"}
} else {
    module.exports = {mongoURI: "mongodb://localhost/blogapp"}
}