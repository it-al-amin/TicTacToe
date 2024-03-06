let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turn = true; // playerX playerY
let draw=true;
const winPatterns = [
    [0, 1, 2], [0, 3, 6],
    [0, 4, 8], [1, 4, 7],
    [2, 5, 8], [2, 4, 6],
    [3, 4, 5], [6, 7, 8]
];
const resetGame = () => {
    turn = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}
const enableBoxes = () => {
    for (let box of boxes) {

        box.addEventListener("click", boxClickListener);
        box.innerText = "";

    }
}
let cnt=0;
const boxClickListener = (event) => {
    const box = event.target;

    console.log("Box was clicked");
    if (!box.innerText) {
        if (turn) {
            box.innerText = "O"; 
            box.style.color="red";
            turn = false;
        } else {
            box.innerText = "X";
            box.style.color="green";
            turn = true;
        }
        box.removeEventListener("click", boxClickListener);
        checkWinner();
        cnt++;
        if(cnt==9&&draw==true)
        {
            showDraw();
        }
    }
}

boxes.forEach((box) => {
    box.addEventListener("click", boxClickListener);
});

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.removeEventListener("click", boxClickListener);
    });
}

const showWinner = (winner) => {
    msg.innerText = `Congratulation, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let x = boxes[pattern[0]].innerText;
        let y = boxes[pattern[1]].innerText;
        let z = boxes[pattern[2]].innerText;
        if (x === y && y === z && x !== "") {
            console.log("winner", x);
            showWinner(x);
            draw=false;
        }
    }
}
const showDraw=()=>{
    console.log("Draw");
    msg.innerText = `Oops! Draw Game `;
    msgContainer.classList.remove("hide");
    disableBoxes();
}
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

