let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset');
let turn0 = true;// player 0 start 
let newGamebtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

// When mouse click then display 'O' or 'X';
boxes.forEach((box) =>{
    box.addEventListener('click',function(){
        if(turn0)
        {
            box.innerText = 'O';
            box.style.color = 'green';
            box.style.backgroundColor = 'yellow';
            turn0 = false;
            box.disabled = true;
            checkWinner();
        }else{
            box.innerText = 'X';
            box.style.color = 'black';
            box.style.backgroundColor = 'white';
            turn0 = true;
            box.disabled = true;
            checkWinner();
        }
    });
});


const enableBoxes = () =>{
    for (let box of boxes)
    {
        box.disabled = false;
        box.innerText = "";
    }
}

const disableBoxes = () =>{
    for (let box of boxes)
    {
        box.disabled = true;
    }
}

const colorDisable = () =>
{
 for (let box of boxes)
 {
    box.style.backgroundColor = '';
 }
}


const showWinner = (winner) =>{
    msg.innerText = `Congratulation, Winner is ${winner}`;
    msgContainer.classList.remove('hide');
    disableBoxes();
    resetBtn();
};


const checkWinner = () =>{
    let hasWin = false;
    for(let pattern of winPatterns)
    {
        let pass1val = boxes[pattern[0]].innerText;
        let pass2val = boxes[pattern[1]].innerText;
        let pass3val = boxes[pattern[2]].innerText;

        if(pass1val !== "" && pass2val !== "" && pass3val !== "" && pass1val === pass2val && pass2val === pass3val)
            {
                showWinner(pass1val);
                hasWin = true;
                return;
            }
    }

    if(!hasWin)
    {
        const allBoxes = [...boxes].every((box)=> box.innerText !== "");
        if(allBoxes){
            msgContainer.classList.remove('hide');
            msg.innerText = 'Match Drawn';
        }
    }  
};

const resetGame = () =>{
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add('hide');
    colorDisable();
}

newGamebtn.addEventListener('click',resetGame);
resetBtn.addEventListener('click',resetGame);