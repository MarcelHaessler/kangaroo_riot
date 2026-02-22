let canvas;
let world;
let keyboard = new Keyboard();
let background_music = new Audio('./audio/gameMusic.mp3');
background_music.loop = true;

function init() {
    canvas = document.getElementById("canvas");
    background_music.play().catch(e => {
        console.log("Autoplay blocked, waiting for interaction");
        // Play on first interaction if blocked
        document.addEventListener('click', () => {
            background_music.play();
        }, { once: true });
    });

    if (sessionStorage.getItem('restartGame') === 'true') {
        sessionStorage.removeItem('restartGame');
        startGame();
    }
}

function startGame() {
    if (world) return; // Prevent multiple worlds
    document.getElementById('start-screen').classList.add('d-none');
    world = new World(canvas, keyboard);
}

function restartGame() {
    sessionStorage.setItem('restartGame', 'true');
    location.reload(); // Simple and clean way to reset all intervals and state
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function toggleMute() {
    let btnText = document.querySelector('#audio-toggle span');
    if (background_music.paused) {
        background_music.play();
        btnText.innerText = "Mute";
    } else {
        background_music.pause();
        btnText.innerText = "Unmute";
    }
}

function toggleRules() {
    document.getElementById('start-screen').classList.toggle('d-none');
    document.getElementById('rules-screen').classList.toggle('d-none');
}

document.addEventListener("keydown", (e) => {
    if (e.key == "ArrowLeft") {
        keyboard.LEFT = true;
    }

    if (e.key == "ArrowRight") {
        keyboard.RIGHT = true;
    }

    if (e.key == "ArrowUp") {
        keyboard.UP = true;
    }

    if (e.key == "ArrowDown") {
        keyboard.DOWN = true;
    }

    if (e.key == " ") {
        keyboard.SPACE = true;
    }

    if (e.key == "d") {
        keyboard.D = true;
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key == "ArrowLeft") {
        keyboard.LEFT = false;
    }

    if (e.key == "ArrowRight") {
        keyboard.RIGHT = false;
    }

    if (e.key == "ArrowUp") {
        keyboard.UP = false;
    }

    if (e.key == "ArrowDown") {
        keyboard.DOWN = false;
    }

    if (e.key == " ") {
        keyboard.SPACE = false;
    }

    if (e.key == "d") {
        keyboard.D = false;
    }
});
