const xClass = "x";
const oClass = "o";
const allCells = document.querySelectorAll('.cell'); 
const container = document.querySelector('#container');
const winner = document.querySelector('.winTxt');
const restartBtn = document.querySelector('#restartBtn')
const winningCombinations = [
    //horizontal
    [0,1,2],
    [3,4,5],
    [6,7,8],
    //vertical
    [0,3,6],
    [1,4,7],
    [2,5,8],
    //diagonal
    [0,4,8],
    [2,4,6]
]
let circleTurn;



// the game will start with X's turn
startGame()
function startGame(){
    winner.innerText=""
    circleTurn = false;
    allCells.forEach(cell => {
        cell.classList.remove(oClass)
        cell.classList.remove(xClass)
        cell.innerText = " "
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true} ) // once:true -> click only 1 time
    })
}

// picking currect cell and marking O or X, also checking the outcome 
function handleClick(e){
    const cell = e.target;
    const currentClass = circleTurn ? oClass : xClass;
    placeMark(cell, currentClass); //marks the current class with className X Or O
    if(checkWinner(currentClass)){
        endGame(false)
    }else if(isDraw()){
         endGame(true)
    }else{
        swapTurns();
    }

}

// get the msg who is a Winner
function endGame(draw){
    if(draw){
        winner.innerText = 'Draw!'
    }else{
        winner.innerText = `${circleTurn ? "O's" : "X's"} Wins!!!`;
        // disable empty cells after winning
        for(let empty=0; empty<allCells.length; empty++){
            if(!allCells[empty].classList.contains(oClass) && !allCells[empty].classList.contains(xClass)){
                allCells[empty].removeEventListener('click', handleClick)
            }
        }
    }
}

// swapping turns between O and X
function swapTurns(){
    circleTurn = !circleTurn;
}

// //marks the current class with className X Or O
function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
    cell.innerText= circleTurn ? "O" : "X"
}

//checking if there is any winning combinations are true for current Player
function checkWinner(currentClass){
    return winningCombinations.some(combination => {
        return combination.every(index => { //check if every el is the same class
            return allCells[index].classList.contains(currentClass) //if curClas => winer
        })
    })
}


function isDraw(){
    return [...allCells].every(cell => {
        return cell.classList.contains(oClass) || cell.classList.contains(xClass)
    })
}


restartBtn.addEventListener('click', startGame);