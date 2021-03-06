let table = [
    []
    , []
    , []
    , []
    , []
    , []
    , []
    , []
    , []
];

let Square = [
    []
    , []
    , []
    , []
    , []
    , []
    , []
    , []
    , []
];


function createTableArray() {
    for (let i = 0; i <= 8; i++) {
        for (let j = 0; j <= 8; j++) {
            let sudoku = document.getElementsByClassName('l' + (i + 1));
            let value = sudoku[j].value;
            Square[i][j] = sudoku[j].classList[2];
            if (value == "") {
                table[i][j] = 0;
            } else {
                table[i][j] = Number(value);
            }
        }

    }
}

function createArrayTable() {
    for (let i = 0; i <= 8; i++) {
        for (let j = 0; j <= 8; j++) {
            let sudoku = document.getElementsByClassName('l' + (i + 1));
            let element = sudoku[j];
            element.value = table[i][j];
        }

    }
}

function test(i, j, num) {
    let id = Square[i][j];
    let row_array = table[i];
    // console.log(id);
    // console.log(array.find((item) => { return item == num; }));
    if (row_array.find((item) => { return item == num; }) == undefined) {

        let column_array = [];
        for (let r = 0; r <= 8; r++) {
            // console.log(i);
            column_array[r] = table[r][j];
        }
        // console.log(column_array);
        if (column_array.find((item) => { return item == num; }) == undefined) {
            let square_array = [];
            let square_array_ind = 0;
            for (let r = 0; r <= 8; r++) {
                for (let c = 0; c <= 8; c++) {
                    // console.log(id);
                    if (Square[r][c] == id) {
                        square_array[square_array_ind] = table[r][c];
                        square_array_ind++;
                    }
                }
            }
            // console.log(square_array);
            if (square_array.find((item) => { return item == num; }) == undefined) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }

    } else {
        return false;
    }
}

function checkTable() {
    for (i = 0; i <= 8; i++) {
        for (j = 0; j <= 8; j++) {
            if (!table[i][j] == 0) {
                let num = table[i][j];
                let inp = document.getElementsByClassName("l" + (i + 1))[j];
                table[i][j] = 0;
                if (!test(i, j, num) || num < 1 || num > 9) {
                    inp.style.background = "rgb(208, 25, 25) none repeat scroll 0% 0%";
                    return false;
                }
                table[i][j] = num;
                inp.style.background = "#121213";
                // console.log(test(i, j, num));
            }
        }
    }
    return true;
}

function findFirstEmpty() {
    for (let y = 0; y <= 8; y++) {
        for (let x = 0; x <= 8; x++) {
            if (table[y][x] == 0) {
                return [y, x];
            }
        }
    }
    return false;
}

function tableCleaner() {
    let inputs = document.getElementsByClassName("sudoku-in");
    // console.log(inputs);
    for (let i = 0; i <= 80; i++) {
        inputs[i].value = "";
        inputs[i].style.background = "#121213";
    }
    document.getElementById("err").innerHTML = "";
}

function tableColoring() {
    for (let i = 0; i <= 8; i++) {
        for (let j = 0; j <= 8; j++) {
            if (table[i][j] == 0) {
                document.getElementsByClassName("l" + (i + 1))[j].style.background = "rgb(26, 157, 21) none repeat scroll 0% 0%";
            } else {
                document.getElementsByClassName("l" + (i + 1))[j].style.background = "rgb(35, 40, 47) none repeat scroll 0% 0%";
            }
        }
    }
}

function solve() {
    let i;
    let j;
    if (findFirstEmpty()) {
        // console.log(findFirstEmpty());
        i = findFirstEmpty()[0];
        j = findFirstEmpty()[1];
    } else {
        return true;
    }


    for (let n = 1; n <= 9; n++) {
        // console.log(test(r, c, n));
        if (test(i, j, n)) {
            table[i][j] = n;
            if (solve()) {
                return true;
            } else {
                table[i][j] = 0;
            }
        }
    }
    return false;

}

function tableHandler() {
    createTableArray();
    if (checkTable()) {
        tableColoring();
        solve();
        document.getElementById("err").innerHTML = "";
        createArrayTable();
    } else {
        document.getElementById("err").innerHTML = "The table is wrong";
    }
}

document.getElementById("solve").addEventListener("click", tableHandler);
document.getElementById("clear").addEventListener("click", tableCleaner);
