 let cardsArray = [
        {
            'name': 'html5',
            'img': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
        },
        {
            'name': 'css3',
            'img': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
        },
        {
            'name': 'javascript',
            'img': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        },
        {
            'name': 'nodejs',
            'img': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
        },
        {
            'name': 'react',
            'img': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        },
        {
            'name': 'mongodb',
            'img': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
        },
        {
            'name': 'git',
            'img': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
        },
        {
            'name': 'jquery',
            'img': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg',
        }
    ];


const gameCard = [...cardsArray, ...cardsArray];
let shuffledCards = Array.from(gameCard).sort(() => 0.5 - Math.random());
// step 4

//CREATE CARDS DYNAMICALLY
const container = document.getElementById("container");

shuffledCards.forEach(card => {
    const box = document.createElement("div");
    box.classList.add("box");
    box.dataset.name = card.name;

    const front = document.createElement("div");
    front.classList.add("front", "face");

    const back = document.createElement("div");
    back.classList.add("back", "face");
    back.style.backgroundImage = `url(${card.img})`;

    box.appendChild(front);
    box.appendChild(back);
    container.appendChild(box);
});


//MEMORY GAME LOGIC (STEP-BY-STEP)
let firstCard = null;
let secondCard = null;
let lockBoard = false;

const cards = document.querySelectorAll(".box");

cards.forEach(card => {
    card.addEventListener("click", () => {

        if (lockBoard) return;
        if (card === firstCard) return;

        card.classList.add("flipped");

        if (!firstCard) {
        firstCard = card;
        return;
        }

        secondCard = card;
        lockBoard = true;

        checkMatch();
    });
});

// MATCH CHECK FUNCTION
function checkMatch() {
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;

    if (isMatch) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        resetBoard();
        checkWin();   
    } else {
        setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetBoard();
        }, 800);
    }
}

function checkWin() {
    const matchedCards = document.querySelectorAll(".matched");

    if (matchedCards.length === document.querySelectorAll(".box").length) {
        document.getElementById("win-overlay").classList.add("show");
    }
}


// RESET FUNCTION (VERY IMPORTANT)
function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function restartGame() {
    location.reload();
}


