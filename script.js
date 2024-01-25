document.addEventListener('DOMContentLoaded', () => {
    const cards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    let flippedCards = [];
    let matchedCards = [];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createCard(cardValue) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = cardValue;
        card.textContent = '?'; // Inicialmente, mostrando '?'
        card.addEventListener('click', flipCard);
        return card;
    }

    function createBoard() {
        shuffle(cards);
        const gameContainer = document.querySelector('.memory-game');
        cards.forEach(cardValue => {
            const card = createCard(cardValue);
            gameContainer.appendChild(card);
        });
    }

    function flipCard() {
        if (!this.classList.contains('flipped') && !this.classList.contains('matched')) {
            this.classList.add('flipped');
            this.textContent = this.dataset.value; // Revela a letra

            flippedCards.push(this);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 500);
            }
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;

        if (card1.dataset.value === card2.dataset.value) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedCards.push(card1, card2);
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.textContent = '?'; // Oculta a letra novamente
                card2.textContent = '?'; // Oculta a letra novamente
            }, 500);
        }

        flippedCards = [];

        if (matchedCards.length === cards.length) {
            alert('Parabéns! Você venceu o jogo!');
            resetGame();
        }
    }

    function resetGame() {
        const gameContainer = document.querySelector('.memory-game');
        gameContainer.innerHTML = '';
        flippedCards = [];
        matchedCards = [];
        createBoard();
    }

    createBoard();
});