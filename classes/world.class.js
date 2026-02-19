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
        new Enemy(800),
        new Enemy(1300),
        new Enemy(1800),
        new Endboss()
    ];
    statusBar = new StatusBar();
    bookStatusBar = new BookStatusBar();
    throwableObjects = [];
    collectibleObjects = [
        new CollectibleObject(500, 420),
        new CollectibleObject(800, 420),
        new CollectibleObject(1200, 420),
        new CollectibleObject(1600, 420),
        new CollectibleObject(2000, 420)
    ];
    camera_x = 0;
    lastThrow = 0;
    gameStarted = false;

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
            if (!this.gameStarted && (this.keyboard.LEFT || this.keyboard.RIGHT)) {
                this.gameStarted = true;
            }
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkItemCollisions();
            this.checkThrowableCollisions();
        }, 200);
    }

    checkThrowObjects() {
        let now = new Date().getTime();
        if (this.keyboard.D && (now - this.lastThrow) > 1000 && this.character.books > 0) {
            let book = new ThrowableObject(this.character.x + 50, this.character.y + 50);
            this.throwableObjects.push(book);
            this.character.books--;
            this.bookStatusBar.setBooks(this.character.books);
            this.lastThrow = now;
        }
    }

    checkThrowableCollisions() {
        this.throwableObjects.forEach((throwable, tIndex) => {
            this.enemies.forEach((enemy) => {
                if (throwable.isColliding(enemy)) {
                    if (enemy instanceof Endboss) {
                        enemy.energy -= 1; // 3 hits total
                    } else {
                        enemy.energy = 0;
                    }
                    this.throwableObjects.splice(tIndex, 1);
                }
            });
        });
    }

    checkItemCollisions() {
        this.collectibleObjects.forEach((item, index) => {
            if (this.character.isColliding(item)) {
                this.character.books++;
                this.bookStatusBar.setBooks(this.character.books);
                this.collectibleObjects.splice(index, 1);
            }
        });
    }

    checkCollisions() {
        this.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && this.character.speedY < 0 && !enemy.isDead() && !(enemy instanceof Endboss)) {
                    enemy.energy = 0; // Defeat enemy
                    enemy.y += 60; // Shift down for stomp effect
                } else if (!this.character.isHurt() && !enemy.isDead()) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                    console.log('Collision! Energy:', this.character.energy);
                }
            }
        });
    }

    setWorld() {
        this.character.world = this;
        this.enemies.forEach(enemy => {
            enemy.world = this;
        });
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

        this.collectibleObjects.forEach(obj => {
            this.addToMap(obj);
        });

        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);
        // ----- Space for fixed objects -----
        this.addToMap(this.statusBar);
        this.addToMap(this.bookStatusBar);

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
        // Frame wird nur gezeichnet, wenn nicht gespiegelt, oder wir müssten drawFrame auch anpassen.
        // Für den Moment entfernen wir die mo.x Mutation ganz:

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