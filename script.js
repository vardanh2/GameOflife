var socket = io();

let side = 20;
function setup() {

    // grassArr = []
    // grassEaterArr = []
    // predatorArr = []
    // HunterArr = []
    // GrassVerArr = []
    // posArr = []
    
    // frameRate(10);
    createCanvas(30 * side, 30 * side);
    background("f0a056");
}
wethr = "summer"
socket.on("wether", function (data) {
    wethr = data
})


function nkarel(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                if (wethr == "summer") {
                    fill("#5cd932");
                }
                else if (wethr == "aughtm") {
                    fill("green");
                }
                else if (wethr == "winter") {
                    fill("#deb72c");
                }
                else if (wethr == "spring") {
                    fill("#white");
                }
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 3) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("purple");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 6) {
                fill("orange");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 7) {
                fill("brown");
                rect(x * side, y * side, side, side);
            }
        }
    }
}

// setInterval(function () {
    socket.on("send matrix", nkarel)
// }, 1000);
function addgrass (){
    console.log("socket emitaing")
    socket.emit("addgrass")
}
function kill (){
    console.log("killa;;")
    socket.emit("kill")
}
function addGrassEater (){
    console.log("addGrassEater")
    socket.emit("addGrassEater")
}