class GrassVer {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

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

    move(r) {
        var emptyCells = this.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]


        if (newCell) {
            if (r == 1) {
                console.log(newCell)
                var newX = newCell[0]
                var newY = newCell[1]
                matrix[newY][newX] = matrix[this.y][this.x]
                matrix[this.y][this.x] = r
                var newGrass = new Grass(this.x, this.y);
                grassArr.push(newGrass);
                this.x = newX
                this.y = newY
            } else if (r == 0) {
                var newX = newCell[0]
                var newY = newCell[1]
                matrix[newY][newX] = matrix[this.y][this.x]
                matrix[this.y][this.x] = r
                this.x = newX
                this.y = newY
            }
        }

    }
}