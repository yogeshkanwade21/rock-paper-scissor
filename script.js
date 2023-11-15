let score = JSON.parse(localStorage.getItem('score')) || {
    wins : 0,
    losses : 0,
    ties : 0
};

function showScore() {
    let gameScore = document.getElementById('game-score');
    gameScore.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function resetScore() {
    localStorage.removeItem('score');
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    showScore();

    let gameResult = document.getElementById('game-result');
    gameResult.innerHTML = '';

    let gameMoves = document.getElementById('game-moves');
    gameMoves.innerHTML = '';
}

let intervalID;
let isAutoPlaying = false;

function autoPlay() {
    if (!isAutoPlaying) {
        intervalID = setInterval(() => {
            const playerMove = generateComputerMove();
            playGame(playerMove);
        }, 1000);

        document.getElementById('autoPlay-Button').innerHTML = 'Pause';
        isAutoPlaying = true;
    }
    else {
        clearInterval(intervalID);
        document.getElementById('autoPlay-Button').innerHTML = 'Auto Play';
        isAutoPlaying = false;
    }
}

function playGame(playerMove) {
    const computerMove = generateComputerMove();
    let result = '';
    if (playerMove === 'Rock') {
        if (computerMove === 'Rock') {
            result = 'It\'s a tie';
        }
        else if (computerMove === 'Paper'){
            result = 'You lose';
        }
        else if (computerMove === 'Scissor') {
            result = 'You win';
        }
    }
    else if (playerMove === 'Paper') {
        if (computerMove === 'Rock') {
            result = 'You win';
        }
        else if (computerMove === 'Paper'){
            result = 'It\'s a tie';
        }
        else if (computerMove === 'Scissor') {
            result = 'You lose';
        }
    }
    else if (playerMove === 'Scissor') {
        if (computerMove === 'Rock') {
            result = 'You lose';
        }
        else if (computerMove === 'Paper'){
            result = 'You win';
        }
        else if (computerMove === 'Scissor') {
            result = 'It\'s a tie';
        }
    }
    // update score
    if (result === 'You win') {
        score.wins += 1;
    }
    else if (result === 'You lose'){
        score.losses += 1;
    }
    else if(result === 'It\'s a tie'){
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    let gameResult = document.getElementById('game-result');
    gameResult.innerHTML = result;

    let gameMoves = document.getElementById('game-moves');
    gameMoves.innerHTML = `You <img class="show-move-icon" src="./images/${playerMove}-emoji.png" alt="playerMove">
                            Computer <img class="show-move-icon" src="./images/${computerMove}-emoji.png" alt="computerMove"> `;

    showScore();
}



function generateComputerMove() {
    const randomNum = Math.random();
    let computerMove = '';

    // console.log(randomNum);
    if (randomNum <1/3 && randomNum >= 0) {
        // console.log('rock');
        computerMove = 'Rock';
    }
    else if (randomNum >= 1/3 && randomNum < 2/3){
        // console.log('paper');
        computerMove = 'Paper';
    }
    else{
        // console.log('scissor');
        computerMove = 'Scissor';
    }
    return computerMove;
}

window.onload=function(){
    const Rock = document.getElementById('move-button-rock');
    Rock.addEventListener('click', () => {
        playGame('Rock');
    });
    const Paper = document.getElementById('move-button-paper');
    Paper.addEventListener('click', () => {
        playGame('Paper');
    });
    const Scissor = document.getElementById('move-button-scissor');
    Scissor.addEventListener('click', () => {
        playGame('Scissor');
    });
    const Reset = document.getElementById('reset-Button');
    Reset.addEventListener('click', () => {
        resetScore();
    });
    const autoPlayBtn = document.getElementById('autoPlay-Button');
    autoPlayBtn.addEventListener('click', () => {
        autoPlay();
    });

    document.body.addEventListener('keydown', (e) => {
        // console.log(e.key);
        if (e.key === 'r' || e.key === 'R') {
            playGame('Rock');
        }
        else if (e.key === 'p' || e.key === 'P') {
            playGame('Paper');
        }
        else if (e.key === 's' || e.key === 'S') {
            playGame('Scissor');
        }
        else if (e.key === 'a' || e.key === 'A'){
            autoPlay();
        }
        else if (e.key === 'c' || e.key === 'C'){
            resetScore();
        }
    })
}