class World {
    character = new Character();
    backgroundObjects = [
        new BackgroundObject('img/background/sky.svg', -840),
        new BackgroundObject('img/background/Gemini_Generated_Image_47inhj47inhj47in.png', 0),
        new BackgroundObject('img/background/sky.svg', 840),
        new BackgroundObject('img/background/Gemini_Generated_Image_47inhj47inhj47in.png', 840 * 2),
        new BackgroundObject('img/background/sky.svg', 840 * 3),
        new BackgroundObject('img/background/Gemini_Generated_Image_47inhj47inhj47in.png', 840 * 4),
        new BackgroundObject('img/background/sky.svg', 840 * 5)
    ];
    enemies = [
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Endboss()
    ];
    statusBar = new StatusBar();
    throwableObjects = [];
    camera_x = 0;
    lastThrow = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }

    checkThrowObjects() {
        let now = new Date().getTime();
        if (this.keyboard.D && (now - this.lastThrow) > 1000) {
            let book = new ThrowableObject(this.character.x + 50, this.character.y + 50);
            this.throwableObjects.push(book);
            this.lastThrow = now;
        }
    }

    checkCollisions() {
        this.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isHurt()) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                console.log('Collision! Energy:', this.character.energy);
            }
        });
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.camera_x = -this.character.x + 100;

        this.ctx.translate(this.camera_x, 0);

        this.backgroundObjects.forEach(bg => {
            this.addToMap(bg);
        });

        this.enemies.forEach(enemy => {
            this.addToMap(enemy);
        });

        this.throwableObjects.forEach(obj => {
            this.addToMap(obj);
        });

        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);
        // ----- Space for fixed objects -----
        this.addToMap(this.statusBar);

        // Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
} 