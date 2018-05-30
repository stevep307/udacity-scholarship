let timerId, startTime;
let pairCount = 8, actionCount = 0;
let starPanel = document.querySelector('.stars').children;

// Variable to store last open card
let lastCard = false;
let cards = [
  'fa-diamond',
  'fa-paper-plane-o',
  'fa-anchor',
  'fa-bolt',
  'fa-cube',
  'fa-anchor',
  'fa-leaf',
  'fa-bicycle',
  'fa-diamond',
  'fa-bomb',
  'fa-leaf',
  'fa-bomb',
  'fa-bolt',
  'fa-bicycle',
  'fa-paper-plane-o',
  'fa-cube'
];

// Counting actions and managing star rating
function updateActionCounter() {
    actionCount += 1;
    document.querySelector('.moves').textContent = actionCount;
    //TODO: change to fa-star-o class
    if (actionCount == 27) {
        starPanel[0].classList.add('hidden-star');
    } else if (actionCount == 33) {
        starPanel[1].classList.add('hidden-star');
    }
}

function openCard(card) {
    card.classList.add('open', 'show');
}

function markCardsMatched(card, lastCard) {
    card.classList.add('match');
    lastCard.classList.add('match');
    pairCount -= 1;
}

function markCardsNotMatched(card, lastCard) {
    card.classList.add('error');
    lastCard.classList.add('error');

    setTimeout(function closeCards() {
        lastCard.classList.remove('open', 'show', 'error');
        card.classList.remove('open', 'show', 'error');
    }, 1100);
}

function checkCardMatching(card) {
    const newCardClassName = card.querySelector('i').className;
    const lastCardClassName = lastCard.querySelector('i').className;

    if (newCardClassName === lastCardClassName) {
        markCardsMatched(card, lastCard);
    } else {
        markCardsNotMatched(card, lastCard);
    }
    lastCard = false;
}

function showFinalScore() {
    clearInterval(timerId);

    const time = document.querySelector('.timer').textContent;
    const starCount = 3 - document.getElementsByClassName('hidden-star').length;

    const ratingElement = document.querySelector('.rating');
    ratingElement.textContent = `With ${actionCount} Moves and ${starCount} Stars in ${time}.`;

    const gameElement = document.querySelector('.container');
    gameElement.classList.add('winning');

    const scoreElement = document.querySelector('.final-score');
    scoreElement.classList.add('winning');
}

// Formatting time string into 2-digit time string
function timeFormatter(timeString) {
    return timeString < 10 ? "0" + timeString : timeString;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function onCardClick(card) {
    if (!startTime) {
        // Initialization of the timer
        startTime = new Date();
        imerId = setInterval(timer, 1000);
    }

    const isMatched = card.classList.contains('match');
    const isOpen = card.classList.contains('open');
    if(isMatched || isOpen) {
        return;
    }

    updateActionCounter();
    if (lastCard) {
        openCard(card);
        checkCardMatching(card);
    } else {
        lastCard = card;
        openCard(card);
    }

    if (pairCount === 0) {
        showFinalScore();
    }
}

// Creating DOM Element for card
function createCardElement(cardIcon) {
    let iconElement = document.createElement('i');
    iconElement.classList.add('fa', cardIcon);

    let cardElement = document.createElement('li');
    cardElement.classList.add('card');
    cardElement.appendChild(iconElement);
    cardElement.addEventListener('click', function() {
        onCardClick(cardElement);
    });
    return cardElement;
}

function restartGame() {
    window.location = window.location;
}

// Shuffling cards and creating a new deck
function initGame() {
    shuffle(cards);
    const fragment = document.createDocumentFragment();
    for (const cardIcon of cards) {
        cardElement = createCardElement(cardIcon);
        fragment.appendChild(cardElement);
    }
    const cardDeck = document.querySelector('.deck');
    cardDeck.appendChild(fragment);

    const restartElement = document.querySelector('.restart');
    restartElement.addEventListener('click', restartGame);
    const restartButtonElement = document.querySelector('.restart-button');
    restartButtonElement.addEventListener('click', restartGame);
}

function timer() {
    const date = new Date();

    const timePassed = (date - startTime) / 1000;
    const seconds = timeFormatter(Math.floor(timePassed % 60));
    const minutes = timeFormatter(Math.floor(timePassed / 60));
    const hours = timeFormatter(Math.floor(timePassed / 3600));

    const timerElement = document.querySelector('.timer');
    timerElement.textContent = hours + ":" + minutes + ":" + seconds;
}

// Start new game
initGame();
