document.addEventListener("DOMContentLoaded", () => {

    const emojis = ["🚀", "🪐", "🌍", "🌌", "🔭", "🌕", "☄️", "🌠"];

    const scoreContainer = document.getElementById('score');
    const timerContainer = document.getElementById("timer");


    // Winner message modal
    const winnerModal = document.getElementById("winnerModal");

    //Game over modal 
    const gameOverModal = document.getElementById("gameOverModal");

    // How to play modal, button and close functionality
    const howToPlayModal = document.getElementById("howToPlayModal");
    const howToPlayButton = document.getElementById("howToPlayButton");
    const closeHowToPlay = document.getElementById("closeHowToPlay");
 
    // Load game sound files
    const matchSound = new Audio("assets/audio/match.mp3");
    const mismatchSound = new Audio("assets/audio/mismatch.mp3");
    const gameOverSound = new Audio("assets/audio/gameover.mp3");
    const winSound = new Audio("assets/audio/win.mp3");

    // Start of the game, initialise the score
    let score = 0;

    // Start of game, track matched pairs
    let matchedPairs = 0;

    // Sets the timer for all games to 60 seconds
    let timeLeft = 60;
    let timerInterval = null;
    let isTimerRunning = false;


    // Open the modal when the "How to Play" button is clicked
    howToPlayButton.addEventListener("click", () => {
        howToPlayModal.style.display = "flex";
    });

    // Close the modal if user clicks on the X 
    closeHowToPlay.addEventListener("click", () => {
        howToPlayModal.style.display = "none";
    });

    // Close the modal if user clicks outside of it
    window.addEventListener("click", (event) => {
        if (event.target === howToPlayModal) {
            howToPlayModal.style.display = "none";
        }
    });

    // Create an array of pairs
    const cardsArray = emojis.concat(emojis);

    // Shuffle the array items 
    cardsArray.sort(() => Math.random() - 0.5);

    const grid = document.getElementById("gameGrid");
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;

    /**
     * Creates new board with a cleared game grid, resets score, restarts timer
     */
    function createBoard() {
        grid.innerHTML = "";
        matchedPairs = 0;
        score = 0;

        // Stop previous timer
        clearInterval(timerInterval);
        timeLeft = 60;
        timerContainer.innerText = timeLeft;

        // Ensure timer starts fresh
        isTimerRunning = false;
        scoreContainer.innerText = score;

        // Hide the winner modal on game start
        winnerModal.style.display = "none";

        // Hide the game over modal on game start

        gameOverModal.style.display = "none"

        // Reshuffle the array items        
        cardsArray.sort(() => Math.random() - 0.5);

        
        // Reset timer and update the timer display
        clearInterval(timerInterval);
        isTimerRunning = false;

        // Creates a card for each emoji and flips the card when clicked
        cardsArray.forEach((emoji, index) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.emoji = emoji;
            card.addEventListener("click", flipCard);
            grid.appendChild(card);
        });
    }

    /**
     * Plays a sound file when called
     */
    function playSound(sound) {

        // Reset sound if it's already playing
        sound.currentTime = 0;
        sound.play();
    }

    /**
     * Starts the countdown and minuses seconds, 
     * if it reaches zero before all the cards are matched, 
     * show game over message
     */
    function startTimer() {
        if (!isTimerRunning) {
            isTimerRunning = true;
            timerInterval = setInterval(() => {
                timeLeft--;
                timerContainer.innerText = timeLeft;

                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    playSound(gameOverSound);
                    gameOverModal.style.display = "flex";
                }
            }, 1000);
        }
    }

    /**
     * Any element in the game that has been clicked will be the 
     * first card and will flip displaying an emoji
     */
    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        startTimer();

        this.textContent = this.dataset.emoji;
        this.classList.add("flipped");

        if (!firstCard) {
            firstCard = this;
            return;
        }

        // Flips the second card and locks the game
        secondCard = this;
        lockBoard = true;

        // Check if the cards match
        checkMatch();
    }

    /**
     * Define checkMatch function, if both emojis are the same increase 
     * the score and reset board to restart the process, otherwise unflip 
     * the cards and reset board
     */ 
    function checkMatch() {
        if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
            playSound(matchSound);
            score++;
            matchedPairs++;

            // Update the score total 
            scoreContainer.innerText = score; 
            resetBoard();

            // Check if all pairs are matched  
            checkWin();
        } else {
            playSound(mismatchSound);
 
            // No match, flip the cards back over
            setTimeout(() => {
                firstCard.textContent = "";
                secondCard.textContent = "";
                firstCard.classList.remove("flipped");
                secondCard.classList.remove("flipped");
                resetBoard();
            }, 1000);
        }
    }

    /**
     * Check if player has won with all pairs matched,
     * stop the timer and show winner message
     */ 
    function checkWin() {
        if (matchedPairs === emojis.length) {
            clearInterval(timerInterval); 
            setTimeout(() => {
                playSound(winSound); 
                winnerModal.style.display = "flex"; 
            }, 500);
        }
    }

    /**
     * If first and second card return null values, board is not locked
     */ 
    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }

    // Winner is announced and player restarts the game board    
    window.restartGame = function () {
        createBoard();
    };

    createBoard();

    // Event listener for mute toggle 
    let muteButton = document.getElementById('muteButton');
    muteButton.addEventListener('click', muteToggle);

    /**
     * Mutes all audio. If already muted, unmutes all audio.
     */
    function muteToggle() {
        if (matchSound.muted != true) {
            matchSound.muted = true;
            mismatchSound.muted = true;
            gameOverSound.muted = true;
            winSound.muted = true;
            document.getElementById('muteButton').innerHTML = "🔇";
        } else {
            matchSound.muted = false;
            mismatchSound.muted = false;
            gameOverSound.muted = false;
            winSound.muted = false;
            document.getElementById('muteButton').innerHTML = "🔊";
        }
    }
})

// Try again and play again button refernces to HTML to restart the game
document.getElementById("tryAgainButton").addEventListener("click", restartGame);
document.getElementById("playAgainButton").addEventListener("click", restartGame);
