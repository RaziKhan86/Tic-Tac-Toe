const board = document.getElementById("board");
const Status =  document.querySelector(".status");
const resetBtn = document.getElementById("reset");
let cells = []; //Will store the 9 board cells dynamically.
let boardState = ["","","","","","","","",""]; //Tracks which cells contain "X", "O", or remain empty
let currentPlayer = "X"; // Keep Track who is playing(X or O)


// Check for a Winner
function checkWinner()
{
    // Defines All possible way to win(row,columns,diagonals).
    const winningCombination = [
        [0,1,2], [3,4,5], [6,7,8], // Rows
        [0,3,6], [1,4,7], [2,5,8], // Columns
        [0,4,8],[2,4,6]            // Diagonals
    ];

    //Checks if any of these combinations are the same.
    for (const combo of winningCombination)
    {
        const [a,b,c] = combo;
        if(boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c])
        {
            return boardState[a]; // Return "X" or "O" if someone wins
        }
    }
    return boardState.includes("") ? null : "Draw"; // Return "Draw" if no spaces left
}

// Find BestMove for Computer

function bestMove() {
    let emptyCells = boardState.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

// Make Compute's Move
function computerMove()
{
    let move = bestMove();  //Calls bestMove() to select a move.
    if(move === undefined) return;
    boardState[move] = "O"; // updates the BoradSate and display "X"
    cells[move].textContent = "O";
    cells[move].classList.add("taken");
    cells[move].style.color = "black";
    cells[move].style.backgroundColor = "yellow";
    //Check if the Game is Over(win/draw)
    let winner = checkWinner();
    if(winner)
    {
        Status.textContent = winner === "Draw" ? "It's a Draw!" : `${winner} wins!`;
        return;
    }
    // Switches turn back to the user("X");
    currentPlayer = "X";
    Status.textContent = "Your Turn!";
}

// Handle User Click 
function handleClick(e){
    // Get Clicked Cell's Index
    let index = cells.indexOf(e.target);
    // Check if Move is Valid 
    if (boardState[index] || currentPlayer !== "X") return;

    // Update Board With "X"
    boardState[index] = "X";
    e.target.textContent = "X";
    e.target.classList.add("taken");
    e.target.style.backgroundColor = "white";

    // Check for a Winner
    let winner = checkWinner();
    if(winner)
    {
        Status.textContent = winner === "Draw" ? "It's draw" : `${winner} wins!`;
        return;
    }
    // Switch Turn to Computer
    currentPlayer = "O";
    Status.textContent = "Computer's Turn...";
    setTimeout(computerMove,500);
}

// Reset The Game
function resetGame(){
    boardState = ["","","","","","","","",""];
    currentPlayer = "X";
    Status.textContent = "Your Turn!";
    cells.forEach(cell =>{
        cell.textContent = "";
        cell.classList.remove("taken");
        cell.style.backgroundColor = "";
    });
}
// Create the Board 
function createBoard(){
    for(let i=0;i<9;i++)
    {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click",handleClick);
        board.appendChild(cell);
        cells.push(cell);
    }
}

// Start Game & Attach Reset Button
createBoard();
resetBtn.addEventListener("click",resetGame);