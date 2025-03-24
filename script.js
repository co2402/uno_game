// UNO deck met kleuren en waardes
const colors = ["red", "blue", "green", "yellow"];
const values = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Skip", "Reverse", "Draw Two"];
const specialCards = ["Wild", "Wild Draw Four"];
let deck = [];
let playerHand = [];
let discardPile = [];

// Spel initialiseren
function initializeGame() {
    generateDeck();
    shuffleDeck();
    playerHand = drawCards(7);
    discardPile.push(drawCardFromDeck());
    updateGameUI();
}

// Deck genereren
function generateDeck() {
    deck = [];
    colors.forEach(color => {
        values.forEach(value => {
            deck.push({ color, value });
            if (value !== "0") deck.push({ color, value }); // Elke waarde (behalve 0) komt 2x voor
        });
    });
    specialCards.forEach(card => {
        for (let i = 0; i < 4; i++) deck.push({ color: "black", value: card });
    });
}

// Deck schudden (Fisher-Yates shuffle)
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Kaarten trekken
function drawCards(count) {
    let cards = [];
    for (let i = 0; i < count; i++) {
        cards.push(drawCardFromDeck());
    }
    return cards;
}

// Trek een kaart van de stapel
function drawCardFromDeck() {
    if (deck.length === 0) {
        alert("Deck is leeg! Schudden...");
        generateDeck();
        shuffleDeck();
    }
    return deck.pop();
}

// Speler trekt een kaart
function drawCard() {
    playerHand.push(drawCardFromDeck());
    updateGameUI();
}

// Kaart spelen
function playCard(index) {
    let playedCard = playerHand[index];
    let topCard = discardPile[discardPile.length - 1];

    // Controleer of de kaart geldig is
    if (playedCard.color === topCard.color || playedCard.value === topCard.value || playedCard.color === "black") {
        discardPile.push(playedCard);
        playerHand.splice(index, 1);

        handleSpecialCard(playedCard);
        updateGameUI();

        if (playerHand.length === 0) {
            document.getElementById("game-message").innerText = "🎉 Je hebt gewonnen!";
        }
    } else {
        alert("Je kunt deze kaart niet spelen!");
    }
}

// Speciale kaarten verwerken
function handleSpecialCard(card) {
    if (card.value === "Skip") {
        alert("Volgende speler wordt overgeslagen!");
    } else if (card.value === "Reverse") {
        alert("Speelrichting verandert! (niet geïmplementeerd voor single-player)");
    } else if (card.value === "Draw Two") {
        alert("Volgende speler moet 2 kaarten trekken! (niet geïmplementeerd)");
    } else if (card.value === "Wild") {
        let newColor = prompt("Kies een kleur: red, blue, green, yellow");
        if (colors.includes(newColor)) {
            card.color = newColor;
        }
    } else if (card.value === "Wild Draw Four") {
        let newColor = prompt("Kies een kleur: red, blue, green, yellow");
        if (colors.includes(newColor)) {
            card.color = newColor;
        }
        alert("Volgende speler moet 4 kaarten trekken! (niet geïmplementeerd)");
    }
}

// UI updaten
function updateGameUI() {
    let handDiv = document.getElementById("hand");
    handDiv.innerHTML = "";
    playerHand.forEach((card, index) => {
        let cardDiv = document.createElement("div");
        cardDiv.classList.add("card", card.color);
        cardDiv.innerText = `${card.color.toUpperCase()} ${card.value}`;
        cardDiv.onclick = () => playCard(index);
        handDiv.appendChild(cardDiv);
    });

    let topCard = discardPile[discardPile.length - 1];
    document.getElementById("discard-card").innerText = `${topCard.color.toUpperCase()} ${topCard.value}`;
}

// Start het spel
initializeGame();
