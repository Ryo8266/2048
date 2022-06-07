class game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.init();
        this.grid = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        this.hasChange = false;
        this.addNum();
        this.addNum();
        this.draw();
        this.handle();
    }

    init() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = 400;
        this.canvas.height = 400;
        document.body.appendChild(this.canvas);
    }

    addNum() {
        let arr = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.grid[i][j] == 0) {
                    arr.push({ x: i, y: j });
                }
            }
        }
        if (arr.length > 0) {
            let randomXY = arr[Math.random() * arr.length >> 0];
            let num = Math.floor(Math.random() * 4);
            if (num < 3) {
                this.grid[randomXY.x][randomXY.y] = 2;
            } else {
                this.grid[randomXY.x][randomXY.y] = 4;
            }
        }
    }

    draw() {
        this.context.clearRect(0, 0, 400, 400);
        for (let i = 1; i < 4; i++) {
            for (let j = 1; j < 4; j++) {
                this.context.beginPath();
                this.context.moveTo(i * 100, 0);
                this.context.lineTo(i * 100, 400);
                this.context.moveTo(0, i * 100);
                this.context.lineTo(400, i * 100);
                this.context.stroke();
            }
        }

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.grid[i][j] == 2) {
                    this.context.fillStyle = '#FFFFFF';
                    this.context.fillRect(j * 100 + 1, i * 100 + 1, 98, 98);
                } else if (this.grid[i][j] == 4) {
                    this.context.fillStyle = '#FFFFCC';
                    this.context.fillRect(j * 100 + 1, i * 100 + 1, 98, 98);
                } else if (this.grid[i][j] == 8) {
                    this.context.fillStyle = '#FFCC33';
                    this.context.fillRect(j * 100 + 1, i * 100 + 1, 98, 98);
                } else if (this.grid[i][j] == 16) {
                    this.context.fillStyle = '#FF9966';
                    this.context.fillRect(j * 100 + 1, i * 100 + 1, 98, 98);
                } else if (this.grid[i][j] == 32) {
                    this.context.fillStyle = '#FF6633';
                    this.context.fillRect(j * 100 + 1, i * 100 + 1, 98, 98);
                } else if (this.grid[i][j] == 64) {
                    this.context.fillStyle = '#CC3300';
                    this.context.fillRect(j * 100 + 1, i * 100 + 1, 98, 98);
                } else if (this.grid[i][j] == 128) {
                    this.context.fillStyle = '#FFFF33';
                    this.context.fillRect(j * 100 + 1, i * 100 + 1, 98, 98);
                } else if (this.grid[i][j] > 128) {
                    this.context.fillStyle = '#FFFF00';
                    this.context.fillRect(j * 100 + 1, i * 100 + 1, 98, 98);
                }

                if (this.grid[i][j] != 0) {
                    this.context.font = '60px time new roman';
                    this.context.fillStyle = 'black';
                    this.context.textAlign = 'center';
                    this.context.fillText(this.grid[i][j], j * 100 + 50, i * 100 + 70);
                }
            }
        }
    }

    slideLeftOrUp(row) {
        let arr = [];
        for (let i = 0; i < 4; i++) {
            if (row[i] != 0) {
                arr.push(row[i]);
            }
        }

        for (let j = arr.length; j < 4; j++) {
            arr.push(0);
        }

        return arr;
    }

    slideRightOrDown(row) {
        let arr = [];
        for (let i = 0; i < 4; i++) {
            if (row[i] == 0) {
                arr.push(row[i]);
            }
        }

        for (let i = 0; i < 4; i++) {
            if (row[i] != 0) {
                arr.push(row[i]);
            }
        }

        return arr;
    }

    hasChangeRC(arr1, arr2) {
        for (let i = 0; i < 4; i++) {
            if (arr1[i] != arr2[i]) {
                this.hasChange = true;
            }
        }
    }

    handle() {
        document.addEventListener('keydown', (e) => {
            this.hasChange = false;
            if (e.which == 37) {
                for (let i = 0; i < 4; i++) {
                    let arr = this.grid[i];
                    this.grid[i] = this.slideLeftOrUp(this.grid[i]);
                    for (let j = 0; j < 3; j++) {
                        if (this.grid[i][j] == this.grid[i][j + 1]) {
                            this.grid[i][j] += this.grid[i][j + 1];
                            this.grid[i][j + 1] = 0;
                        }
                    }
                    this.grid[i] = this.slideLeftOrUp(this.grid[i]);
                    this.hasChangeRC(arr, this.grid[i]);
                }
            } else if (e.which == 38) {
                for (let i = 0; i < 4; i++) {
                    let arr = [];
                    for (let j = 0; j < 4; j++) {
                        arr.push(this.grid[j][i]);
                    }
                    let arr1 = arr;
                    arr = this.slideLeftOrUp(arr);
                    for (let m = 0; m < 3; m++) {
                        if (arr[m] == arr[m + 1]) {
                            arr[m] += arr[m + 1];
                            arr[m + 1] = 0;
                        }
                    }
                    arr = this.slideLeftOrUp(arr);
                    for (let m = 0; m < 4; m++) {
                        this.grid[m][i] = arr[m];
                    }
                    this.hasChangeRC(arr, arr1);
                }
            } else if (e.which == 39) {
                for (let i = 0; i < 4; i++) {
                    let arr = this.grid[i];
                    this.grid[i] = this.slideRightOrDown(this.grid[i]);
                    for (let j = 3; j > 0; j--) {
                        if (this.grid[i][j] == this.grid[i][j - 1]) {
                            this.grid[i][j] += this.grid[i][j - 1];
                            this.grid[i][j - 1] = 0;
                        }
                    }
                    this.grid[i] = this.slideRightOrDown(this.grid[i]);
                    this.hasChangeRC(arr, this.grid[i]);
                }
            } else if (e.which == 40) {
                for (let i = 0; i < 4; i++) {
                    let arr = [];
                    for (let j = 0; j < 4; j++) {
                        arr.push(this.grid[j][i]);
                    }
                    let arr1 = arr;
                    arr = this.slideRightOrDown(arr);
                    for (let m = 3; m > 0; m--) {
                        if (arr[m] == arr[m - 1]) {
                            arr[m] += arr[m - 1];
                            arr[m - 1] = 0;
                        }
                    }
                    arr = this.slideRightOrDown(arr);
                    for (let m = 0; m < 4; m++) {
                        this.grid[m][i] = arr[m];
                    }
                    this.hasChangeRC(arr, arr1);
                }
            }
            if (this.hasChange) {
                this.addNum();
            }
            this.draw()
        });
    }
}

var g = new game()