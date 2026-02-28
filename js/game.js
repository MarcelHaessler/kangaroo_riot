let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = true;
let background_music = new Audio('./audio/gameMusic.mp3');
background_music.loop = true;

function init() {
    canvas = document.getElementById("canvas");
    loadMuteState();
    setupAudioAutoplay();
    bindTouchEvents();
}

function loadMuteState() {
    let savedMute = localStorage.getItem('isMuted');
    if (savedMute !== null) {
        isMuted = savedMute === 'true';
    } else {
        isMuted = true; // Default to muted
    }
    updateMuteUI();
}

function setupAudioAutoplay() {
    if (isMuted) return;
    background_music.play().catch(() => {
        document.addEventListener('click', () => {
            if (!isMuted) background_music.play();
        }, { once: true });
    });
}

function startGame() {
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('win-screen').classList.add('d-none');
    document.getElementById('game-over-screen').classList.add('d-none');
    document.getElementById('mobile-controls').classList.remove('d-none');
    world = new World(canvas, keyboard);
}

function restartGame() {
    clearAllIntervals();
    startGame();
}

function goToMenu() {
    clearAllIntervals();
    document.getElementById('start-screen').classList.remove('d-none');
    document.getElementById('win-screen').classList.add('d-none');
    document.getElementById('game-over-screen').classList.add('d-none');
    document.getElementById('mobile-controls').classList.add('d-none');
    world = null;
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function toggleMute() {
    isMuted = !isMuted;
    localStorage.setItem('isMuted', isMuted);
    updateMuteUI();
    if (isMuted) {
        background_music.pause();
    } else {
        background_music.play();
    }
}

function updateMuteUI() {
    let btnText = document.querySelector('#audio-toggle span');
    if (btnText) {
        btnText.innerText = isMuted ? "Unmute" : "Mute";
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

function bindTouchEvents() {
    document.getElementById('btn-left').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('btn-left').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('btn-right').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('btn-right').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('btn-jump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('btn-jump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById('btn-throw').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    document.getElementById('btn-throw').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}
