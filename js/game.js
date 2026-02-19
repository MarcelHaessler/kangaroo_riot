let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById("canvas");
}

function startGame() {
    if (world) return; // Prevent multiple worlds
    document.getElementById('start-screen').classList.add('d-none');
    world = new World(canvas, keyboard);
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
