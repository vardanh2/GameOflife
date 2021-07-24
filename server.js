let express = require("express")
let app = express()

let server = require('http').Server(app)
let io = require("socket.io")(server)
let fs = require("fs")
server.listen(8080)

app.use(express.static("."))

app.get("/", function (req, res) {
    res.redirect("index.html")
})

function generator(matLen, gr, grEata, pr, cb, hun, greete, pos) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEata; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < pr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }

    for (let i = 0; i < cb; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }
    for (let i = 0; i < hun; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }
    for (let i = 0; i < greete; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 6;
        }
    }
    for (let i = 0; i < pos; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (x >= 1 && x < matrix[0].length - 1 && y >= 1 && y < matrix.length - 1) {
            if (matrix[x][y] == 0) {
                matrix[x][y] = 7;
                matrix[x - 1][y] = 7;
                matrix[x - 1][y - 1] = 7;
                matrix[x][y - 1] = 7;
            }
        }
    }

    io.sockets.emit("send matrix", matrix)
    return matrix;


}
matrix = generator(30, 50, 30, 35, 11, 11, 20, 5);
grassArr = []
grassEaterArr = []
predatorArr = []
HunterArr = []
GrassVerArr = []
posArr = []

Grass = require("./Grass")
GrassEater = require("./GrassEater")
Predator = require("./Predator")
Hunter = require("./Hunter")
GrassVer = require("./grasseateat")
Pos = require("./pos")

function creatobj() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y);
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                var grEat = new GrassEater(x, y)
                grassEaterArr.push(grEat)
            }
            else if (matrix[y][x] == 3) {
                var predat = new Predator(x, y)
                predatorArr.push(predat)
            }
            else if (matrix[y][x] == 5) {
                var hun = new Hunter(x, y)
                HunterArr.push(hun)
            }
            else if (matrix[y][x] == 6) {
                var greete = new GrassVer(x, y)
                GrassVerArr.push(greete)
            }
            else if (matrix[y][x] == 7) {

                var pos = new Pos(x, y)
                posArr.push(pos)
            }

        }
    }


    io.sockets.emit("send matrix", matrix)
}
function game() {

    for (var i in grassArr) {
        grassArr[i].mul();

    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].mul();
        grassEaterArr[i].eat();
    }
    for (var i in predatorArr) {
        predatorArr[i].mul();
        predatorArr[i].eat();
    }
    for (var i in HunterArr) {
        HunterArr[i].eat();
    }
    for (var i in GrassVerArr) {
        GrassVerArr[i].move(1)
    }
    for (var i in posArr) {
        posArr[i].eat();
    }
    io.sockets.emit("send matrix", matrix)

}

wethr = "summer"
function wether() {
    if (wethr == "summer") {
        console.log(wethr);

        wethr = "aughtm"
    }
    else if (wethr == "aughtm") {
        console.log(wethr);
        wethr = "winter"
    }
    else if (wethr == "winter") {
        console.log(wethr);
        wethr = "spring"
    }
    else if (wethr == "spring") {
        console.log(wethr);
        wethr = "summer"
    }
    io.sockets.emit("wether", wethr)
}

setInterval(game, 500)
io.on("connection", function (socket) {
    creatobj()
    socket.on("addgrass", function addGrass() {
        for (var i = 0; i < 7; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 0) {
                matrix[y][x] = 1
                var gr = new Grass(x, y, 1)
                grassArr.push(gr)
            }
        }
        io.sockets.emit("send matrix", matrix);
    })
    socket.on("kill", function kill() {
        grassArr = [];
        grassEaterArr = []
        predatorArr = []
        HunterArr = []
        GrassVerArr = []
        posArr = []
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                matrix[y][x] = 0;
            }
        }
        io.sockets.emit("send matrix", matrix);
    })
    socket.on("addGrassEater", function addGrassEater() {
        for (var i = 0; i < 7; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 0) {
                matrix[y][x] = 2
                grassEaterArr.push(new GrassEater(x, y, 2))
            }
        }
        io.sockets.emit("send matrix", matrix);
    })
})

setInterval(wether, 5000)


var statistics = {};
setInterval(function () {
    statistics.Grass = grassArr.length;
    statistics.GrassEater = grassEaterArr.length;
    statistics.Predator = predatorArr.length;
    statistics.Hunter = HunterArr.length;
    statistics.Virus = GrassVerArr.length;
    statistics.sunk = posArr.length;
    fs.writeFileSync("statitics.json",
        JSON.stringify(statistics))
}, 1000)

