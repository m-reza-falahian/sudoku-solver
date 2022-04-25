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


function create_table_array() {
    for (let i = 0; i <= 8; i++) {
        for (let j = 0; j <= 8; j++) {
            let sudoku = document.getElementsByClassName('l' + (i + 1));
            let value = sudoku[j].value;
            Square[i][j] = sudoku[j].id;
            if (value == "") {
                table[i][j] = 0;
                sudoku[j].style.background = "rgb(42, 142, 14) none repeat scroll 0% 0%";
            } else {
                table[i][j] = Number(value);
                sudoku[j].style.background = "rgb(35, 40, 47) none repeat scroll 0% 0%";
            }
        }

    }
}

function create_array_table() {
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
            for (let o = 0; o <= 8; o++) {
                for (let p = 0; p <= 8; p++) {
                    // console.log(id);
                    if (Square[o][p] == id) {
                        square_array[square_array_ind] = table[o][p];
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

function find_empty() {
    for (let y = 0; y <= 8; y++) {
        for (let x = 0; x <= 8; x++) {
            if (table[y][x] == 0) {
                return [y, x];
            }
        }
    }
    return false;
}


function solve() {
    let r;
    let c;
    if (find_empty()) {
        // console.log(find_empty());
        r = find_empty()[0];
        c = find_empty()[1];
    } else {
        return true;
    }
    for (let n = 1; n <= 9; n++) {
        // console.log(test(r, c, n));
        if (test(r, c, n)) {
            table[r][c] = n;
            if (solve()) {
                return true;
            } else {
                table[r][c] = 0;
            }
        }
    }
    return false;

}

function table_handler() {
    create_table_array();
    solve();
    console.log(table);
    create_array_table();
}

document.getElementById("solve").addEventListener("click", table_handler);
