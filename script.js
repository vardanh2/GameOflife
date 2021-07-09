function generator(matLen, gr, grEata, pr, cb, hun, greete,pos) {
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
         
                

                matrix[x-1][y] = 7;
                matrix[x-1][y-1] = 7;
                matrix[x][y-1] = 7;


            }
        }
    }
    return matrix;
}

let side = 20;

let matrix = generator(20, 80, 50, 35, 11, 11,20,10);

var grassArr = []
var grassEaterArr = []
var predatorArr = []
var HunterArr = []
var GrassVerArr = []
var posArr = []

function setup() {
    frameRate(3);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background("f0a056");



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
}

function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
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
} 