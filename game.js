const app = document.getElementById('app');
let boardSize = 4;
let cards = [];
let flippedCards = [];
let playerScores = [0, 0];
let currentPlayer = 0;
let totalMoves = 0;

function createGame() {
  app.innerHTML = ` 
    <div class="controls">
      <button onclick="restartGame()">Restartovat hru</button>
      <p>Počet tahů: <span id="move-count">0</span></p>
      <p>Skóre hráče 1: <span id="score-player-1">0</span> | Skóre hráče 2: <span id="score-player-2">0</span></p>
      <p>Na tahu je hráč: <span id="current-player">1</span></p>
    </div>
    <div id="game-board" style="grid-template-columns: repeat(${boardSize}, 1fr);"></div> 
  `;
  
  initializeBoard();
}

function initializeBoard() {
  const gameBoard = document.getElementById('game-board');
  const cardValues = generateCardValues();
  
  cardValues.forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.addEventListener('click', () => flipCard(card));
    gameBoard.appendChild(card);
  });
}


function generateCardValues() {
  const images = [
    "https://images.pexels.com/photos/2675268/pexels-photo-2675268.jpeg?cs=srgb&dl=pexels-silvia-trigo-545701-2675268.jpg&fm=jpg" ,
    "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?cs=srgb&dl=pexels-jaime-reimer-1376930-2662116.jpg&fm=jpg" ,
    "https://cdn-abeco.nitrocdn.com/vMCLEGbZccgRIgpGXvgkDDYcPokgENUq/assets/images/optimized/rev-90bc849/gatheringdreams.com/wp-content/uploads/2022/07/dream-destinations-feature-image-1024x683.jpg" ,
    "https://thumbor.bigedition.com/bali-one-of-the-best-travel-destinations/52R-IxcOUu8ZKkWFLE0U_HK-pPY=/69x0:1184x836/800x0/filters:quality(80)/granite-web-prod/c5/b4/c5b44ca4133d48f1bdf14e0f47f3cfc4.jpeg" ,
    "https://trvl.cz/wp-content/smush-webp/2024/01/island-dyrholae-1024x683.jpg.webp",
    "https://admin.expatica.com/jp/wp-content/uploads/sites/18/2023/11/tokyo-skyline-fuji.jpg",
    "https://cdn.britannica.com/17/83817-050-67C814CD/Mount-Everest.jpg",
    "https://www.vietnamairlines.com/~/media/Images/Discovery/England/London/canh%20dep/986x906/London_canhdep_986x906.jpg"
  ]
  return shuffle([...images, ...images]); 
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function flipCard(card) {
  if (card.classList.contains('flipped') || flippedCards.length >= 2) return;

  card.classList.add('flipped');
  card.innerHTML = `<img src="${card.dataset.value}" alt="card image" />`; 
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    totalMoves++;
    document.getElementById('move-count').innerText = totalMoves;
    checkForMatch();
  }
}


function checkForMatch() {
  const [firstCard, secondCard] = flippedCards;
  const isMatch = firstCard.dataset.value === secondCard.dataset.value;

  if (isMatch) {
    playerScores[currentPlayer]++;
    document.getElementById(`score-player-${currentPlayer + 1}`).innerText = playerScores[currentPlayer];
    flippedCards = [];
    checkForEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      firstCard.innerHTML = ''; 
      secondCard.innerHTML = ''; 
      flippedCards = [];
      switchPlayer();
    }, 1500);
  }
}


function checkForEndGame() {
  const flippedCount = document.querySelectorAll('.card.flipped').length;
  if (flippedCount === boardSize * boardSize) {
    setTimeout(() => alert('Konec hry!'), 500);
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  document.getElementById('current-player').innerText = currentPlayer + 1;
}

function restartGame() {
  playerScores = [0, 0];
  currentPlayer = 0;
  totalMoves = 0;
  flippedCards = [];
  createGame();
}

createGame(); 