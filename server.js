let express = require("express")
let app = express()

let server = require('http').Server(app)

server.listen(8888)

app.use(express.static("."))

app.get("/", function (req, res) {
    res.redirect("index.html")
})