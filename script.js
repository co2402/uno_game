const colors = ["Rood", "Groen", "Blauw", "Geel"];
const values = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

let deck = [];
let playerHand = [];
let discardPile = "";
let timeLeft = 10; // Aangepast naar 10 seconden
let timerInterval;

function createDeck() {
    let deck = [];
    for (let color of colors) {
        for (let value of values) {
            deck.push(`${color} ${value}`);
        }
    }
    return deck.sort(() => Math.random() - 0.5);
}

function drawCards(deck, amount) {
    return deck.splice(0, amount);
}

function cardToFilename(card) {
    const [color, value] = card.split(" ");

    const filenameMap = {
        "Rood": value => (value <= 4 ? `rood_${value}.png` : `Rood_${value}.png`),
        "Groen": value => (value <= 2 ? `groen_${value}.png` : `Groen_${value}.png`),
        "Blauw": value => `Blauw_${value}.png`,
        "Geel": value => (value <= 6 ? `yellow_${value}.png` : `Yellow_${value}.png`)
    };

    if (filenameMap[color]) {
        return `images/${filenameMap[color](value)}`;
    } else {
        return `images/back.png`;
    }
}

function updateHand() {
    const handDiv = document.getElementById("hand");
    handDiv.innerHTML = "";

    playerHand.forEach((card, index) => {
        const img = document.createElement("img");
        img.src = cardToFilename(card);
        img.alt = card;
        img.classList.add("card-image");
        img.onclick = () => playCard(index);
        handDiv.appendChild(img);
    });
}

function renderDiscardPile() {
    const discardDiv = document.getElementById("discard-card");
    discardDiv.innerHTML = "";

    const img = document.createElement("img");
    img.src = cardToFilename(discardPile);
    img.alt = discardPile;
    img.classList.add("card-image");
    discardDiv.appendChild(img);
}

function playCard(index) {
    const selectedCard = playerHand[index];
    const [selectedColor, selectedValue] = selectedCard.split(" ");
    const [topColor, topValue] = discardPile.split(" ");

    if (selectedColor === topColor || selectedValue === topValue) {
        discardPile = selectedCard;
        playerHand.splice(index, 1);
        renderDiscardPile();
        updateHand();

        // Reset timer naar 10 seconden bij succesvolle zet
        timeLeft = 10;
        updateTimerDisplay();

        if (playerHand.length === 0) {
            clearInterval(timerInterval);
            setTimeout(() => {
                alert("🎉 Jij hebt gewonnen! 🎉");
                location.reload();
            }, 500);
        }
    } else {
        alert("❌ Je mag deze kaart niet spelen. Kies een kaart met dezelfde kleur of hetzelfde nummer.");
    }
}

function drawCard() {
    if (deck.length > 0) {
        const newCard = deck.shift();
        playerHand.push(newCard);
        updateHand();
    } else {
        alert("Het deck is leeg!");
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("⏰ Tijd is op! Je hebt verloren!");
            location.reload();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const seconds = timeLeft;
    document.getElementById("timer").textContent =
        `Tijd over: ${seconds < 10 ? '0' : ''}${seconds}`;

    if (timeLeft <= 5) {
        document.getElementById("timer").style.backgroundColor = "rgba(255, 0, 0, 0.7)";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    deck = createDeck();
    playerHand = drawCards(deck, 7);
    discardPile = deck.shift();

    updateHand();
    renderDiscardPile();
    startTimer();

    document.getElementById("draw-card").addEventListener("click", drawCard);
});