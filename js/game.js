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
    window.addEventListener('resize', checkMobileControls);
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

/**
 * Sets up background music to play automatically. Uses a click event listener 
 * as a fallback to handle strict browser autoplay policies.
 */
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
    checkMobileControls();
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
    checkMobileControls();
    world = null;
}

/**
 * Forcibly clears all running interval timers. 
 * Prevents multiple game loops from running simultaneously after a restart.
 */
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

document.addEventListener("keydown", (e) => handleKeyEvent(e.key, true));
document.addEventListener("keyup", (e) => handleKeyEvent(e.key, false));

/**
 * Updates the global keyboard state when keys are pressed or released.
 * @param {string} key - The `e.key` string from the keyboard event
 * @param {boolean} isPressed - True if the key is currently pressed down
 */
function handleKeyEvent(key, isPressed) {
    if (key == "ArrowLeft") keyboard.LEFT = isPressed;
    if (key == "ArrowRight") keyboard.RIGHT = isPressed;
    if (key == "ArrowUp") keyboard.UP = isPressed;
    if (key == "ArrowDown") keyboard.DOWN = isPressed;
    if (key == " ") keyboard.SPACE = isPressed;
    if (key == "d") keyboard.D = isPressed;
}

function bindTouchEvents() {
    bindTouchBtn('btn-left', 'LEFT');
    bindTouchBtn('btn-right', 'RIGHT');
    bindTouchBtn('btn-jump', 'SPACE');
    bindTouchBtn('btn-throw', 'D');
}

/**
 * Connects html buttons for mobile devices to the virtual keyboard state
 * using touchstart and touchend events.
 * @param {string} elementId - The ID of the HTML button element
 * @param {string} keyProperty - The property name on the keyboard object (e.g., 'LEFT')
 */
function bindTouchBtn(elementId, keyProperty) {
    let el = document.getElementById(elementId);
    el.addEventListener('touchstart', (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard[keyProperty] = true;
    }, { passive: false });
    el.addEventListener('touchend', (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard[keyProperty] = false;
    }, { passive: false });
}

/**
 * Detects if the current device supports touch inputs.
 * @returns {boolean} True if touch is supported
 */
function isMobileDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}

/**
 * Shows or hides mobile controls based on device type and current game state.
 * Only displays controls on touch devices while the game world is active.
 */
function checkMobileControls() {
    let mobileControls = document.getElementById('mobile-controls');
    let isTouch = isMobileDevice();
    let isSmallScreen = window.innerWidth <= 1200 && window.innerHeight <= 900;

    if (isTouch && isSmallScreen && world) {
        mobileControls.classList.remove('d-none');
    } else {
        mobileControls.classList.add('d-none');
    }
}
