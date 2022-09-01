const grid = document.querySelector('.grid')
const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer')

const colors = [
    '#ff0000',
    '#ff9400',
    '#f9ff00',
    '#2fff00',
    '#00aeff',
    '#0018f5',
    '#a300ff',
    '#ff00b2',
    '#636363',
    '#010101'
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length == 20) {
        alert(`Parabens ${spanPlayer.innerHTML}, você venceu em ${timer.innerHTML} segundos!`);
        clearInterval(this.loop);
    }
}

const checkCards = () => {
    const firstColor = firstCard.getAttribute('data-color');
    const secondColor = secondCard.getAttribute('data-color');

    if (firstColor == secondColor) {

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();

    } else {

        setTimeout(() => {
            firstCard.classList.remove('reveal-card')
            secondCard.classList.remove('reveal-card')

            firstCard = '';
            secondCard = '';

        }, 500)
    }
}

const revealCard = ({target}) => {

    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard == '') {
        target.parentNode.classList.add('reveal-card')
        firstCard = target.parentNode;
    } else if (secondCard == '') {
        target.parentNode.classList.add('reveal-card')
        secondCard = target.parentNode;

        checkCards();
    }

    
}

const createCard = (color) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundColor = color;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-color', color)
    
    return card;
}

const loadGame = () => {

    const duplicateColors = [ ...colors, ...colors ]

    const shuffledColors = duplicateColors.sort( () => Math.random() - 0.5 );

    shuffledColors.forEach((color) => {
        const card = createCard(color);
        grid.appendChild(card);
    })

}

const startTimer = () => {

    this.loop = setInterval(() => {

        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1

    }, 1000)

}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
}

