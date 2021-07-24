let livingcreator = require("./class.js")
module.exports =class Pos extends livingcreator {
    constructor(x, y) {
        super(x, y)
        this.multiplay = 0;

    }
    chooseCell(character) {
        
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    eat() {

        
        var emptyCells1 = this.chooseCell(3)
        var emptyCells2 = this.chooseCell(5)
        var emptyCells3 = this.chooseCell(2)
        var newCell1 = emptyCells1[Math.floor(Math.random() * emptyCells1.length)]
        var newCell2 = emptyCells2[Math.floor(Math.random() * emptyCells2.length)]
        var newCell3 = emptyCells3[Math.floor(Math.random() * emptyCells3.length)]
        if (newCell1) {
            var newX = newCell1[0]
            var newY = newCell1[1]

            matrix[newY][newX] = 0


            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1)
                    break
                }
            }
        }

        if (newCell2) {
            var newX = newCell2[0]
            var newY = newCell2[1]

            matrix[newY][newX] = 0

            for (var i in HunterArr) {
                if (newX == HunterArr[i].x && newY == HunterArr[i].y) {
                    HunterArr.splice(i, 1)
                    break
                }
            }
        }
        if (newCell3) {
            var newX = newCell3[0]
            var newY = newCell3[1]

            matrix[newY][newX] = 0


            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
    

                    grassEaterArr.splice(i, 1)
                    break
                }
            }
        }
    }
}