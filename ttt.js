const gameboard = (function createboard() {
    const row = 3
    const column = 3
    const placeholder = "z"
    const board = []
    for (let i =0; i< row; i++) {
        board[i]=[]
        for (let k=0; k < column; k++) {
            board[i][k] = placeholder
        }
    }
    function reset (array){
        for (let i =0; i< 3; i++) {
            array[i]=[]
            for (let k=0; k < 3; k++) {
                array[i][k] = "z"
            }
        }
    }
    function placer (input, row, column) {
        if (board[row][column] === "z") {//this checks if it's an open spot
            board[row][column] = input
        } else {
            return "ERROR"
        }
        return {board}
    }
    function check (row,column) {
        if (board[row][column] === "z") {
            return true
        } else {
            return false
        }
    }
    return {board, placer, check,reset}
})()

function display(array) {
    array.forEach(row => {
        console.log(row)
    })
    return
}
const game =(function createController () {
    function checkWin (board) {
        let win = false
        let winner = "NULL"
        for (let i=0; i<3; i++) {
            if(board[i][0] === board[i][1] && board[i][1]=== board[i][2] && board[i][0] != "z") {
                win = true
                winner = board[i][0]
            }//row win condition
            if(board[0][i] === board[1][i] && board[1][i]=== board[2][i] && board[0][i] != "z") {
                win = true
                winner = board[0][i]
            }//col win condition
        }
        if(board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] != "z") {
            win = true
            winner = board[1][1]
        }//diagnol win condition
        if(board[2][0] === board[1][1] && board[1][1] === board[0][2] && board[1][1] != "z") {
            win = true
            winner = board[1][1]
            console.log("winner is "+ winner)
        }//2nd diagnol win condition
        return {win, winner}
    }
    function checkTie (board) {
        let all_fill = true
        for (let i=0; i< 3; i++) {
            for(let k=0; k<3; k++) {
                if(board[i][k] === "z") {
                    all_fill = false
                }
            }
        }
        return all_fill
    }

    return {checkWin, checkTie}

})()

function turn (board) {
    let counter = 0;
    for(let i=0; i<3;i++) {
        for(let k=0; k<3; k++) {
            if(board[i][k] != "z") {
                counter ++;
            }
        }
    }
    if (counter % 2 === 0) {
        return "x"
    } else {
        return "o"
    }
}
const h2 = document.querySelector("#win_display")
const cells = document.querySelectorAll("cell")
cells.forEach((cell) => {
    cell.addEventListener("click", () => {
        console.log(display(gameboard.board))

        let col = Number(cell.getAttribute("class"))
        let row=  (Number(cell.parentNode.id))
        if (gameboard.check(row,col) === true) {
            let value = turn(gameboard.board)
            gameboard.placer(value,row,col)
            cell.textContent = value
            console.log(display(gameboard.board))
        } else {
            alert("item has been filled")
        }
        if(game.checkWin(gameboard.board).win === true) {
            h2.textContent = ("the winner is "+game.checkWin(gameboard.board).winner)
        }
    })
    
})
const reset = document.getElementById("reset")
reset.addEventListener("click", () => {
    h2.textContent = ""
    gameboard.reset(gameboard.board)
    console.log("reset is")

    console.log(display(gameboard.board))
    console.log("nor resetting all the cells")
    cells.forEach((cell)=> {
        cell.textContent = "null"
    })
}) 